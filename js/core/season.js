/**
 * @name core.season
 * @namespace Somewhat of a hodgepodge. Basically, this is for anything related to a single season that doesn't deserve to be broken out into its own file. Currently, this includes things that happen when moving between phases of the season (i.e. regular season to playoffs) and scheduling. As I write this, I realize that it might make more sense to break up those two classes of functions into two separate modules, but oh well.
 */
define(["dao", "db", "globals", "ui", "core/contractNegotiation", "core/draft", "core/finances", "core/freeAgents", "core/player", "core/team", "lib/bluebird", "lib/jquery", "lib/underscore", "util/account", "util/ads", "util/eventLog", "util/helpers", "util/message", "util/random"], function (dao, db, g, ui, contractNegotiation, draft, finances, freeAgents, player, team, Promise, $, _, account, ads, eventLog, helpers, message, random) {
    "use strict";

    var phaseText;

    /**
     * Update g.ownerMood based on performance this season.
     *
     * This is based on three factors: regular season performance, playoff performance, and finances. Designed to be called after the playoffs end.
     * 
     * @memberOf core.season
     * @return {Promise.Object} Resolves to an object containing the changes in g.ownerMood this season.
     */
    function updateOwnerMood() {
        return team.filter({
            seasonAttrs: ["won", "playoffRoundsWon", "profit"],
            season: g.season,
            tid: g.userTid
        }).then(function (t) {
            var deltas, ownerMood;

            deltas = {};
            deltas.wins = 0.25 * (t.won - 41) / 41;
            if (t.playoffRoundsWon < 0) {
                deltas.playoffs = -0.2;
            } else if (t.playoffRoundsWon < 4) {
                deltas.playoffs = 0.04 * t.playoffRoundsWon;
            } else {
                deltas.playoffs = 0.2;
            }
            deltas.money = (t.profit - 15) / 100;

            return Promise.try(function () {
                // Only update owner mood if grace period is over
                if (g.season >= g.gracePeriodEnd) {
                    ownerMood = {};
                    ownerMood.wins = g.ownerMood.wins + deltas.wins;
                    ownerMood.playoffs = g.ownerMood.playoffs + deltas.playoffs;
                    ownerMood.money = g.ownerMood.money + deltas.money;

                    // Bound only the top - can't win the game by doing only one thing, but you can lose it by neglecting one thing
                    if (ownerMood.wins > 1) { ownerMood.wins = 1; }
                    if (ownerMood.playoffs > 1) { ownerMood.playoffs = 1; }
                    if (ownerMood.money > 1) { ownerMood.money = 1; }

                    return dao.gameAttributes.set({ownerMood: ownerMood});
                }
            }).then(function () {
                return deltas;
            });
        });
    }

    /**
     * Compute the awards (MVP, etc) after a season finishes.
     *
     * The awards are saved to the "awards" object store.
     *
     * @memberOf core.season
     * @return {Promise}
     */
    function awards() {
        var awards, awardsByPlayer, cbAwardsByPlayer, tx;

        awards = {season: g.season};

        // [{pid, type}]
        awardsByPlayer = [];

        cbAwardsByPlayer = function (awardsByPlayer) {
            var i, pids, tx;

            pids = _.uniq(_.pluck(awardsByPlayer, "pid"));

            tx = dao.tx("players", "readwrite");
            for (i = 0; i < pids.length; i++) {
                dao.players.iterate({
                    ot: tx,
                    key: pids[i],
                    modify: function (p) {
                        var i;

                        for (i = 0; i < awardsByPlayer.length; i++) {
                            if (p.pid === awardsByPlayer[i].pid) {
                                p.awards.push({season: g.season, type: awardsByPlayer[i].type});
                            }
                        }

                        return p;
                    }
                });
            }
            return tx.complete();
        };

        tx = g.dbl.transaction(["players", "playerStats", "releasedPlayers", "teams"]);

        // Get teams for won/loss record for awards, as well as finding the teams with the best records
        return team.filter({
            attrs: ["tid", "abbrev", "region", "name", "cid"],
            seasonAttrs: ["won", "lost", "winp", "playoffRoundsWon"],
            season: g.season,
            sortBy: "winp",
            ot: tx
        }).then(function (teams) {
            var i, foundEast, foundWest, t;

            for (i = 0; i < teams.length; i++) {
                if (!foundEast && teams[i].cid === 0) {
                    t = teams[i];
                    awards.bre = {tid: t.tid, abbrev: t.abbrev, region: t.region, name: t.name, won: t.won, lost: t.lost};
                    foundEast = true;
                } else if (!foundWest && teams[i].cid === 1) {
                    t = teams[i];
                    awards.brw = {tid: t.tid, abbrev: t.abbrev, region: t.region, name: t.name, won: t.won, lost: t.lost};
                    foundWest = true;
                }

                if (foundEast && foundWest) {
                    break;
                }
            }

            // Sort teams by tid so it can be easily used in awards formulas
            teams.sort(function (a, b) { return a.tid - b.tid; });

            return [teams, dao.players.getAll({
                ot: tx,
                index: "tid",
                key: IDBKeyRange.lowerBound(g.PLAYER.FREE_AGENT), // Any non-retired player can win an award
                statsSeasons: [g.season]
            })];
        }).spread(function (teams, players) {
            var champTid, i, p, type;

            players = player.filter(players, {
                attrs: ["pid", "name", "tid", "abbrev", "draft"],
                stats: ["gp", "gs", "min", "pts", "trb", "ast", "blk", "stl", "ewa"],
                season: g.season
            });

            // Add team games won to players
            for (i = 0; i < players.length; i++) {
                // Special handling for players who were cut mid-season
                if (players[i].tid >= 0) {
                    players[i].won = teams[players[i].tid].won;
                } else {
                    players[i].won = 20;
                }
            }

            // Rookie of the Year
            players.sort(function (a, b) {  return b.stats.ewa - a.stats.ewa; }); // Same formula as MVP, but no wins because some years with bad rookie classes can have the wins term dominate EWA
            for (i = 0; i < players.length; i++) {
                // This doesn't factor in players who didn't start playing right after being drafted, because currently that doesn't really happen in the game.
                if (players[i].draft.year === g.season - 1) {
                    break;
                }
            }
            p = players[i];
            if (p !== undefined) { // I suppose there could be no rookies at all.. which actually does happen when skip the draft from the debug menu
                awards.roy = {pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, pts: p.stats.pts, trb: p.stats.trb, ast: p.stats.ast};
                awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: "Rookie of the Year"});
            }

            // Most Valuable Player
            players.sort(function (a, b) {  return (b.stats.ewa + 0.1 * b.won) - (a.stats.ewa + 0.1 * a.won); });
            p = players[0];
            awards.mvp = {pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, pts: p.stats.pts, trb: p.stats.trb, ast: p.stats.ast};
            awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: "Most Valuable Player"});
            // Notification unless it's the user's player, in which case it'll be shown below
            if (p.tid !== g.userTid) {
                eventLog.add(null, {
                    type: "award",
                    text: '<a href="' + helpers.leagueUrl(["player", p.pid]) + '">' + p.name + '</a> (<a href="' + helpers.leagueUrl(["roster", p.abbrev]) + '">' + p.abbrev + '</a>) won the Most Valuable Player award.'
                });
            }

            // Sixth Man of the Year - same sort as MVP
            for (i = 0; i < players.length; i++) {
                // Must have come off the bench in most games
                if (players[i].stats.gs === 0 || players[i].stats.gp / players[i].stats.gs > 2) {
                    break;
                }
            }
            p = players[i];
            awards.smoy = {pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, pts: p.stats.pts, trb: p.stats.trb, ast: p.stats.ast};
            awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: "Sixth Man of the Year"});

            // All League Team - same sort as MVP
            awards.allLeague = [{title: "First Team", players: []}];
            type = "First Team All-League";
            for (i = 0; i < 15; i++) {
                p = players[i];
                if (i === 5) {
                    awards.allLeague.push({title: "Second Team", players: []});
                    type = "Second Team All-League";
                } else if (i === 10) {
                    awards.allLeague.push({title: "Third Team", players: []});
                    type = "Third Team All-League";
                }
                _.last(awards.allLeague).players.push({pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, pts: p.stats.pts, trb: p.stats.trb, ast: p.stats.ast});
                awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: type});
            }

            // Defensive Player of the Year
            players.sort(function (a, b) {  return b.stats.gp * (b.stats.trb + 5 * b.stats.blk + 5 * b.stats.stl) - a.stats.gp * (a.stats.trb + 5 * a.stats.blk + 5 * a.stats.stl); });
            p = players[0];
            awards.dpoy = {pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, trb: p.stats.trb, blk: p.stats.blk, stl: p.stats.stl};
            awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: "Defensive Player of the Year"});

            // All Defensive Team - same sort as DPOY
            awards.allDefensive = [{title: "First Team", players: []}];
            type = "First Team All-Defensive";
            for (i = 0; i < 15; i++) {
                p = players[i];
                if (i === 5) {
                    awards.allDefensive.push({title: "Second Team", players: []});
                    type = "Second Team All-Defensive";
                } else if (i === 10) {
                    awards.allDefensive.push({title: "Third Team", players: []});
                    type = "Third Team All-Defensive";
                }
                _.last(awards.allDefensive).players.push({pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, trb: p.stats.trb, blk: p.stats.blk, stl: p.stats.stl});
                awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: type});
            }

            // Finals MVP - most WS in playoffs
            for (i = 0; i < teams.length; i++) {
                if (teams[i].playoffRoundsWon === 4) {
                    champTid = teams[i].tid;
                    break;
                }
            }
            // Need to read from DB again to really make sure I'm only looking at players from the champs. player.filter might not be enough. This DB call could be replaced with a loop manually checking tids, though.
            return [champTid, dao.players.getAll({
                ot: tx,
                index: "tid",
                key: champTid,
                statsSeasons: [g.season],
                statsTid: champTid,
                statsPlayoffs: true
            })];
        }).spread(function (champTid, players) {
            var p, tx;

            players = player.filter(players, { // Only the champions, only playoff stats
                attrs: ["pid", "name", "tid", "abbrev"],
                stats: ["pts", "trb", "ast", "ewa"],
                season: g.season,
                playoffs: true,
                tid: champTid
            });
            players.sort(function (a, b) {  return b.statsPlayoffs.ewa - a.statsPlayoffs.ewa; });
            p = players[0];
            awards.finalsMvp = {pid: p.pid, name: p.name, tid: p.tid, abbrev: p.abbrev, pts: p.statsPlayoffs.pts, trb: p.statsPlayoffs.trb, ast: p.statsPlayoffs.ast};
            awardsByPlayer.push({pid: p.pid, tid: p.tid, name: p.name, type: "Finals MVP"});

            tx = dao.tx("awards", "readwrite");
            dao.awards.put({ot: tx, value: awards});
            return tx.complete().then(function () {
                return cbAwardsByPlayer(awardsByPlayer);
            }).then(function () {
                var i, p, text, tx;

                // None of this stuff needs to block, it's just notifications of crap

                // Notifications for awards for user's players
                tx = dao.tx("events", "readwrite");
                for (i = 0; i < awardsByPlayer.length; i++) {
                    p = awardsByPlayer[i];
                    if (p.tid === g.userTid) {
                        text = 'Your player <a href="' + helpers.leagueUrl(["player", p.pid]) + '">' + p.name + '</a> ';
                        if (p.type.indexOf("Team") >= 0) {
                            text += 'made the ' + p.type + '.';
                        } else {
                            text += 'won the ' + p.type + ' award.';
                        }
                        eventLog.add(tx, {
                            type: "award",
                            text: text
                        });
                    }
                }
                tx.complete().then(function () {
                    // Achievements after awards
                    account.checkAchievement.hardware_store();
                    account.checkAchievement.sleeper_pick();
                });
            });
        });
    }

    /**
     * Creates a new regular season schedule for 30 teams.
     *
     * This makes an NBA-like schedule in terms of conference matchups, division matchups, and home/away games.
     * 
     * @memberOf core.season
     * @return {Array.<Array.<number>>} All the season's games. Each element in the array is an array of the home team ID and the away team ID, respectively.
     */
    function newScheduleDefault() {
        var cid, dids, game, games, good, i, ii, iters, j, jj, k, matchup, matchups, n, newMatchup, t, teams, tids, tidsByConf, tryNum;

        teams = helpers.getTeamsDefault(); // Only tid, cid, and did are used, so this is okay for now. But if someone customizes cid and did, this will break. To fix that, make this function require DB access (and then fix the tests). Or even better, just accept "teams" as a param to this function, then the tests can use default values and the real one can use values from the DB.

        tids = [];  // tid_home, tid_away

        // Collect info needed for scheduling
        for (i = 0; i < teams.length; i++) {
            teams[i].homeGames = 0;
            teams[i].awayGames = 0;
        }
        for (i = 0; i < teams.length; i++) {
            for (j = 0; j < teams.length; j++) {
                if (teams[i].tid !== teams[j].tid) {
                    game = [teams[i].tid, teams[j].tid];

                    // Constraint: 1 home game vs. each team in other conference
                    if (teams[i].cid !== teams[j].cid) {
                        tids.push(game);
                        teams[i].homeGames += 1;
                        teams[j].awayGames += 1;
                    }

                    // Constraint: 2 home schedule vs. each team in same division
                    if (teams[i].did === teams[j].did) {
                        tids.push(game);
                        tids.push(game);
                        teams[i].homeGames += 2;
                        teams[j].awayGames += 2;
                    }

                    // Constraint: 1-2 home schedule vs. each team in same conference and different division
                    // Only do 1 now
                    if (teams[i].cid === teams[j].cid && teams[i].did !== teams[j].did) {
                        tids.push(game);
                        teams[i].homeGames += 1;
                        teams[j].awayGames += 1;
                    }
                }
            }
        }

        // Constraint: 1-2 home schedule vs. each team in same conference and different division
        // Constraint: We need 8 more of these games per home team!
        tidsByConf = [[], []];
        dids = [[], []];
        for (i = 0; i < teams.length; i++) {
            tidsByConf[teams[i].cid].push(i);
            dids[teams[i].cid].push(teams[i].did);
        }

        for (cid = 0; cid < 2; cid++) {
            matchups = [];
            matchups.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            games = 0;
            while (games < 8) {
                newMatchup = [];
                n = 0;
                while (n <= 14) {  // 14 = num teams in conference - 1
                    iters = 0;
                    while (true) {
                        tryNum = random.randInt(0, 14);
                        // Pick tryNum such that it is in a different division than n and has not been picked before
                        if (dids[cid][tryNum] !== dids[cid][n] && newMatchup.indexOf(tryNum) < 0) {
                            good = true;
                            // Check for duplicate games
                            for (j = 0; j < matchups.length; j++) {
                                matchup = matchups[j];
                                if (matchup[n] === tryNum) {
                                    good = false;
                                    break;
                                }
                            }
                            if (good) {
                                newMatchup.push(tryNum);
                                break;
                            }
                        }
                        iters += 1;
                        // Sometimes this gets stuck (for example, first 14 teams in fine but 15th team must play itself)
                        // So, catch these situations and reset the newMatchup
                        if (iters > 50) {
                            newMatchup = [];
                            n = -1;
                            break;
                        }
                    }
                    n += 1;
                }
                matchups.push(newMatchup);
                games += 1;
            }
            matchups.shift();  // Remove the first row in matchups
            for (j = 0; j < matchups.length; j++) {
                matchup = matchups[j];
                for (k = 0; k < matchup.length; k++) {
                    t = matchup[k];
                    ii = tidsByConf[cid][t];
                    jj = tidsByConf[cid][matchup[t]];
                    game = [teams[ii].tid, teams[jj].tid];
                    tids.push(game);
                    teams[ii].homeGames += 1;
                    teams[jj].awayGames += 1;
                }
            }
        }

        return tids;
    }

    /**
     * Creates a new regular season schedule for an arbitrary number of teams.
     *
     * newScheduleDefault is much nicer and more balanced, but only works for 30 teams.
     * 
     * @memberOf core.season
     * @return {Array.<Array.<number>>} All the season's games. Each element in the array is an array of the home team ID and the away team ID, respectively.
     */
    function newScheduleCrappy() {
        var i, j, numGames, numRemaining, numWithRemaining, tids;

        numGames = 82;

        // Number of games left to reschedule for each team
        numRemaining = [];
        for (i = 0; i < g.numTeams; i++) {
            numRemaining[i] = numGames;
        }
        numWithRemaining = g.numTeams; // Number of teams with numRemaining > 0

        tids = [];
        while (tids.length < numGames * g.numTeams) {
            i = -1; // Home tid
            j = -1; // Away tid
            while (i === j || numRemaining[i] === 0 || numRemaining[j] === 0) {
                i = random.randInt(0, g.numTeams - 1);
                j = random.randInt(0, g.numTeams - 1);
            }

            tids.push([i, j]);

            numRemaining[i] -= 1;
            numRemaining[j] -= 1;

            // Make sure we're not left with just one team to play itself
            if (numRemaining[i] === 0) {
                numWithRemaining -= 1;
            }
            if (numRemaining[j] === 0) {
                numWithRemaining -= 1;
            }
            if (numWithRemaining === 1) {
                // If this happens, we didn't find 82 for each team and one team will play a few less games
                break;
            }
        }

        return tids;
    }

    /**
     * Wrapper function to generate a new schedule with the appropriate algorithm based on the number of teams in the league.
     *
     * For 30 teams, use newScheduleDefault (NBA-like).
     * 
     * @memberOf core.season
     * @return {Array.<Array.<number>>} All the season's games. Each element in the array is an array of the home team ID and the away team ID, respectively.
     */
    function newSchedule() {
        var days, i, j, jMax, tids, tidsInDays, used;

        if (g.numTeams === 30) {
            tids = newScheduleDefault();
        } else {
            tids = newScheduleCrappy();
        }

        // Order the schedule so that it takes fewer days to play
        random.shuffle(tids);
        days = [[]];
        tidsInDays = [[]];
        jMax = 0;
        for (i = 0; i < tids.length; i++) {
            used = false;
            for (j = 0; j <= jMax; j++) {
                if (tidsInDays[j].indexOf(tids[i][0]) < 0 && tidsInDays[j].indexOf(tids[i][1]) < 0) {
                    tidsInDays[j].push(tids[i][0]);
                    tidsInDays[j].push(tids[i][1]);
                    days[j].push(tids[i]);
                    used = true;
                    break;
                }
            }
            if (!used) {
                days.push([tids[i]]);
                tidsInDays.push([tids[i][0], tids[i][1]]);
                jMax += 1;
            }
        }
        random.shuffle(days); // Otherwise the most dense days will be at the beginning and the least dense days will be at the end
        tids = _.flatten(days, true);

        return tids;
    }

    phaseText = {
        "-1": " fantasy draft",
        "0": " preseason",
        "1": " regular season",
        "2": " regular season",
        "3": " playoffs",
        "4": " before draft",
        "5": " draft",
        "6": " after draft",
        "7": " re-sign players",
        "8": " free agency"
    };

    /**
     * Common tasks run after a new phrase is set.
     *
     * This updates the phase, executes a callback, and (if necessary) updates the UI. It should only be called from one of the NewPhase* functions defined below.
     * 
     * @memberOf core.season
     * @param {number} phase Integer representing the new phase of the game (see other functions in this module).
     * @param {string=} url Optional URL to pass to ui.realtimeUpdate for redirecting on new phase. If undefined, then the current page will just be refreshed.
     * @param {Array.<string>=} updateEvents Optional array of strings.
     * @return {Promise}
     */
    function newPhaseFinalize(phase, url, updateEvents) {
        updateEvents = updateEvents !== undefined ? updateEvents : [];

        // Set phase before updating play menu
        return dao.gameAttributes.set({phase: phase}).then(function () {
            ui.updatePhase(g.season + phaseText[phase]);
            return ui.updatePlayMenu(null).then(function () {
                // Set lastDbChange last so there is no race condition
                return dao.gameAttributes.set({lastDbChange: Date.now()}).then(function () {
                    updateEvents.push("newPhase");
                    ui.realtimeUpdate(updateEvents, url);
                });
            });
        });
    }

    function newPhasePreseason() {
        return freeAgents.autoSign().then(function () { // Important: do this before changing the season or contracts and stats are fucked up
            return dao.gameAttributes.set({season: g.season + 1});
        }).then(function () {
            var coachingRanks, scoutingRank, tx;

            coachingRanks = [];

            tx = dao.tx(["players", "playerStats", "teams"], "readwrite");

            // Add row to team stats and season attributes
            dao.teams.iterate({
                ot: tx,
                modify: function (t) {
                    // Save the coaching rank for later
                    coachingRanks[t.tid] = _.last(t.seasons).expenses.coaching.rank;

                    // Only need scoutingRank for the user's team to calculate fuzz when ratings are updated below.
                    // This is done BEFORE a new season row is added.
                    if (t.tid === g.userTid) {
                        scoutingRank = finances.getRankLastThree(t, "expenses", "scouting");
                    }

                    t = team.addSeasonRow(t);
                    t = team.addStatsRow(t);

                    return t;
                }
            }).then(function () {
                // Loop through all non-retired players
                dao.players.iterate({
                    ot: tx,
                    index: "tid",
                    key: IDBKeyRange.lowerBound(g.PLAYER.FREE_AGENT),
                    modify: function (p) {
                        // Update ratings
                        p = player.addRatingsRow(p, scoutingRank);
                        p = player.develop(p, 1, false, coachingRanks[p.tid]);

                        return new Promise(function (resolve, reject) {
                            // Update player values after ratings changes
                            player.updateValues(tx, p, [], function (p) {
                                // Add row to player stats if they are on a team
                                if (p.tid >= 0) {
                                    p = player.addStatsRow(tx, p, false);
                                }
                                resolve(p);
                            });
                        });
                    }
                });
            });

            return tx.complete().then(function () {
                if (g.enableLogging && !window.inCordova) {
                    ads.show();
                }

                // AI teams sign free agents
                return newPhaseFinalize(g.PHASE.PRESEASON, undefined, ["playerMovement"]);
            });
        });
    }

    function newPhaseRegularSeason() {
        return dao.schedule.set(newSchedule()).then(function () {
            var tx;

            // First message from owner
            if (g.showFirstOwnerMessage) {
                return message.generate({wins: 0, playoffs: 0, money: 0}).then(function () {
                    return newPhaseFinalize(g.PHASE.REGULAR_SEASON);
                });
            }

            // Spam user with another message?
            if (localStorage.nagged === "true") {
                // This used to store a boolean, switch to number
                localStorage.nagged = "1";
            }

            tx = dao.tx("messages", "readwrite");
            if (g.season === g.startingSeason + 3 && g.lid > 3 && !localStorage.nagged) {
                dao.messages.add({
                    ot: tx,
                    value: {
                        read: false,
                        from: "The Commissioner",
                        year: g.season,
                        text: '<p>Hi. Sorry to bother you, but I noticed that you\'ve been playing this game a bit. Hopefully that means you like it. Either way, we would really appreciate some feedback so we can make this game better. <a href="mailto:commissioner@basketball-gm.com">Send an email</a> (commissioner@basketball-gm.com) or <a href="http://www.reddit.com/r/BasketballGM/">join the discussion on Reddit</a>.</p>'
                    }
                });
                localStorage.nagged = "1";
            } else if ((localStorage.nagged === "1" && Math.random() < 0.25) || (localStorage.nagged === "2" && Math.random < 0.025)) {
                dao.messages.add({
                    ot: tx,
                    value: {
                        read: false,
                        from: "The Commissioner",
                        year: g.season,
                        text: '<p>Hi. Sorry to bother you again, but if you like the game, please share it with your friends! Also:</p><p><a href="https://twitter.com/basketball_gm">Follow Basketball GM on Twitter</a></p><p><a href="https://www.facebook.com/basketball.general.manager">Like Basketball GM on Facebook</a></p><p><a href="http://www.reddit.com/r/BasketballGM/">Discuss Basketball GM on Reddit</a></p><p>The more people that play Basketball GM, the more motivation I have to continue improving it. So it is in your best interest to help me promote the game! If you have any other ideas, please <a href="mailto:commissioner@basketball-gm.com">email me</a>.</p>'
                    }
                });
                localStorage.nagged = "2";
            } else if ((localStorage.nagged === "2" && Math.random() < 0.25) || (localStorage.nagged === "3" && Math.random < 0.025)) {
                _gaq.push(["_trackEvent", "Ad Display", "DraftKings"]);
                dao.messages.add({
                    ot: tx,
                    value: {
                        read: false,
                        from: "The Commissioner",
                        year: g.season,
                        text: '<p>DraftKings is a great new way to play fantasy sports and win money. They are running a special promotion for Basketball GM players: they\'ll waive the entry fee for a $30k fantasy NBA pool and match your first deposit for free! All you have to do is draft the best 8 player team. Your Basketball GM experience may prove to be useful!</p><p><a href="https://www.draftkings.com/gateway?s=640365236"><img src="/img/dk-logo.png"></a></p><p>And better yet, by signing up through <a href="https://www.draftkings.com/gateway?s=640365236">this link</a>, you will be supporting Basketball GM. So even if you\'re not totally sure if you want to try DraftKings, give it a shot as a personal favor to me. In return, I will continue to improve this free game that you\'ve spent hours playing - there is some cool stuff in the works, stay tuned!</p>'
                    }
                });
                localStorage.nagged = "3";
            }
            return tx.complete().then(function () {
                return newPhaseFinalize(g.PHASE.REGULAR_SEASON);
            });
        });
    }

    function newPhaseAfterTradeDeadline() {
        return newPhaseFinalize(g.PHASE.AFTER_TRADE_DEADLINE);
    }

    function newPhasePlayoffs() {
        // Achievements after regular season
        account.checkAchievement.septuawinarian();

        // Set playoff matchups
        return team.filter({
            attrs: ["tid", "cid"],
            seasonAttrs: ["winp"],
            season: g.season,
            sortBy: "winp"
        }).then(function (teams) {
            var cid, i, row, series, teamsConf, tidPlayoffs, tx;

            // Add entry for wins for each team; delete winp, which was only needed for sorting
            for (i = 0; i < teams.length; i++) {
                teams[i].won = 0;
            }

            tidPlayoffs = [];
            series = [[], [], [], []];  // First round, second round, third round, fourth round
            for (cid = 0; cid < 2; cid++) {
                teamsConf = [];
                for (i = 0; i < teams.length; i++) {
                    if (teams[i].cid === cid) {
                        if (teamsConf.length < 8) {
                            teamsConf.push(teams[i]);
                            tidPlayoffs.push(teams[i].tid);
                        }
                    }
                }
                series[0][cid * 4] = {home: teamsConf[0], away: teamsConf[7]};
                series[0][cid * 4].home.seed = 1;
                series[0][cid * 4].away.seed = 8;
                series[0][1 + cid * 4] = {home: teamsConf[3], away: teamsConf[4]};
                series[0][1 + cid * 4].home.seed = 4;
                series[0][1 + cid * 4].away.seed = 5;
                series[0][2 + cid * 4] = {home: teamsConf[2], away: teamsConf[5]};
                series[0][2 + cid * 4].home.seed = 3;
                series[0][2 + cid * 4].away.seed = 6;
                series[0][3 + cid * 4] = {home: teamsConf[1], away: teamsConf[6]};
                series[0][3 + cid * 4].home.seed = 2;
                series[0][3 + cid * 4].away.seed = 7;
            }

            row = {season: g.season, currentRound: 0, series: series};
            tx = dao.tx(["players", "playerStats", "playoffSeries", "teams"], "readwrite");
            dao.playoffSeries.put({value: row});

            if (tidPlayoffs.indexOf(g.userTid) >= 0) {
                eventLog.add(null, {
                    type: "playoffs",
                    text: 'Your team made <a href="' + helpers.leagueUrl(["playoffs", g.season]) + '">the playoffs</a>.'
                });
            } else {
                eventLog.add(null, {
                    type: "playoffs",
                    text: 'Your team didn\'t make <a href="' + helpers.leagueUrl(["playoffs", g.season]) + '">the playoffs</a>.'
                });
            }

            // Add row to team stats and team season attributes
            dao.teams.iterate({
                ot: tx,
                modify: function (t) {
                    var teamSeason;

                    teamSeason = t.seasons[t.seasons.length - 1];

                    if (tidPlayoffs.indexOf(t.tid) >= 0) {
                        t = team.addStatsRow(t, true);

                        teamSeason.playoffRoundsWon = 0;

                        // More hype for making the playoffs
                        teamSeason.hype += 0.05;
                        if (teamSeason.hype > 1) {
                            teamSeason.hype = 1;
                        }
                    } else {
                        // Less hype for missing the playoffs
                        teamSeason.hype -= 0.05;
                        if (teamSeason.hype < 0) {
                            teamSeason.hype = 0;
                        }
                    }

                    return t;
                }
            });

            // Add row to player stats
            tidPlayoffs.forEach(function (tid) {
                dao.players.iterate({
                    ot: tx,
                    index: "tid",
                    key: tid,
                    modify: function (p) {
                        return player.addStatsRow(tx, p, true);
                    }
                });
            });

            return tx.complete().then(function () {
                return Promise.all([
                    finances.assessPayrollMinLuxury(),
                    newSchedulePlayoffsDay()
                ]);
            }).then(function () {
                var url;

                // Don't redirect if we're viewing a live game now
                if (location.pathname.indexOf("/live_game") === -1) {
                    url = helpers.leagueUrl(["playoffs"]);
                }
                return newPhaseFinalize(g.PHASE.PLAYOFFS, url, ["teamFinances"]);
            });
        });
    }

    function newPhaseBeforeDraft() {
        // Achievements after playoffs
        account.checkAchievement.fo_fo_fo();
        account.checkAchievement["98_degrees"]();
        account.checkAchievement.dynasty();
        account.checkAchievement.dynasty_2();
        account.checkAchievement.dynasty_3();
        account.checkAchievement.moneyball();
        account.checkAchievement.moneyball_2();
        account.checkAchievement.small_market();

        // Select winners of the season's awards
        return awards().then(function () {
            return new Promise(function (resolve, reject) {
                var releasedPlayersStore, tx;

                tx = g.dbl.transaction(["events", "messages", "players", "playerStats", "releasedPlayers", "teams"], "readwrite");

                // Add award for each player on the championship team
                team.filter({
                    attrs: ["tid"],
                    seasonAttrs: ["playoffRoundsWon"],
                    season: g.season,
                    ot: tx
                }).then(function (teams) {
                    var i, tid;

                    for (i = 0; i < teams.length; i++) {
                        if (teams[i].playoffRoundsWon === 4) {
                            tid = teams[i].tid;
                            break;
                        }
                    }

                    tx.objectStore("players").index("tid").openCursor(tid).onsuccess = function (event) {
                        var cursor, p;

                        cursor = event.target.result;
                        if (cursor) {
                            p = cursor.value;

                            p.awards.push({season: g.season, type: "Won Championship"});

                            cursor.update(p);
                            cursor.continue();
                        }
                    };
                });

                // Do annual tasks for each player, like checking for retirement
                tx.objectStore("players").index("tid").openCursor(IDBKeyRange.lowerBound(g.PLAYER.FREE_AGENT)).onsuccess = function (event) { // All non-retired players
                    var age, cont, cursor, excessAge, excessPot, maxAge, minPot, p, pot, update;

                    update = false;

                    // Players meeting one of these cutoffs might retire
                    maxAge = 34;
                    minPot = 40;

                    cursor = event.target.result;
                    if (cursor) {
                        p = cursor.value;

                        // Get player stats, used for HOF calculation
                        tx.objectStore("playerStats").index("pid, season, tid").getAll(IDBKeyRange.bound([p.pid], [p.pid, ''])).onsuccess = function (event) {
                            var playerStats;

                            playerStats = event.target.result;

                            age = g.season - p.born.year;
                            pot = _.last(p.ratings).pot;

                            if (age > maxAge || pot < minPot) {
                                excessAge = 0;
                                if (age > 34 || p.tid === g.PLAYER.FREE_AGENT) {  // Only players older than 34 or without a contract will retire
                                    if (age > 34) {
                                        excessAge = (age - 34) / 20;  // 0.05 for each year beyond 34
                                    }
                                    excessPot = (40 - pot) / 50;  // 0.02 for each potential rating below 40 (this can be negative)
                                    if (excessAge + excessPot + random.gauss(0, 1) > 0) {
                                        p = player.retire(tx, p, playerStats);
                                        update = true;
                                    }
                                }
                            }

                            // Update "free agent years" counter and retire players who have been free agents for more than one years
                            if (p.tid === g.PLAYER.FREE_AGENT) {
                                if (p.yearsFreeAgent >= 1) {
                                    p = player.retire(tx, p, playerStats);
                                } else {
                                    p.yearsFreeAgent += 1;
                                }
                                p.contract.exp += 1;
                                update = true;
                            } else if (p.tid >= 0 && p.yearsFreeAgent > 0) {
                                p.yearsFreeAgent = 0;
                                update = true;
                            }

                            // Heal injures
                            if (p.injury.type !== "Healthy") {
                                if (p.injury.gamesRemaining <= 82) {
                                    p.injury = {type: "Healthy", gamesRemaining: 0};
                                } else {
                                    p.injury.gamesRemaining -= 82;
                                }
                                update = true;
                            }

                            // Update player in DB, if necessary
                            if (update) {
                                cursor.update(p);
                            }
                            cursor.continue();
                        };
                    }
                };

                // Remove released players' salaries from payrolls if their contract expired this year
                releasedPlayersStore = tx.objectStore("releasedPlayers");
                releasedPlayersStore.index("contract.exp").getAll(IDBKeyRange.upperBound(g.season)).onsuccess = function (event) {
                    var i, releasedPlayers;

                    releasedPlayers = event.target.result;

                    for (i = 0; i < releasedPlayers.length; i++) {
                        releasedPlayersStore.delete(releasedPlayers[i].rid);
                    }
                };

                tx.oncomplete = function () {
                    // Update strategies of AI teams (contending or rebuilding)
                    team.updateStrategies(function () {
                        var url;

                        // Don't redirect if we're viewing a live game now
                        if (location.pathname.indexOf("/live_game") === -1) {
                            url = helpers.leagueUrl(["history"]);
                        }


                        updateOwnerMood().then(message.generate).then(function () {
                            newPhaseFinalize(g.PHASE.BEFORE_DRAFT, url, ["playerMovement"]).then(function () {
                                helpers.bbgmPing("season");
                                resolve();
                            });
                        });
                    });
                };
            });
        });
    }

    function newPhaseDraft() {
        return draft.genOrder().then(function () {
            var tx;

            // This is a hack to handle weird cases where players have draft.year set to the current season, which fucks up the draft UI
            tx = dao.tx("players", "readwrite");
            dao.players.iterate({
                ot: tx,
                index: "draft.year",
                key: g.season,
                modify: function (p) {
                    if (p.tid >= 0) {
                        p.draft.year -= 1;
                        return p;
                    }
                }
            });
            return tx.complete();
        }).then(function () {
            return newPhaseFinalize(g.PHASE.DRAFT, helpers.leagueUrl(["draft"]));
        });
    }

    function newPhaseAfterDraft() {
        var round, tid, tx;

        tx = dao.tx("draftPicks", "readwrite");

        // Add a new set of draft picks
        for (tid = 0; tid < g.numTeams; tid++) {
            for (round = 1; round <= 2; round++) {
                dao.draftPicks.add({
                    ot: tx,
                    value: {
                        tid: tid,
                        originalTid: tid,
                        round: round,
                        season: g.season + 4
                    }
                });
            }
        }

        return tx.complete().then(function () {
            return newPhaseFinalize(g.PHASE.AFTER_DRAFT, undefined, ["playerMovement"]);
        });
    }

    function newPhaseResignPlayers() {
        var tx;

        tx = dao.tx(["gameAttributes", "messages", "negotiations", "players", "teams"], "readwrite");

        player.genBaseMoods(tx).then(function (baseMoods) {
            // Re-sign players on user's team, and some AI players
            dao.players.iterate({
                ot: tx,
                index: "tid",
                key: IDBKeyRange.lowerBound(0),
                modify: function (p) {
                    if (p.contract.exp <= g.season && p.tid === g.userTid) {
                        // Add to free agents first, to generate a contract demand
                        player.addToFreeAgents(tx, p, g.PHASE.RESIGN_PLAYERS, baseMoods, function () {
                            // Open negotiations with player
                            contractNegotiation.create(tx, p.pid, true, function (error) {
                                if (error !== undefined && error) {
                                    eventLog.add(null, {
                                        type: "refuseToSign",
                                        text: error
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });

        return tx.complete().then(function () {
            // Set daysLeft here because this is "basically" free agency, so some functions based on daysLeft need to treat it that way (such as the trade AI being more reluctant)
            return dao.gameAttributes.set({daysLeft: 30});
        }).then(function () {
            return newPhaseFinalize(g.PHASE.RESIGN_PLAYERS, helpers.leagueUrl(["negotiation"]), ["playerMovement"]);
        });
    }

    function newPhaseFreeAgency() {
        var strategies;

        return team.filter({
            attrs: ["strategy"],
            season: g.season
        }).then(function (teams) {
            strategies = _.pluck(teams, "strategy");

            // Delete all current negotiations to resign players
            return contractNegotiation.cancelAll();
        }).then(function () {
            var tx;

            tx = dao.tx(["players", "teams"], "readwrite");

            player.genBaseMoods(tx).then(function (baseMoods) {
                // Reset contract demands of current free agents and undrafted players
                return dao.players.iterate({
                    ot: tx,
                    index: "tid",
                    key: IDBKeyRange.bound(g.PLAYER.UNDRAFTED, g.PLAYER.FREE_AGENT), // This only works because g.PLAYER.UNDRAFTED is -2 and g.PLAYER.FREE_AGENT is -1
                    modify: function (p) {
                        return player.addToFreeAgents(tx, p, g.PHASE.FREE_AGENCY, baseMoods);
                    }
                }).then(function () {
                    // AI teams re-sign players or they become free agents
                    // Run this after upding contracts for current free agents, or addToFreeAgents will be called twice for these guys
                    return dao.players.iterate({
                        ot: tx,
                        index: "tid",
                        key: IDBKeyRange.lowerBound(0),
                        modify: function (p) {
                            var contract, factor;

                            if (p.contract.exp <= g.season && p.tid !== g.userTid) {
                                // Automatically negotiate with teams
                                if (strategies[p.tid] === "rebuilding") {
                                    factor = 0.4;
                                } else {
                                    factor = 0;
                                }

                                if (Math.random() < p.value / 100 - factor) { // Should eventually be smarter than a coin flip
                                    contract = player.genContract(p);
                                    contract.exp += 1; // Otherwise contracts could expire this season
                                    p = player.setContract(p, contract, true);
                                    p.gamesUntilTradable = 15;
                                    return p; // Other endpoints include calls to addToFreeAgents, which handles updating the database
                                }

                                return player.addToFreeAgents(tx, p, g.PHASE.RESIGN_PLAYERS, baseMoods);
                            }
                        }
                    });
                });
            }).then(function () {
                // Bump up future draft classes (nested so tid updates don't cause race conditions)
                dao.players.iterate({
                    ot: tx,
                    index: "tid",
                    key: g.PLAYER.UNDRAFTED_2,
                    modify: function (p) {
                        p.tid = g.PLAYER.UNDRAFTED;
                        p.ratings[0].fuzz /= 2;
                        return p;
                    }
                }).then(function () {
                    dao.players.iterate({
                        ot: tx,
                        index: "tid",
                        key: g.PLAYER.UNDRAFTED_3,
                        modify: function (p) {
                            p.tid = g.PLAYER.UNDRAFTED_2;
                            p.ratings[0].fuzz /= 2;
                            return p;
                        }
                    });
                });
            });

            return tx.complete().then(function () {
                // Create new draft class for 3 years in the future
                return draft.genPlayers(null, g.PLAYER.UNDRAFTED_3);
            }).then(function () {
                return newPhaseFinalize(g.PHASE.FREE_AGENCY, helpers.leagueUrl(["free_agents"]), ["playerMovement"]);
            });
        });
    }

    function newPhaseFantasyDraft(position) {
        return contractNegotiation.cancelAll().then(function () {
            return draft.genOrderFantasy(position);
        }).then(function () {
            return dao.gameAttributes.set({nextPhase: g.phase});
        }).then(function () {
            var tx;

            tx = dao.tx(["players", "releasedPlayers"], "readwrite");

            // Protect draft prospects from being included in this
            dao.players.iterate({
                ot: tx,
                index: "tid",
                key: g.PLAYER.UNDRAFTED,
                modify: function (p) {
                    p.tid = g.PLAYER.UNDRAFTED_FANTASY_TEMP;
                    return p;
                }
            }).then(function () {
                // Make all players draftable
                dao.players.iterate({
                    ot: tx,
                    index: "tid",
                    key: IDBKeyRange.lowerBound(g.PLAYER.FREE_AGENT),
                    modify: function (p) {
                        p.tid = g.PLAYER.UNDRAFTED;
                        return p;
                    }
                });
            });

            // Delete all records of released players
            dao.releasedPlayers.clear({ot: tx});

            return tx.complete();
        }).then(function () {
            return newPhaseFinalize(g.PHASE.FANTASY_DRAFT, helpers.leagueUrl(["draft"]), ["playerMovement"]);
        });
    }

    /**
     * Set a new phase of the game.
     *
     * This function is called to do all the crap that must be done during transitions between phases of the game, such as moving from the regular season to the playoffs. Phases are defined in the g.PHASE.* global variables. The phase update may happen asynchronously if the database must be accessed, so do not rely on g.phase being updated immediately after this function is called. Instead, pass a callback.
     * 
     * @memberOf core.season
     * @param {number} phase Numeric phase ID. This should always be one of the g.PHASE.* variables defined in globals.js.
     * @param {} extra Parameter containing extra info to be passed to phase changing function. Currently only used for newPhaseFantasyDraft.
     * @return {Promise}
     */
    function newPhase(phase, extra) {
        // Prevent code running twice
        if (phase === g.phase) {
            return;
        }

        // Prevent new phase from being clicked twice by deleting all options from the play menu. The options will be restored after the new phase is set or if there is an error by calling ui.updatePlayMenu.
        g.vm.topMenu.options([]);

        if (phase === g.PHASE.PRESEASON) {
            return newPhasePreseason();
        } else if (phase === g.PHASE.REGULAR_SEASON) {
            return newPhaseRegularSeason();
        } else if (phase === g.PHASE.AFTER_TRADE_DEADLINE) {
            return newPhaseAfterTradeDeadline();
        } else if (phase === g.PHASE.PLAYOFFS) {
            return newPhasePlayoffs();
        } else if (phase === g.PHASE.BEFORE_DRAFT) {
            return newPhaseBeforeDraft();
        } else if (phase === g.PHASE.DRAFT) {
            return newPhaseDraft();
        } else if (phase === g.PHASE.AFTER_DRAFT) {
            return newPhaseAfterDraft();
        } else if (phase === g.PHASE.RESIGN_PLAYERS) {
            return newPhaseResignPlayers();
        } else if (phase === g.PHASE.FREE_AGENCY) {
            return newPhaseFreeAgency();
        } else if (phase === g.PHASE.FANTASY_DRAFT) {
            return newPhaseFantasyDraft(extra);
        }
    }

    /*Creates a single day's schedule for an in-progress playoffs.*/
    function newSchedulePlayoffsDay() {
        var playoffSeries, rnd, series, tids, tx;

        tx = dao.tx(["playoffSeries", "teams"], "readwrite");

        // This is a little tricky. We're returning this promise, but within the "then"s we're returning tx.complete() for the same transaction. Probably should be refactored.
        return dao.playoffSeries.get({
            ot: tx,
            key: g.season
        }).then(function (playoffSeriesLocal) {
            var i, numGames;

            playoffSeries = playoffSeriesLocal;
            series = playoffSeries.series;
            rnd = playoffSeries.currentRound;
            tids = [];

            // Try to schedule games if there are active series
            for (i = 0; i < series[rnd].length; i++) {
                if (series[rnd][i].home.won < 4 && series[rnd][i].away.won < 4) {
                    // Make sure to set home/away teams correctly! Home for the lower seed is 1st, 2nd, 5th, and 7th games.
                    numGames = series[rnd][i].home.won + series[rnd][i].away.won;
                    if (numGames === 0 || numGames === 1 || numGames === 4 || numGames === 6) {
                        tids.push([series[rnd][i].home.tid, series[rnd][i].away.tid]);
                    } else {
                        tids.push([series[rnd][i].away.tid, series[rnd][i].home.tid]);
                    }
                }
            }
        }).then(function () {
            var i, key, matchup, team1, team2, tidsWon;

            // Now playoffSeries, rnd, series, and tids are set

            // If series are still in progress, write games and short circuit
            if (tids.length > 0) {
                return dao.schedule.set(tids);
            }

            // If playoffs are over, update winner and go to next phase
            if (rnd === 3) {
                if (series[rnd][0].home.won === 4) {
                    key = series[rnd][0].home.tid;
                } else if (series[rnd][0].away.won === 4) {
                    key = series[rnd][0].away.tid;
                }
                dao.teams.iterate({
                    ot: tx,
                    key: key,
                    modify: function (t) {
                        var s;

                        s = t.seasons.length - 1;

                        t.seasons[s].playoffRoundsWon = 4;
                        t.seasons[s].hype += 0.05;
                        if (t.seasons[s].hype > 1) {
                            t.seasons[s].hype = 1;
                        }

                        return t;
                    }
                });
                return tx.complete().then(function () {
                    return newPhase(g.PHASE.BEFORE_DRAFT);
                });
            }

            // Playoffs are not over! Make another round

            // Set matchups for next round
            tidsWon = [];
            for (i = 0; i < series[rnd].length; i += 2) {
                // Find the two winning teams
                if (series[rnd][i].home.won === 4) {
                    team1 = helpers.deepCopy(series[rnd][i].home);
                    tidsWon.push(series[rnd][i].home.tid);
                } else {
                    team1 = helpers.deepCopy(series[rnd][i].away);
                    tidsWon.push(series[rnd][i].away.tid);
                }
                if (series[rnd][i + 1].home.won === 4) {
                    team2 = helpers.deepCopy(series[rnd][i + 1].home);
                    tidsWon.push(series[rnd][i + 1].home.tid);
                } else {
                    team2 = helpers.deepCopy(series[rnd][i + 1].away);
                    tidsWon.push(series[rnd][i + 1].away.tid);
                }

                // Set home/away in the next round
                if (team1.winp > team2.winp) {
                    matchup = {home: team1, away: team2};
                } else {
                    matchup = {home: team2, away: team1};
                }

                matchup.home.won = 0;
                matchup.away.won = 0;
                series[rnd + 1][i / 2] = matchup;
            }

            playoffSeries.currentRound += 1;
            dao.playoffSeries.put({ot: tx, value: playoffSeries});

            // Update hype for winning a series
            for (i = 0; i < tidsWon.length; i++) {
                dao.teams.get({
                    ot: tx,
                    key: tidsWon[i]
                }).then(function (t) {
                    var s;

                    s = t.seasons.length - 1;
                    t.seasons[s].playoffRoundsWon = playoffSeries.currentRound;
                    t.seasons[s].hype += 0.05;
                    if (t.seasons[s].hype > 1) {
                        t.seasons[s].hype = 1;
                    }

                    dao.teams.put({ot: tx, value: t});
                });
            }

            // Next time, the schedule for the first day of the next round will be set
            return tx.complete().then(newSchedulePlayoffsDay);
        });
    }

    /**
     * Get the number of days left in the regular season schedule.
     * 
     * @memberOf core.season
     * @return {Promise} The number of days left in the schedule.
     */
    function getDaysLeftSchedule() {
        return dao.schedule.get().then(function (schedule) {
            var i, numDays, tids;

            numDays = 0;

            while (schedule.length > 0) {
                // Only take the games up until right before a team plays for the second time that day
                tids = [];
                for (i = 0; i < schedule.length; i++) {
                    if (tids.indexOf(schedule[i].homeTid) < 0 && tids.indexOf(schedule[i].awayTid) < 0) {
                        tids.push(schedule[i].homeTid);
                        tids.push(schedule[i].awayTid);
                    } else {
                        break;
                    }
                }
                numDays += 1;
                schedule = schedule.slice(i);
            }

            return numDays;
        });
    }

    return {
        newPhase: newPhase,
        newSchedule: newSchedule,
        newSchedulePlayoffsDay: newSchedulePlayoffsDay,
        getDaysLeftSchedule: getDaysLeftSchedule,
        phaseText: phaseText
    };
});