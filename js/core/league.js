/**
 * @name core.league
 * @namespace Creating and removing leagues.
 */
define(["dao", "db", "globals", "ui", "core/draft", "core/finances", "core/player", "core/season", "core/team", "lib/bluebird", "lib/underscore", "util/helpers", "util/random"], function (dao, db, g, ui, draft, finances, player, season, team, Promise, _, helpers, random) {
    "use strict";

    // x and y are both arrays of objects with the same length. For each object, any properties in y but not x will be copied over to x.
    function merge(x, y) {
        var i, prop;

        for (i = 0; i < x.length; i++) {
            // Fill in default values as needed
            for (prop in y[i]) {
                if (y[i].hasOwnProperty(prop) && !x[i].hasOwnProperty(prop)) {
                    x[i][prop] = y[i][prop];
                }
            }
        }

        return x;
    }

    /**
     * Create a new league.
     * 
     * @memberOf core.league
     * @param {string} name The name of the league.
     * @param {number} tid The team ID for the team the user wants to manage (or -1 for random).
     */
    function create(name, tid, leagueFile, startingSeason, randomizeRosters) {
        var phaseText, skipNewPhase, teams, teamsDefault;

        // Any user input?
        if (!leagueFile) {
            leagueFile = {}; // Allow checking of properties
        }

        // Default teams
        teamsDefault = helpers.getTeamsDefault();

        // Any custom teams?
        if (leagueFile.hasOwnProperty("teams")) {
            teams = merge(leagueFile.teams, teamsDefault);

            // Add in popRanks
            teams = helpers.addPopRank(teams);
        } else {
            teams = teamsDefault;
        }

        // Handle random team
        if (tid === -1) {
            tid = random.randInt(0, teams.length - 1);
        }

        if (leagueFile.hasOwnProperty("meta") && leagueFile.meta.hasOwnProperty("phaseText")) {
            phaseText = leagueFile.meta.phaseText;
        } else {
            phaseText =  "";
        }

        // Record in meta db
        return dao.leagues.add({
            value: {
                name: name,
                tid: tid,
                phaseText: phaseText,
                teamName: teams[tid].name,
                teamRegion: teams[tid].region
            }
        }).then(function (lid) {
            g.lid = lid;

            // Create new league database
            return db.connectLeague(g.lid);
        }).then(function () {
            var gameAttributes, i;

            // Default values
            gameAttributes = {
                userTid: tid,
                season: startingSeason,
                startingSeason: startingSeason,
                phase: 0,
                nextPhase: null, // Used only for fantasy draft
                daysLeft: 0, // Used only for free agency
                gamesInProgress: false,
                stopGames: false,
                lastDbChange: 0,
                leagueName: name,
                ownerMood: {
                    wins: 0,
                    playoffs: 0,
                    money: 0
                },
                gameOver: false,
                teamAbbrevsCache: _.pluck(teams, "abbrev"),
                teamRegionsCache: _.pluck(teams, "region"),
                teamNamesCache: _.pluck(teams, "name"),
                showFirstOwnerMessage: true, // true when user starts with a new team, so initial owner message can be shown
                gracePeriodEnd: startingSeason + 2, // Can't get fired for the first two seasons
                numTeams: teams.length // Will be 30 if the user doesn't supply custom rosters
            };

            // gameAttributes from input
            skipNewPhase = false;
            if (leagueFile.hasOwnProperty("gameAttributes")) {
                for (i = 0; i < leagueFile.gameAttributes.length; i++) {
                    // Set default for anything except team ID and name, since they can be overwritten by form input.
                    if (leagueFile.gameAttributes[i].key !== "userTid" && leagueFile.gameAttributes[i].key !== "leagueName") {
                        gameAttributes[leagueFile.gameAttributes[i].key] = leagueFile.gameAttributes[i].value;
                    }

                    if (leagueFile.gameAttributes[i].key === "phase") {
                        skipNewPhase = true;
                    }
                }
            }

            // Clear old game attributes from g, to make sure the new ones are saved to the db in db.setGameAttributes
            helpers.resetG();

            return dao.gameAttributes.set(gameAttributes);
        }).then(function () {
            var i, j, t, round, scoutingRank, toMaybeAdd, tx;

            // Probably is fastest to use this transaction for everything done to create a new league
            tx = dao.tx(["draftPicks", "draftOrder", "players", "playerStats", "teams", "trade", "releasedPlayers", "awards", "schedule", "playoffSeries", "negotiations", "messages", "games"], "readwrite");

            // Draft picks for the first 4 years, as those are the ones can be traded initially
            if (leagueFile.hasOwnProperty("draftPicks")) {
                for (i = 0; i < leagueFile.draftPicks.length; i++) {
                    dao.draftPicks.add({ot: tx, value: leagueFile.draftPicks[i]});
                }
            } else {
                for (i = 0; i < 4; i++) {
                    for (t = 0; t < g.numTeams; t++) {
                        for (round = 1; round <= 2; round++) {
                            dao.draftPicks.add({
                                ot: tx,
                                value: {
                                    tid: t,
                                    originalTid: t,
                                    round: round,
                                    season: g.startingSeason + i
                                }
                            });
                        }
                    }
                }
            }

            // Initialize draft order object store for later use
            if (leagueFile.hasOwnProperty("draftOrder")) {
                for (i = 0; i < leagueFile.draftOrder.length; i++) {
                    dao.draftOrder.add({ot: tx, value: leagueFile.draftOrder[i]});
                }
            } else {
                dao.draftOrder.add({
                    ot: tx,
                    value: {
                        rid: 1,
                        draftOrder: []
                    }
                });
            }

            // teams already contains tid, cid, did, region, name, and abbrev. Let's add in the other keys we need for the league.
            for (i = 0; i < g.numTeams; i++) {
                t = team.generate(teams[i]);
                dao.teams.add({ot: tx, value: t});

                // Save scoutingRank for later
                if (i === g.userTid) {
                    scoutingRank = finances.getRankLastThree(t, "expenses", "scouting");
                }
            }

            if (leagueFile.hasOwnProperty("trade")) {
                for (i = 0; i < leagueFile.trade.length; i++) {
                    dao.trade.add({ot: tx, value: leagueFile.trade[i]});
                }
            } else {
                dao.trade.add({
                    ot: tx,
                    value: {
                        rid: 0,
                        teams: [
                            {
                                tid: tid,
                                pids: [],
                                dpids: []
                            },
                            {
                                tid: tid === 0 ? 1 : 0,  // Load initial trade view with the lowest-numbered non-user team (so, either 0 or 1).
                                pids: [],
                                dpids: []
                            }
                        ]
                    }
                });
            }

            // These object stores are blank by default
            toMaybeAdd = ["releasedPlayers", "awards", "schedule", "playoffSeries", "negotiations", "messages", "games"];
            for (j = 0; j < toMaybeAdd.length; j++) {
                if (leagueFile.hasOwnProperty(toMaybeAdd[j])) {
                    for (i = 0; i < leagueFile[toMaybeAdd[j]].length; i++) {
                        dao[toMaybeAdd[j]].add({
                            ot: tx,
                            value: leagueFile[toMaybeAdd[j]][i]
                        });
                    }
                }
            }

            return player.genBaseMoods(tx).then(function (baseMoods) {
                var agingYears, baseRatings, draftYear, goodNeutralBad, i, j, n, p, players, pots, profile, profiles, t, t2, playerTids;

                // Either add players from league file or generate them

                if (leagueFile.hasOwnProperty("players")) {
                    // Use pre-generated players, filling in attributes as needed
                    players = leagueFile.players;

                    // Does the player want the rosters randomized?
                    if (randomizeRosters) {
                        // Assign the team ID of all players to the 'playerTids' array.
                        // Check tid to prevent draft prospects from being swapped with established players
                        playerTids = _.pluck(players.filter(function (p) { return p.tid >= g.PLAYER.FREE_AGENT; }), "tid");

                        // Shuffle the teams that players are assigned to.
                        random.shuffle(playerTids);
                        for (i = 0; i < players.length; i++) {
                            if (players[i].tid >= g.PLAYER.FREE_AGENT) {
                                players[i].tid = playerTids.pop();
                            }
                        }
                    }

                    players.forEach(function (p) {
                        var playerStats;

                        p = player.augmentPartialPlayer(p, scoutingRank);

                        // Separate out stats
                        playerStats = p.stats;
                        delete p.stats;

                        player.updateValues(tx, p, playerStats.reverse()).then(function (p) {
                            dao.players.put({ot: tx, value: p}).then(function (pid) {
                                var addStatsRows;

                                // When adding a player, this is the only way to know the pid
                                p.pid = pid;

                                // If no stats in League File, create blank stats rows for active players if necessary
                                if (playerStats.length === 0) {
                                    if (p.tid >= 0) {
                                        // Needs pid, so must be called after put. It's okay, statsTid was already set in player.augmentPartialPlayer
                                        p = player.addStatsRow(tx, p, g.phase === g.PHASE.PLAYOFFS);
                                    }
                                } else {
                                    // If there are stats in the League File, add them to the database
                                    addStatsRows = function () {
                                        var ps;

                                        ps = playerStats.pop();

                                        // Augment with pid, if it's not already there - can't be done in player.augmentPartialPlayer because pid is not known at that point
                                        ps.pid = p.pid;

                                        // Could be calculated correctly if I wasn't lazy
                                        if (!ps.hasOwnProperty("yearsWithTeam")) {
                                            ps.yearsWithTeam = 1;
                                        }

                                        // Delete psid because it can cause problems due to interaction addStatsRow above
                                        delete ps.psid;

                                        dao.playerStats.add({ot: tx, value: ps}).then(function () {
                                            // On to the next one
                                            if (playerStats.length > 0) {
                                                addStatsRows();
                                            }
                                        });
                                    };
                                    addStatsRows();
                                }
                            });
                        });
                    });
                } else {
                    // No players in league file, so generate new players
                    profiles = ["Point", "Wing", "Big", ""];
                    baseRatings = [37, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 26, 26, 26];
                    pots = [75, 65, 55, 55, 60, 50, 70, 40, 55, 50, 60, 60, 45, 45];

                    for (t = -3; t < teams.length; t++) {
                        // Create multiple "teams" worth of players for the free agent pool
                        if (t < 0) {
                            t2 = g.PLAYER.FREE_AGENT;
                        } else {
                            t2 = t;
                        }

                        goodNeutralBad = random.randInt(-1, 1);  // determines if this will be a good team or not
                        random.shuffle(pots);
                        for (n = 0; n < 14; n++) {
                            profile = profiles[random.randInt(0, profiles.length - 1)];
                            agingYears = random.randInt(0, 13);
                            draftYear = g.startingSeason - 1 - agingYears;

                            p = player.generate(t2, 19, profile, baseRatings[n], pots[n], draftYear, true, scoutingRank);
                            p = player.develop(p, agingYears, true);
                            if (n < 5) {
                                p = player.bonus(p, goodNeutralBad * random.randInt(0, 20));
                            } else {
                                p = player.bonus(p, 0);
                            }
                            if (t2 === g.PLAYER.FREE_AGENT) {  // Free agents
                                p = player.bonus(p, -15);
                            }

                            // Hack to account for player.addStatsRow being called after dao.players.put - manually assign statsTids
                            if (p.tid >= 0) {
                                p.statsTids = [p.tid];
                            }

                            // Update player values after ratings changes
                            player.updateValues(tx, p, []).then(function (p) {
                                var randomizeExp;

                                // Randomize contract expiration for players who aren't free agents, because otherwise contract expiration dates will all be synchronized
                                randomizeExp = (p.tid !== g.PLAYER.FREE_AGENT);

                                // Update contract based on development. Only write contract to player log if not a free agent.
                                p = player.setContract(p, player.genContract(p, randomizeExp), p.tid >= 0);

                                // Save to database
                                if (p.tid === g.PLAYER.FREE_AGENT) {
                                    player.addToFreeAgents(tx, p, null, baseMoods);
                                } else {
                                    dao.players.put({ot: tx, value: p}).then(function (pid) {
                                        // When adding a player, this is the only way to know the pid
                                        p.pid = pid;

                                        // Needs pid, so must be called after put. It's okay, statsTid was already set above
                                        p = player.addStatsRow(tx, p, g.phase === g.PHASE.PLAYOFFS);
                                    });
                                }
                            });
                        }

                        // Initialize rebuilding/contending, when possible
                        if (t2 >= 0 && goodNeutralBad === 1) {
                            tx.objectStore("teams").openCursor(t2).onsuccess = function (event) {
                                var cursor, t;

                                cursor = event.target.result;
                                t = cursor.value;
                                t.strategy = "contending";
                                cursor.update(t);
                            };
                        } else if (t2 >= 0 && goodNeutralBad === -1) {
                            tx.objectStore("teams").openCursor(t2).onsuccess = function (event) {
                                var cursor, t;

                                cursor = event.target.result;
                                t = cursor.value;
                                t.strategy = "rebuilding";
                                cursor.update(t);
                            };
                        }
                    }
                }

                return tx.complete().then(function () {
                    return players;
                });
            }).then(function (players) {
                var createUndrafted1, createUndrafted2, createUndrafted3, i, tx;

                // Use a new transaction so there is no race condition with generating draft prospects and regular players (PIDs can seemingly collide otherwise, if it's an imported roster)
                tx = dao.tx(["players", "playerStats"], "readwrite");

                // See if imported roster has draft picks included. If so, create less than 70 (scaled for number of teams)
                createUndrafted1 = Math.round(70 * g.numTeams / 30);
                createUndrafted2 = Math.round(70 * g.numTeams / 30);
                createUndrafted3 = Math.round(70 * g.numTeams / 30);
                if (players !== undefined) {
                    for (i = 0; i < players.length; i++) {
                        if (players[i].tid === g.PLAYER.UNDRAFTED) {
                            createUndrafted1 -= 1;
                        } else if (players[i].tid === g.PLAYER.UNDRAFTED_2) {
                            createUndrafted2 -= 1;
                        } else if (players[i].tid === g.PLAYER.UNDRAFTED_3) {
                            createUndrafted3 -= 1;
                        }
                    }
                }
                // If the draft has already happened this season but next year's class hasn't been bumped up, don't create any g.PLAYER.UNDRAFTED
                if (createUndrafted1 && (g.phase <= g.PHASE.BEFORE_DRAFT || g.phase >= g.PHASE.FREE_AGENCY)) {
                    draft.genPlayers(tx, g.PLAYER.UNDRAFTED, scoutingRank, createUndrafted1);
                }
                if (createUndrafted2) {
                    draft.genPlayers(tx, g.PLAYER.UNDRAFTED_2, scoutingRank, createUndrafted2);
                }
                if (createUndrafted3) {
                    draft.genPlayers(tx, g.PLAYER.UNDRAFTED_3, scoutingRank, createUndrafted3);
                }

                return tx.complete().then(function () {
                    if (skipNewPhase) {
                        // Game already in progress, just start it
                        return g.lid;
                    }

                    // Make schedule, start season
                    return season.newPhase(g.PHASE.REGULAR_SEASON).then(function () {
                        var lid;

                        ui.updateStatus("Idle");

                        lid = g.lid; // Otherwise, g.lid can be overwritten before the URL redirects, and then we no longer know the league ID

                        helpers.bbgmPing("league");

                        // Auto sort player's roster (other teams will be done in season.newPhase(g.PHASE.REGULAR_SEASON))
                        return team.rosterAutoSort(null, g.userTid).then(function () {
                            return lid;
                        });
                    });
                });
            });
        });
    }

    /**
     * Delete an existing league.
     * 
     * @memberOf core.league
     * @param {number} lid League ID.
     * @param {function()=} cb Optional callback.
     */
    function remove(lid) {
        return new Promise(function (resolve, reject) {
            var request;

            if (g.dbl !== undefined) {
                g.dbl.close();
            }

            dao.leagues.delete({key: lid});
            request = indexedDB.deleteDatabase("league" + lid);
            request.onsuccess = function (event) {
                console.log("Database league" + lid + " successfully deleted");
                resolve();
            };
            request.onfailure = function (event) {
                console.log("Error: ", event);
                resolve();
            };
            request.onblocked = function (event) {
                console.log("Blocked: ", event);
                resolve();
            };
        });
    }


    /**
     * Export existing active league.
     * 
     * @memberOf core.league
     * @param {string[]} stores Array of names of objectStores to include in export
     * @return {Promise} Resolve to all the exported league data.
     */
    function export_(stores) {
        var exportedLeague,  exportStore, i, promises;

        exportedLeague = {};

        // Row from leagueStore in meta db.
        // phaseText is needed if a phase is set in gameAttributes.
        // name is only used for the file name of the exported roster file.
        exportedLeague.meta = {phaseText: g.phaseText, name: g.leagueName};

        exportStore = function (i) {
            return dao[stores[i]].getAll().then(function (store) {
                exportedLeague[stores[i]] = store;
            });
        };

        promises = [];
        for (i = 0; i < stores.length; i++) {
            promises.push(exportStore(i));
        }

        return Promise.all(promises).then(function () {
            // Move playerStats to players object, similar to old DB structure. Makes editing JSON output nicer.
            var i, j, pid;

            if (stores.indexOf("playerStats") >= 0) {
                for (i = 0; i < exportedLeague.playerStats.length; i++) {
                    pid = exportedLeague.playerStats[i].pid;

                    // Find player corresponding with that stats row
                    for (j = 0; j < exportedLeague.players.length; j++) {
                        if (exportedLeague.players[j].pid === pid) {
                            if (!exportedLeague.players[j].hasOwnProperty("stats")) {
                                exportedLeague.players[j].stats = [];
                            }

                            exportedLeague.players[j].stats.push(exportedLeague.playerStats[i]);

                            break;
                        }
                    }
                }

                delete exportedLeague.playerStats;
            }
        }).then(function () {
            return exportedLeague;
        })

        // Iterate through all the stores
        exportStore(stores.length - 1, cb);
    }

    return {
        create: create,
        export_: export_,
        remove: remove
    };
});