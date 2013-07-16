/**
 * @name core.freeAgents
 * @namespace Functions related to free agents that didn't make sense to put anywhere else.
 */
define(["db", "globals", "core/player", "core/team", "lib/underscore", "util/helpers", "util/random"], function (db, g, player, team, _, helpers, random) {
    "use strict";

    /**
     * AI teams sign free agents.
     * 
     * Each team (in random order) will sign free agents up to their salary cap or roster size limit. This should eventually be made smarter
     *
     * @memberOf core.freeAgents
     * @param {function()} cb Callback.
     */
    function autoSign(cb) {
        team.filter({
            attrs: ["strategy"],
            season: g.season
        }, function (teams) {
            var strategies, transaction;

            strategies = _.pluck(teams, "strategy");

            transaction = g.dbl.transaction(["players", "releasedPlayers"], "readwrite");

            transaction.objectStore("players").index("tid").getAll(g.PLAYER.FREE_AGENT).onsuccess = function (event) {
                var i, numPlayersOnRoster, players, signTeam, tids;

                // List of free agents, sorted by value
                players = event.target.result;
                players.sort(function (a, b) {  return player.value(b) - player.value(a); });

                if (players.length === 0) {
                    cb();
                    return;
                }

                // Randomly order teams
                tids = [];
                for (i = 0; i < g.numTeams; i++) {
                    tids.push(i);
                }
                random.shuffle(tids);

                signTeam = function (ti) {
                    var tid;

                    tid = tids[ti];

                    // Run callback when all teams have had a turn to sign players. This extra iteration of signTeam is required in case the user's team is the last one.
                    if (ti === tids.length) {
                        cb();
                        return;
                    }

                    // Skip the user's team
                    if (tid === g.userTid) {
                        signTeam(ti + 1);
                        return;
                    }

                    // Skip rebuilding teams sometimes
                    if (strategies[tid] === "rebuilding" && Math.random() < 0.7) {
                        signTeam(ti + 1);
                        return;
                    }

                    transaction.objectStore("players").index("tid").count(tid).onsuccess = function (event) {
                        var numPlayersOnRoster;

                        numPlayersOnRoster = event.target.result;

                        db.getPayroll(transaction, tid, function (payroll) {
                            var i, foundPlayer, p;

                            if (numPlayersOnRoster < 15) {
                                for (i = 0; i < players.length; i++) {
                                    if (players[0].contract.amount + payroll <= g.salaryCap || players[0].contract.amount === g.minContract) {
                                        p = players.shift();
                                        p.tid = tid;
                                        p = player.addStatsRow(p);
                                        p = player.setContract(p, p.contract, true);
                                        transaction.objectStore("players").put(p);
                                        team.rosterAutoSort(transaction, tid, function () {
                                            if (ti <= tids.length) {
                                                signTeam(ti + 1);
                                            }
                                        });
                                        numPlayersOnRoster += 1;
                                        payroll += p.contract.amount;
                                        foundPlayer = true;
                                        break;  // Only add one free agent
                                    }
                                }
                            }

                            if (!foundPlayer) {
                                if (ti <= tids.length) {
                                    signTeam(ti + 1);
                                }
                            }
                        });
                    };
                };

                signTeam(0);
            };
        });
    }

    /**
     * Decrease contract demands for all free agents.
     *
     * This is called after each day in the regular season, as free agents become more willing to take smaller contracts.
     * 
     * @memberOf core.freeAgents
     * @param {function()} cb Callback.
     */
    function decreaseDemands(cb) {
        var tx;

        tx = g.dbl.transaction("players", "readwrite");
        tx.objectStore("players").index("tid").openCursor(g.PLAYER.FREE_AGENT).onsuccess = function (event) {
            var cursor, i, p;

            cursor = event.target.result;
            if (cursor) {
                p = cursor.value;

                // Decrease free agent demands
                p.contract.amount -= 50;
                if (p.contract.amount < 500) {
                    p.contract.amount = 500;
                }
                // Since this is called after the season has already started, ask for a short contract
                if (p.contract.amount < 1000) {
                    p.contract.exp = g.season;
                } else {
                    p.contract.exp = g.season + 1;
                }

                // Free agents' resistance to signing decays after every regular season game
                for (i = 0; i < p.freeAgentMood.length; i++) {
                    p.freeAgentMood[i] -= 0.035;
                    if (p.freeAgentMood[i] < 0) {
                        p.freeAgentMood[i] = 0;
                    }
                }

                // Also, heal.
                if (p.injury.gamesRemaining > 0) {
                    p.injury.gamesRemaining -= 1;
                } else {
                    p.injury = {type: "Healthy", gamesRemaining: 0};
                }

                cursor.update(p);
                cursor.continue();
            }
        };
        tx.oncomplete = cb;
    }

    /**
     * Get contract amount adjusted for mood.
     *
     * @memberOf core.freeAgents
     * @param {number} amount Contract amount, in thousands of dollars or millions of dollars (fun auto-detect!).
     * @param {number} mood Player mood towards a team, from 0 (happy) to 1 (angry).
     * @return {number} Contract amoung adjusted for mood.
     */
    function amountWithMood(amount, mood) {
        amount *= 1 + 0.2 * mood;

        if (amount >= g.minContract) {
            if (amount > g.maxContract) {
                amount = g.maxContract;
            }
            return helpers.round(amount / 10) * 10;  // Round to nearest 10k, assuming units are thousands
        }

        if (amount > g.maxContract / 1000) {
            amount = g.maxContract / 1000;
        }
        return helpers.round(amount * 100) / 100;  // Round to nearest 10k, assuming units are millions
    }

    /**
     * Will a player negotiate with a team, or not?
     * 
     * @param {number} amount Player's desired contract amount, already adjusted for mood as in amountWithMood, in thousands of dollars
     * @param {number} mood Player's mood towards the team in question.
     * @return {boolean} Answer to the question.
     */
    function refuseToNegotiate(amount, mood) {
        if (amount * mood > 12000) {
            return true;
        }
        return false;
    }

    return {
        autoSign: autoSign,
        decreaseDemands: decreaseDemands,
        amountWithMood: amountWithMood,
        refuseToNegotiate: refuseToNegotiate
    };
});