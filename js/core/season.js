define(["db", "core/contractNegotiation", "core/player", "util/helpers", "util/playMenu", "util/random"], function (db, contractNegotiation, player, helpers, playMenu, random) {
    "use strict";

    /*Set a new phase of the game.

    This function is called to do all the crap that must be done during
    transitions between phases of the game, such as moving from the regular
    season to the playoffs. Phases are defined in the c.PHASE_* global
    variables.

    The phase update may happen asynchronously if the database must be accessed,
    so do not rely on g.phase being updated immediately after this function is
    called.

    Returns:
        false if everything went well, or a string containing an error message
        to be sent to the client.
    */
    function newPhase(phase) {
        var attributes, checkRosterSize, done, phaseText, playerStore, releasedPlayersStore, seasonAttributes, tid, transaction, userTeamSizeError;

        // Prevent code running twice
        if (phase === g.phase) {
            return;
        }

        // This should be called after the phase-specific stuff runs. It needs to be a separate function like this to play nice with async stuff.
        function cb(phase, phaseText) {
            helpers.setGameAttributes({phase: phase});
            playMenu.setPhase(phaseText);
            playMenu.refreshOptions();
        }

        if (phase === c.PHASE_PRESEASON) {
            helpers.setGameAttributes({season: g.season + 1});
            phaseText = g.season + " preseason";

            transaction = g.dbl.transaction(["players", "teams"], IDBTransaction.READ_WRITE);

            // Add row to team stats and season attributes
            transaction.objectStore("teams").openCursor().onsuccess = function (event) {
                var cursor, key, team, teamNewSeason, teamNewStats, teamSeason;

                cursor = event.target.result;
                if (cursor) {
                    team = cursor.value;

                    teamSeason = team.seasons[team.seasons.length - 1]; // Previous season
                    teamNewSeason = helpers.deepCopy(teamSeason);
                    // Reset everything except cash. Cash rolls over.
                    teamNewSeason.season = g.season;
                    teamNewSeason.att = 0;
                    teamNewSeason.cost = 0;
                    teamNewSeason.won = 0;
                    teamNewSeason.lost = 0;
                    teamNewSeason.wonDiv = 0;
                    teamNewSeason.lostDiv = 0;
                    teamNewSeason.wonConf = 0;
                    teamNewSeason.lostConf = 0;
                    teamNewSeason.madePlayoffs = false;
                    teamNewSeason.confChamps = false;
                    teamNewSeason.leagueChamps = false;
                    team.seasons.push(teamNewSeason);

                    teamNewStats = {};
                    // Copy new stats from any season and set to 0 (this works - see core.league.new)
                    for (key in team.stats[0]) {
                        if (team.stats[0].hasOwnProperty(key)) {
                            teamNewStats[key] = 0;
                        }
                    }
                    teamNewStats.season = g.season;
                    teamNewStats.playoffs = false;
                    team.stats.push(teamNewStats);

                    cursor.update(team);
                    cursor.continue();
                } else {
                    // Loop through all non-retired players
                    transaction.objectStore("players").index("tid").openCursor(IDBKeyRange.lowerBound(c.PLAYER_RETIRED, true)).onsuccess = function (event) {
                        var cursorP, p;

                        cursorP = event.target.result;
                        if (cursorP) {
                            p = cursorP.value;

                            // Update ratings
                            p = player.addRatingsRow(p);
                            p = player.develop(p);

                            // Add row to player stats if they are on a team
                            if (p.tid >= 0) {
                                p = player.addStatsRow(p);
                            }

                            cursorP.update(p);
                            cursorP.continue();
                        } else {
//                            // AI teams sign free agents
//                            free_agents_auto_sign()
                            cb(phase, phaseText);
                        }
                    };
                }
            };
        } else if (phase === c.PHASE_REGULAR_SEASON) {
            phaseText = g.season + " regular season";

            transaction = g.dbl.transaction(["players", "releasedPlayers", "teams"], IDBTransaction.READ_WRITE);
            playerStore = transaction.objectStore("players");

            done = 0;
            userTeamSizeError = false;
            checkRosterSize = function (tid) {
                playerStore.index("tid").getAll(IDBKeyRange.only(tid)).onsuccess = function (event) {
                    var i, numPlayersOnRoster, players, playersAll;

                    playersAll = event.target.result;
                    numPlayersOnRoster = playersAll.length;
                    if (numPlayersOnRoster > 15) {
                        if (tid === g.userTid) {
                            helpers.error("Your team currently has more than the maximum number of players (15). You must release or buy out players (from the Roster page) before the season starts.");
                            userTeamSizeError = true;
                        } else {
                            // Automatically drop lowest potential players until we reach 15
                            players = [];
                            for (i = 0; i < playersAll.length; i++) {
                                players.push({pid: playersAll[i].pid, pot: _.last(playersAll[i].ratings).pot});
                            }
                            players.sort(function (a, b) {  return a.pot - b.pot; });
                            for (i = 0; i < (numPlayersOnRoster - 15); i++) {
                                playerStore.get(players[i].pid).onsuccess = function (event) {
                                    player.release(transaction, event.target.result);
                                };
                            }
                        }
                    } else if (numPlayersOnRoster < 5) {
                        if (tid === g.userTid) {
                            helpers.error("Your team currently has less than the minimum number of players (5). You must add players (through free agency or trades) before the season starts.");
                            userTeamSizeError = true;
                        } else {
                            // Should auto-add players
                        }
                    }

                    done += 1;
                    if (done === g.numTeams && !userTeamSizeError) {
                        newSchedule(function (tids) { 
                            setSchedule(tids, function () { cb(phase, phaseText); });
                        });

                        // Auto sort rosters (except player's team)
                        for (tid = 0; tid < g.numTeams; tid++) {
                            if (tid !== g.userTid) {
                                db.rosterAutoSort(playerStore, tid);
                            }
                        }
                    }
                };
            };

            // First, make sure teams are all within the roster limits
            // CPU teams
            transaction.objectStore("teams").getAll().onsuccess = function (event) {
                var i, teams;

                teams = event.target.result;
                for (i = 0; i < teams.length; i++) {
                    checkRosterSize(teams[i].tid);
                }
            };
        } else if (phase === c.PHASE_AFTER_TRADE_DEADLINE) {
            phaseText = g.season + " regular season, after trade deadline";
            cb(phase, phaseText);
        } else if (phase === c.PHASE_PLAYOFFS) {
            phaseText = g.season + " playoffs";

            // Set playoff matchups
            attributes = ["tid", "abbrev", "name", "cid"];
            seasonAttributes = ["winp"];
            db.getTeams(null, g.season, attributes, [], seasonAttributes, "winp", function (teams) {
                var cid, i, j, row, series, teamsConf, tidPlayoffs;

                // Add entry for wins for each team; delete winp, which was only needed for sorting
                for (i = 0; i < teams.length; i++) {
                    teams[i].won = 0;
                    delete teams[i].winp;
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
                g.dbl.transaction(["playoffSeries"], IDBTransaction.READ_WRITE).objectStore("playoffSeries").add(row);

                // Add row to team stats and team season attributes
                g.dbl.transaction(["teams"], IDBTransaction.READ_WRITE).objectStore("teams").openCursor().onsuccess = function (event) {
                    var cursor, i, key, playoffStats, seasonStats, team;

                    cursor = event.target.result;
                    if (cursor) {
                        team = cursor.value;
                        if (tidPlayoffs.indexOf(team.tid) >= 0) {
                            for (i = 0; i < team.stats.length; i++) {
                                if (team.stats[i].season === g.season) {
                                    seasonStats = team.stats[i];
                                    break;
                                }
                            }
                            playoffStats = {};
                            for (key in seasonStats) {
                                if (seasonStats.hasOwnProperty(key)) {
                                    playoffStats[key] = 0;
                                }
                            }
                            playoffStats.season = g.season;
                            playoffStats.playoffs = true;
                            team.stats.push(playoffStats);
                            cursor.update(team);

                            // Add row to player stats
                            g.dbl.transaction(["players"], IDBTransaction.READ_WRITE).objectStore("players").index("tid").openCursor(IDBKeyRange.only(team.tid)).onsuccess = function (event) {
                                var cursorP, key, p, playerPlayoffStats;

                                cursorP = event.target.result;
                                if (cursorP) {
                                    p = cursorP.value;
                                    p = player.addStatsRow(p, p.tid, true);
                                    cursorP.update(p);
                                    cursorP.continue();
                                }
//                                else {
//                                    cursor.continue();
//                                }
                            };
                        }
//                        else {
// RACE CONDITION: Should only run after the players update above finishes. won't be a race condition if they use the same transaction
                            cursor.continue();
//                        }
                    } else {
                        cb(phase, phaseText);
                    }
                };
            });
//                g.dbex('UPDATE team_attributes SET playoffs = TRUE WHERE season = :season AND tid IN :tids', season=g.season, tids=tids)
        } else if (phase === c.PHASE_BEFORE_DRAFT) {
            phaseText = g.season + " before draft";

            // Select winners of the season's awards
            awards();

            // Remove released players' salaries from payrolls
            releasedPlayersStore = g.dbl.transaction("releasedPlayers", IDBTransaction.READ_WRITE).objectStore("releasedPlayers");
            releasedPlayersStore.index("contractExp").getAll(g.season).onsuccess = function (event) {
                var i, releasedPlayers;

                releasedPlayers = event.target.result;

                for (i = 0; i < releasedPlayers.length; i++) {
                    releasedPlayersStore.delete(releasedPlayers[i].rid);
                }
            };

            // Add a year to the free agents
//            g.dbex('UPDATE player_attributes SET contract_exp = contract_exp + 1 WHERE tid = :tid', tid=c.PLAYER_FREE_AGENT)

//            cb(phase, phaseText);
        } else if (phase === c.PHASE_DRAFT) {
            phaseText = g.season + " draft";
            cb(phase, phaseText);
        } else if (phase === c.PHASE_AFTER_DRAFT) {
            phaseText = g.season + " after draft";
            cb(phase, phaseText);
        } else if (phase === c.PHASE_RESIGN_PLAYERS) {
            phaseText = g.season + " resign players";

            playerStore = g.dbl.transaction(["players"], IDBTransaction.READ_WRITE).objectStore("players");

            // Check for retiring players
            playerStore.index("tid").openCursor(IDBKeyRange.lowerBound(c.PLAYER_RETIRED, true)).onsuccess = function (event) { // All non-retired players
                var age, cont, cursor, excessAge, excessPot, i, maxAge, minPot, p, pot, update;

                update = false;

                // Players meeting one of these cutoffs might retire
                maxAge = 34;
                minPot = 40;

                cursor = event.target.result;
                if (cursor) {
                    p = cursor.value;

                    age = g.season - p.bornYear;
                    pot = _.last(p.ratings).pot;

                    if (age > maxAge || pot < minPot) {
                        excessAge = 0;
                        if (age > 34 || p.tid === c.PLAYER_FREE_AGENT) {  // Only players older than 34 or without a contract will retire
                            if (age > 34) {
                                excessAge = (age - 34) / 20;  // 0.05 for each year beyond 34
                            }
                            excessPot = (40 - pot) / 50.0;  // 0.02 for each potential rating below 40 (this can be negative)
                            if (excessAge + excessPot + random.gauss(0, 1) > 0) {
                                p.tid = c.PLAYER_RETIRED;
                                p.retiredYear = g.season;
                                update = true;
                            }
                        }
                    }

                    // Update "free agent years" counter and retire players who have been free agents for more than one years
                    if (p.tid === c.PLAYER_FREE_AGENT) {
                        if (p.yearsFreeAgent >= 1) {
                            p.tid = c.PLAYER_RETIRED;
                            p.retiredYear = g.season;
                        } else {
                            p.yearsFreeAgent += 1;
                        }
                        update = true;
                    } else if (p.tid >= 0 && p.yearsFreeAgent > 0) {
                        p.yearsFreeAgent = 0;
                        update = true;
                    }

                    // Update player in DB, if necessary
                    if (update) {
                        cursor.update(p);
                    }
                }
            };

            // Resign players or they become free agents
            playerStore.index("tid").openCursor(IDBKeyRange.lowerBound(0)).onsuccess = function (event) {
                var cont, cursor, i, p;

                cursor = event.target.result;
                if (cursor) {
                    p = cursor.value;
                    if (p.contractExp === g.season) {
                        if (p.tid !== g.userTid) {
                            // Automatically negotiate with teams
                            if (Math.random() > 0.5) { // Should eventually be smarter than a coin flip
                                cont = player.contract(_.last(p.ratings));
                                p.contractAmount = cont.amount;
                                p.contractExp = cont.exp;
                                cursor.update(p); // Other endpoints include calls to addToFreeAgents, which handles updating the database
                            } else {
                                player.addToFreeAgents(playerStore, p, phase);
                            }
                        } else {
                            // Add to free agents first, to generate a contract demand
                            player.addToFreeAgents(playerStore, p, phase, function () {
                                // Open negotiations with player
                                contractNegotiation.create(p.pid, true);
                            });
                        }
                    }
                    cursor.continue();
                } else {
                    cb(phase, phaseText);
                    Davis.location.assign(new Davis.Request("/l/" + g.lid + "/negotiation"));
                }
            };
        } else if (phase === c.PHASE_FREE_AGENCY) {
            phaseText = g.season + " free agency";

            // Delete all current negotiations to resign players
            contractNegotiation.cancelAll();

            playerStore = g.dbl.transaction(["players"], IDBTransaction.READ_WRITE).objectStore("players");

            // Reset contract demands of current free agents
            // This IDBKeyRange only works because c.PLAYER_UNDRAFTED is -2 and c.PLAYER_FREE_AGENT is -1
            playerStore.index("tid").openCursor(IDBKeyRange.bound(c.PLAYER_UNDRAFTED, c.PLAYER_FREE_AGENT)).onsuccess = function (event) {
                var cursor, p;

                cursor = event.target.result;
                if (cursor) {
                    p = cursor.value;
                    player.addToFreeAgents(playerStore, p, phase);
                    cursor.update(p);
                    cursor.continue();
                } else {
                    cb(phase, phaseText);
                    Davis.location.assign(new Davis.Request("/l/" + g.lid + "/free_agents"));
                }
            };
        }//*/
    }

    /*Creates a new regular season schedule with appropriate division and
    conference matchup distributions.
    */
    function newSchedule(cb) {
        helpers.getTeams(undefined, function (teamsAll) {
            var cid, days, dids, game, games, good, i, ii, iters, j, jj, jMax, k, matchup, matchups, n, newMatchup, t, team, teams, tids, tidsByConf, tidsInDays, tryNum, used;

            teams = [];
            tids = [];  // tid_home, tid_away

            // Collect info needed for scheduling
            for (i = 0; i < teamsAll.length; i++) {
                team = teamsAll[i];
                teams.push({tid: team.tid, cid: team.cid, did: team.did, homeGames: 0, awayGames: 0});
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
            random.shuffle(days);  // Otherwise the most dense days will be at the beginning and the least dense days will be at the end
            tids = _.flatten(days, true);
            cb(tids);
        });
    }

    /*Creates a single day's schedule for an in-progress playoffs.*/
    function newSchedulePlayoffsDay(cb) {
        // Make today's  playoff schedule
        g.dbl.transaction(["playoffSeries"], IDBTransaction.READ_WRITE).objectStore("playoffSeries").openCursor(IDBKeyRange.only(g.season)).onsuccess = function (event) {
            var cursor, i, matchup, nextRound, numActiveTeams, playoffsOver, playoffSeries, rnd, series, tids;

            cursor = event.target.result;
            playoffSeries = cursor.value;
            series = playoffSeries.series;
            rnd = playoffSeries.currentRound;
            tids = [];
            numActiveTeams = 0;
            playoffsOver = false;

            for (i = 0; i < series[rnd].length; i++) {
                if (series[rnd][i].home.won < 4 && series[rnd][i].away.won < 4) {
                    tids.push([series[rnd][i].home.tid, series[rnd][i].away.tid]);
                    numActiveTeams += 2;
                }
            }
            if (numActiveTeams > 0) {
                setSchedule(tids, function () { cb(numActiveTeams); });
            } else {
                // The previous round is over. Either make a new round or go to the next phase.

                // Are the whole playoffs over?
                if (rnd === 3) {
                    newPhase(c.PHASE_BEFORE_DRAFT);
                    playoffsOver = true;
                } else {
                    nextRound = [];
                    for (i = 0; i < series[rnd].length; i += 2) {
                        matchup = {home: {}, away: {}};
                        if (series[rnd][i].home.won === 4) {
                            matchup.home = helpers.deepCopy(series[rnd][i].home);
                        } else {
                            matchup.home = helpers.deepCopy(series[rnd][i].away);
                        }
                        if (series[rnd][i + 1].home.won === 4) {
                            matchup.away = helpers.deepCopy(series[rnd][i + 1].home);
                        } else {
                            matchup.away = helpers.deepCopy(series[rnd][i + 1].away);
                        }
                        matchup.home.won = 0;
                        matchup.away.won = 0;
                        series[rnd + 1][i / 2] = matchup;
                    }
                    playoffSeries.currentRound += 1;
                    cursor.update(playoffSeries, playoffsOver);
                }
/*
                // Who won?
                winners = {}
                r = g.dbex('SELECT sid, tid_home, tid_away, seed_home, seed_away, won_home, won_away FROM playoff_series WHERE round = :round AND season = :season ORDER BY sid ASC', round=current_round, season=g.season)
                for row in r.fetchall()) {
                    sid, tid_home, tid_away, seed_home, seed_away, won_home, won_away = row
                    if (won_home === 4) {
                        winners[sid] = [tid_home, seed_home]
                    else {
                        winners[sid] = [tid_away, seed_away]
                    // Record user's team as conference and league champion
                    if (current_round === 3) {
                        g.dbex('UPDATE team_attributes SET conf_champs = TRUE WHERE season = :season AND tid = :tid', season=g.season, tid=winners[sid][0])
                    else if (current_round === 4) {
                        g.dbex('UPDATE team_attributes SET league_champs = TRUE WHERE season = :season AND tid = :tid', season=g.season, tid=winners[sid][0])*/

                cb(numActiveTeams);
            }
        };
    }

    /*Computes the awards at the end of a season.*/
    function awards() {
        // Any non-retired player can win an award
/*        g.dbl.transaction("players").objectStore("players").index("tid").getAll(IDBKeyRange.lowerBound(c.PLAYER_RETIRED, true)).onsuccess = function (event) {
console.log(event.target.result);
            var attributes, players, ratings, stats;

            attributes = ["pid", "name", "tid", "abbrev", "draftYear"];
            stats = ["gp", "gs", "min", "pts", "trb", "ast", "blk", "stl"];
            ratings = [];
            players = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings);
console.log(players);
        };*/
/*        // Cache averages
        g.dbex('CREATE TEMPORARY TABLE awards_avg (pid INTEGER PRIMARY KEY, name VARCHAR(255), tid INTEGER, abbrev VARCHAR(3), draft_year INTEGER, games_played INTEGER, games_started INTEGER, min FLOAT, pts FLOAT, trb FLOAT, ast FLOAT, blk FLOAT, stl FLOAT)')
        g.dbex('INSERT INTO awards_avg (pid, name, tid, abbrev, draft_year, games_played, games_started, min, pts, trb, ast, blk, stl) (SELECT pa.pid, pa.name, pa.tid, ta.abbrev, pa.draft_year, SUM(CASE WHEN ps.min > 0 THEN 1 ELSE 0 END) AS games_played, SUM(ps.gs) AS games_started, AVG(ps.min) AS min, AVG(ps.pts) AS pts, AVG(ps.orb+ps.drb) AS trb, AVG(ps.ast) AS ast, AVG(ps.blk) AS blk, AVG(ps.stl) AS stl FROM player_attributes as pa, player_stats as ps, team_attributes as ta WHERE pa.pid = ps.pid AND ps.season = :season AND ps.playoffs = FALSE AND ta.tid = pa.tid AND ta.season = ps.season GROUP BY ps.pid)', season=g.season)

        r = g.dbex('SELECT tid, abbrev, region, name, won, lost FROM team_attributes AS ta WHERE season = :season AND (SELECT cid FROM divisions AS ld WHERE ld.did = ta.did) = 0 ORDER BY CASE won + lost WHEN 0 THEN 0 ELSE won / (won + lost) END DESC', season=g.season)
        bre = r.fetchone()
        r = g.dbex('SELECT tid, abbrev, region, name, won, lost FROM team_attributes AS ta WHERE season = :season AND (SELECT cid FROM divisions AS ld WHERE ld.did = ta.did) = 1 ORDER BY CASE won + lost WHEN 0 THEN 0 ELSE won / (won + lost) END DESC', season=g.season)
        brw = r.fetchone()

        r = g.dbex('SELECT pid, name, tid, abbrev, pts, trb, ast FROM awards_avg ORDER BY (0.75 * pts) + ast + trb DESC')
        mvp =  r.fetchone()
        r = g.dbex('SELECT pid, name, tid, abbrev, trb, blk, stl FROM awards_avg ORDER BY trb + 5 * blk + 5 * stl DESC')
        dpoy = r.fetchone()
        r = g.dbex('SELECT pid, name, tid, abbrev, pts, trb, ast FROM awards_avg WHERE games_played/(games_started+1) > 2 ORDER BY (0.75 * pts) + ast + trb DESC')
        smoy = r.fetchone()
        r = g.dbex('SELECT pid, name, tid, abbrev, pts, trb, ast FROM awards_avg WHERE draft_year = :season - 1 ORDER BY (0.75 * pts) + ast + trb DESC', season=g.season)
        roy = r.fetchone()

        g.dbex('INSERT INTO awards (season, bre_tid, bre_abbrev, bre_region, bre_name, bre_won, bre_lost, brw_tid, brw_abbrev, brw_region, brw_name, brw_won, brw_lost, mvp_pid, mvp_name, mvp_tid, mvp_abbrev, mvp_pts, mvp_trb, mvp_ast, dpoy_pid, dpoy_name, dpoy_tid, dpoy_abbrev, dpoy_trb, dpoy_blk, dpoy_stl, smoy_pid, smoy_name, smoy_tid, smoy_abbrev, smoy_pts, smoy_trb, smoy_ast, roy_pid, roy_name, roy_tid, roy_abbrev, roy_pts, roy_trb, roy_ast) VALUES (:season, :bre_tid, :bre_abbrev, :bre_region, :bre_name, :bre_won, :bre_lost, :brw_tid, :brw_abbrev, :brw_region, :brw_name, :brw_won, :brw_lost, :mvp_pid, :mvp_name, :mvp_tid, :mvp_abbrev, :mvp_pts, :mvp_trb, :mvp_ast, :dpoy_pid, :dpoy_name, :dpoy_tid, :dpoy_abbrev, :dpoy_trb, :dpoy_blk, :dpoy_stl, :smoy_pid, :smoy_name, :smoy_tid, :smoy_abbrev, :smoy_pts, :smoy_trb, :smoy_ast, :roy_pid, :roy_name, :roy_tid, :roy_abbrev, :roy_pts, :roy_trb, :roy_ast)', season=g.season, bre_tid=bre['tid'], bre_abbrev=bre['abbrev'], bre_region=bre['region'], bre_name=bre['name'], bre_won=bre['won'], bre_lost=bre['lost'], brw_tid=brw['tid'], brw_abbrev=brw['abbrev'], brw_region=brw['region'], brw_name=brw['name'], brw_won=brw['won'], brw_lost=brw['lost'], mvp_pid=mvp['pid'], mvp_name=mvp['name'], mvp_tid=mvp['tid'], mvp_abbrev=mvp['abbrev'], mvp_pts=mvp['pts'], mvp_trb=mvp['trb'], mvp_ast=mvp['ast'], dpoy_pid=dpoy['pid'], dpoy_name=dpoy['name'], dpoy_tid=dpoy['tid'], dpoy_abbrev=dpoy['abbrev'], dpoy_trb=dpoy['trb'], dpoy_blk=dpoy['blk'], dpoy_stl=dpoy['stl'], smoy_pid=smoy['pid'], smoy_name=smoy['name'], smoy_tid=smoy['tid'], smoy_abbrev=smoy['abbrev'], smoy_pts=smoy['pts'], smoy_trb=smoy['trb'], smoy_ast=smoy['ast'], roy_pid=roy['pid'], roy_name=roy['name'], roy_tid=roy['tid'], roy_abbrev=roy['abbrev'], roy_pts=roy['pts'], roy_trb=roy['trb'], roy_ast=roy['ast'])

        g.dbex('INSERT INTO awards_all_league (season, team_type, pid, name, abbrev, pts, trb, ast, blk, stl) (SELECT :season, \'league\', pid, name, abbrev, pts, trb, ast, blk, stl FROM awards_avg ORDER BY (0.75 * pts) + ast + trb DESC LIMIT 15)', season=g.season)
        g.dbex('INSERT INTO awards_all_league (season, team_type, pid, name, abbrev, pts, trb, ast, blk, stl) (SELECT :season, \'defensive\', pid, name, abbrev, pts, trb, ast, blk, stl FROM awards_avg ORDER BY trb + 5 * blk + 5 * stl DESC LIMIT 15)', season=g.season)

        g.dbex('DROP TABLE awards_avg')*/
    }

    /*Save the schedule to the database, overwriting what's currently there.

    Args:
        tids: A list of lists, each containing the team IDs of the home and
            away teams, respectively, for every game in the season.
    */
    function setSchedule(tids, cb) {
        helpers.getTeams(undefined, function (teams) {
            var i, row, schedule, scheduleStore;

            schedule = [];
            for (i = 0; i < tids.length; i++) {
                row = {homeTid: tids[i][0], awayTid: tids[i][1]};
                row.homeAbbrev = teams[row.homeTid].abbrev;
                row.homeRegion = teams[row.homeTid].region;
                row.homeName = teams[row.homeTid].name;
                row.awayAbbrev = teams[row.awayTid].abbrev;
                row.awayRegion = teams[row.awayTid].region;
                row.awayName = teams[row.awayTid].name;
                schedule.push(row);
            }
            scheduleStore = g.dbl.transaction(["schedule"], IDBTransaction.READ_WRITE).objectStore("schedule");
            scheduleStore.getAll().onsuccess = function (event) {
                var currentSchedule, i;

                currentSchedule = event.target.result;
                for (i = 0; i < currentSchedule.length; i++) {
                    scheduleStore.delete(currentSchedule[i].gid);
                }

                for (i = 0; i < schedule.length; i++) {
                    scheduleStore.add(schedule[i]);
                }

                cb();
            };
        });
    }

    /*Returns an array of numDays days worth of games (really, just one day), or all games in the schedule if numDays
    is 0 (default). It is important that, when requesting a day's games, no team will be scheduled to play more than once that day.
    */
    function getSchedule(numDays, cb) {
        numDays = parseInt(numDays, 10);
        g.dbl.transaction(["schedule"]).objectStore("schedule").getAll().onsuccess = function (event) {
            var i, schedule, tids;

            schedule = event.target.result;
            if (numDays > 0) {
                schedule = schedule.slice(0, g.numTeams / 2);  // This is the maximum number of games possible in a day

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
                schedule = schedule.slice(0, i);
            }
            cb(schedule);
        };
    }

    return {
        newPhase: newPhase,
        newSchedule: newSchedule,
        newSchedulePlayoffsDay: newSchedulePlayoffsDay,
        awards: awards,
        setSchedule: setSchedule,
        getSchedule: getSchedule
    };
});