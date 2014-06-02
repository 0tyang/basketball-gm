/**
 * @name core.league
 * @namespace Creating and removing leagues.
 */
define(["db", "globals", "ui", "core/draft", "core/finances", "core/player", "core/season", "core/team", "lib/underscore", "util/helpers", "util/random"], function (db, g, ui, draft, finances, player, season, team, _, helpers, random) {
    "use strict";

    /**
     * Create a new league.
     * 
     * @memberOf core.league
     * @param {string} name The name of the league.
     * @param {number} tid The team ID for the team the user wants to manage (or -1 for random).
     * @param {Array.<Object>?} players Either an array of pre-generated player objects to use in the new league or undefined. If undefined, then random players will be generated.
     */
    function create(name, tid, players, teams, startingSeason, randomizeRosters, cb) {
        var i, l, leagueStore, prop, teamsDefault;

        // Default teams
        teamsDefault = helpers.getTeamsDefault();

        // Any custom teams?
        if (teams !== undefined) {
            for (i = 0; i < teams.length; i++) {
                // Fill in default values as needed
                for (prop in teamsDefault[i]) {
                    if (teamsDefault[i].hasOwnProperty(prop) && !teams[i].hasOwnProperty(prop)) {
                        teams[i][prop] = teamsDefault[i][prop];
                    }
                }
            }
            // Add in popRanks
            teams = helpers.addPopRank(teams);
        } else {
            teams = teamsDefault;
        }

        // Handle random team
        if (tid === -1) {
            tid = random.randInt(0, teams.length - 1);
        }

        // Record in meta db
        l = {name: name, tid: tid, phaseText: "", teamName: teams[tid].name, teamRegion: teams[tid].region};
        leagueStore = g.dbm.transaction("leagues", "readwrite").objectStore("leagues");
        leagueStore.add(l).onsuccess = function (event) {
            g.lid = event.target.result;

            // Create new league database
            db.connectLeague(g.lid, function () {
                var gameAttributes;

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

                // Clear old game attributes from g, to make sure the new ones are saved to the db in db.setGameAttributes
                helpers.resetG();

                db.setGameAttributes(gameAttributes, function () {
                    var draftPickStore, i, t, round, scoutingRank, teamStore, tx;

                    // Probably is fastest to use this transaction for everything done to create a new league
                    tx = g.dbl.transaction(["draftPicks", "draftOrder", "players", "teams", "trade"], "readwrite");

                    // Generate draft picks for the first 4 years, as those are the ones can be traded initially
                    draftPickStore = tx.objectStore("draftPicks");
                    for (i = 0; i < 4; i++) {
                        for (t = 0; t < g.numTeams; t++) {
                            for (round = 1; round <= 2; round++) {
                                draftPickStore.add({
                                    tid: t,
                                    originalTid: t,
                                    round: round,
                                    season: g.startingSeason + i
                                });
                            }
                        }
                    }

                    // Initialize draft order object store for later use
                    tx.objectStore("draftOrder").add({
                        rid: 1,
                        draftOrder: []
                    });

                    // teams already contains tid, cid, did, region, name, and abbrev. Let's add in the other keys we need for the league.
                    teamStore = tx.objectStore("teams");
                    for (i = 0; i < g.numTeams; i++) {
                        t = team.generate(teams[i]);
                        teamStore.add(t);

                        // Save scoutingRank for later
                        if (i === g.userTid) {
                            scoutingRank = finances.getRankLastThree(t, "expenses", "scouting");
                        }
                    }

                    tx.objectStore("trade").add({
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
                    });

                    player.genBaseMoods(tx, function (baseMoods) {
                        var afterPlayerCreation, age, agingYears, baseRatings, cbAfterEachPlayer, contract, draftYear, goodNeutralBad, i, j, n, numLeft, p, pg, playerStore, pots, profile, profiles, randomizeExpiration, simpleDefaults, t, t2, playerTids;

                        afterPlayerCreation = function () {
                            var createUndrafted1, createUndrafted2, createUndrafted3, i;
                            // Use a new transaction so there is no race condition with generating draft prospects and regular players (PIDs can seemingly collide otherwise, if it's an imported roster)
                            tx = g.dbl.transaction("players", "readwrite");

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
                            if (createUndrafted1) {
                                draft.genPlayers(tx, g.PLAYER.UNDRAFTED, scoutingRank, createUndrafted1);
                            }
                            if (createUndrafted2) {
                                draft.genPlayers(tx, g.PLAYER.UNDRAFTED_2, scoutingRank, createUndrafted2);
                            }
                            if (createUndrafted3) {
                                draft.genPlayers(tx, g.PLAYER.UNDRAFTED_3, scoutingRank, createUndrafted3);
                            }

                            tx.oncomplete = function () {
                                // Make schedule, start season
                                season.newPhase(g.PHASE.REGULAR_SEASON, function () {
                                    var lid;

                                    ui.updateStatus("Idle");

                                    lid = g.lid;  // Otherwise, g.lid can be overwritten before the URL redirects, and then we no longer know the league ID

                                    // Auto sort player's roster (other teams will be done in season.newPhase(g.PHASE.REGULAR_SEASON))
                                    team.rosterAutoSort(null, g.userTid, function () { cb(lid); });

                                    helpers.bbgmPing("league");
                                });
                            };
                        };

                        cbAfterEachPlayer = function () {
                            numLeft -= 1;
                            if (numLeft === 0) {
                                afterPlayerCreation();
                            }
                        };

                        if (players !== undefined) {
                            // Use pre-generated players, filling in attributes as needed
                            playerStore = g.dbl.transaction("players", "readwrite").objectStore("players");  // Transaction used above is closed by now

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

                            numLeft = players.length;
                            for (i = 0; i < players.length; i++) {
                                p = players[i];

                                if (!p.hasOwnProperty("born")) {
                                    age = random.randInt(19, 35);
                                } else {
                                    age = g.startingSeason - p.born.year;
                                }

                                // This is used to get at default values for various attributes
                                pg = player.generate(p.tid, age, "", 0, 0, g.startingSeason - age, true, scoutingRank);

                                // Optional things
                                simpleDefaults = ["awards", "born", "college", "contract", "draft", "face", "freeAgentMood", "hgt", "imgURL", "injury", "pos", "ptModifier", "retiredYear", "rosterOrder", "weight", "yearsFreeAgent"];
                                for (j = 0; j < simpleDefaults.length; j++) {
                                    if (!p.hasOwnProperty(simpleDefaults[j])) {
                                        p[simpleDefaults[j]] = pg[simpleDefaults[j]];
                                    }
                                }
                                if (!p.hasOwnProperty("salaries")) {
                                    p.salaries = [];
                                    if (p.contract.exp < g.startingSeason) {
                                        p.contract.exp = g.startingSeason;
                                    }
                                    if (p.tid >= 0) {
                                        p = player.setContract(p, p.contract, true);
                                    }
                                }
                                if (!p.hasOwnProperty("statsTids")) {
                                    p.statsTids = [];
                                }
                                if (!p.ratings[0].hasOwnProperty("fuzz")) {
                                    p.ratings[0].fuzz = pg.ratings[0].fuzz;
                                }
                                if (!p.ratings[0].hasOwnProperty("skills")) {
                                    p.ratings[0].skills = player.skills(p.ratings[0]);
                                }
                                if (!p.ratings[0].hasOwnProperty("ovr")) {
                                    p.ratings[0].ovr = player.ovr(p.ratings[0]);
                                }
                                if (p.ratings[0].pot < p.ratings[0].ovr) {
                                    p.ratings[0].pot = p.ratings[0].ovr;
                                }

                                // Fix always-missing info
                                if (p.tid === g.PLAYER.UNDRAFTED_2) {
                                    p.ratings[0].season = g.startingSeason + 1;
                                } else if (p.tid === g.PLAYER.UNDRAFTED_3) {
                                    p.ratings[0].season = g.startingSeason + 2;
                                } else {
                                    p.ratings[0].season = g.startingSeason;
                                }
                                if (!p.hasOwnProperty("stats")) {
                                    p.stats = [];
                                    if (p.tid >= 0) {
                                        p = player.addStatsRow(p, false);
                                    }
                                }

                                if (p.tid === g.PLAYER.FREE_AGENT) {
                                    player.addToFreeAgents(playerStore, p, null, baseMoods, cbAfterEachPlayer);
                                } else {
                                    playerStore.put(p);
                                    cbAfterEachPlayer();
                                }
                            }
                        } else {
                            // Generate new players
                            playerStore = tx.objectStore("players");
                            profiles = ["Point", "Wing", "Big", ""];
                            baseRatings = [37, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 26, 26, 26];
                            pots = [75, 65, 55, 55, 60, 50, 70, 40, 55, 50, 60, 60, 45, 45];

                            numLeft = 33 * 14;
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
                                        p = player.bonus(p, goodNeutralBad * random.randInt(0, 20), true);
                                    } else {
                                        p = player.bonus(p, 0, true);
                                    }
                                    if (t2 === g.PLAYER.FREE_AGENT) {  // Free agents
                                        p = player.bonus(p, -15, false);
                                    }

                                    if (t2 === g.PLAYER.FREE_AGENT) {
                                        player.addToFreeAgents(playerStore, p, null, baseMoods, cbAfterEachPlayer);
                                    } else {
                                        playerStore.put(p);
                                        cbAfterEachPlayer();
                                    }
                                }

                                // Initialize rebuilding/contending, when possible
                                if (t2 >= 0 && goodNeutralBad === 1) {
                                    teamStore.openCursor(t2).onsuccess = function (event) {
                                        var cursor, t;

                                        cursor = event.target.result;
                                        t = cursor.value;
                                        t.strategy = "contending";
                                        cursor.update(t);
                                    };
                                } else if (t2 >= 0 && goodNeutralBad === -1) {
                                    teamStore.openCursor(t2).onsuccess = function (event) {
                                        var cursor, t;

                                        cursor = event.target.result;
                                        t = cursor.value;
                                        t.strategy = "rebuilding";
                                        cursor.update(t);
                                    };
                                }
                            }
                        }
                    });
                });
            });
        };
    }

    /**
     * Delete an existing league.
     * 
     * @memberOf core.league
     * @param {number} lid League ID.
     * @param {function()=} cb Optional callback.
     */
    function remove(lid, cb) {
        var request;

        if (g.dbl !== undefined) {
            g.dbl.close();
        }

        g.dbm.transaction("leagues", "readwrite").objectStore("leagues").delete(lid);
        request = indexedDB.deleteDatabase("league" + lid);
        request.onsuccess = function (event) {
            console.log("Database league" + lid + " successfully deleted");
            cb();
        };
        request.onfailure = function (event) {
            console.log("Error: ", event);
            cb();
        };
        request.onblocked = function (event) {
            console.log("Blocked: ", event);
            cb();
        };
    }


    /**
     * Export existing active league.
     * 
     * @memberOf core.league
     * @param {string[]} stores Array of names of objectStores to include in export
     * @param {function(Object)} cb Callback whose first argument contains all the exported league data.
     */
    function export_(stores, cb) {
        g.dbm.transaction("leagues").objectStore("leagues").get(g.lid).onsuccess = function (event) {
            var exportedLeague,  exportStore;

            exportedLeague = {};

            // Row from leagueStore
            exportedLeague.meta = event.target.result;
console.log(exportedLeague.meta);

            exportStore = function (i, cb) {
                console.log("Exporting " + stores[i] + "...");
                g.dbl.transaction(stores[i]).objectStore(stores[i]).getAll().onsuccess = function (event) {
                    exportedLeague[stores[i]] = event.target.result;

                    if (i > 0) {
                        exportStore(i - 1, cb);
                    } else {
                        cb(exportedLeague);
                    }
                };
            };

            // Iterate through all the stores
            exportStore(stores.length - 1, cb);
        };
    }

    return {
        create: create,
        export_: export_,
        remove: remove
    };
});