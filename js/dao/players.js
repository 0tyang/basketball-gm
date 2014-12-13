// This needs to be used for anything that reads player stats!!!
// Can also be used other places, but not essential
define(["db", "lib/bluebird"], function (db, Promise) {
    "use strict";

    function count(options) {
        options = options !== undefined ? options : {};
        options.ot = options.ot !== undefined ? options.ot : null;

        return new Promise(function (resolve, reject) {
            db.getObjectStore(options.ot, "players", "players").count().onsuccess = function (event) {
                resolve(event.target.result);
            };
        });
    }

    // This is intended just for getting the data from the database. Anything more sophisticated is in core.player.filter
    // filter: Arbitrary JS function to run on output with array.filter
    // statsSeasons: if "all", return all (needed for career totals, listing all years stats, etc). if undefined/null, return none (same as empty array input). otherwise, it's an array of seasons to return (usually just one year, but can be two for oldStats)
    // statsPlayoffs: if undefined/null, default is false. if true, include both regular season and playffs, otherwise just regular season. This is because player.filter doesn't like being given only playoff stats, for some reason.
    // statsTid: if undefined/null, return any team stats. otherwise, filter
    // 
    // Relevant SO links:
    // http://stackoverflow.com/questions/16501459/javascript-searching-indexeddb-using-multiple-indexes
    // http://stackoverflow.com/a/15625231/786644
    // can say "fix the first N elements of the index and let the other values be anything" http://stackoverflow.com/questions/26203075/querying-an-indexeddb-compound-index-with-a-shorter-array
    // http://stackoverflow.com/a/23808891/786644
    // http://stackoverflow.com/questions/12084177/in-indexeddb-is-there-a-way-to-make-a-sorted-compound-query
    function getAll(options, cb) {
        options = options !== undefined ? options : {};
        options.ot = options.ot !== undefined ? options.ot : null;
        options.index = options.index !== undefined ? options.index : null;
        options.key = options.key !== undefined ? options.key : null;
        options.statsPlayoffs = options.statsPlayoffs !== undefined ? options.statsPlayoffs : false;
        options.statsTid = options.statsTid !== undefined ? options.statsTid : null;
        options.filter = options.filter !== undefined ? options.filter : null;

        // By default, return no stats
        if (options.statsSeasons === undefined || options.statsSeasons === null) {
            options.statsSeasons = [];
        }

        return new Promise(function (resolve, reject) {
            var playerStore, tx;

// HACK
if (cb !== undefined) {
    resolve = cb;
}

            playerStore = db.getObjectStore(options.ot, ["players", "playerStats"], "players"); // Doesn't really need playerStats all the time
            tx = playerStore.transaction;

            if (options.index !== null) {
                playerStore = playerStore.index(options.index);
            }

            playerStore.getAll(options.key).onsuccess = function (event) {
                var done, i, pid, players;

                players = event.target.result;

                if (options.filter !== null) {
                    players = players.filter(options.filter);
                }

                done = 0;

                // Hacky way: always get all seasons for pid, then filter in JS
                if ((options.statsSeasons === "all" || options.statsSeasons.length > 0) && players.length > 0) {
                    for (i = 0; i < players.length; i++) {
                        pid = players[i].pid;

                        (function (i) {
                            var key;

                            if (options.statsSeasons === "all") {
                                // All seasons
                                key = IDBKeyRange.bound([pid], [pid, '']);
                            } else if (options.statsSeasons.length === 1) {
                                // Restrict to one season
                                key = IDBKeyRange.bound([pid, options.statsSeasons[0]], [pid, options.statsSeasons[0], '']);
                            } else if (options.statsSeasons.length > 1) {
                                // Restrict to range between seasons
                                key = IDBKeyRange.bound([pid, Math.min.apply(null, options.statsSeasons)], [pid, Math.max.apply(null, options.statsSeasons), '']);
                            }

                            tx.objectStore("playerStats").index("pid, season, tid").getAll(key).onsuccess = function (event) {
                                var playerStats;

                                playerStats = event.target.result;

                                // Due to indexes not necessarily handling all cases, still need to filter
                                players[i].stats = playerStats.filter(function (ps) {
                                    // statsSeasons is defined, but this season isn't in it
                                    if (options.statsSeasons !== "all" && options.statsSeasons.indexOf(ps.season) < 0) {
                                        return false;
                                    }

                                    // If options.statsPlayoffs is false, don't include playoffs. Otherwise, include both
                                    if (!options.statsPlayoffs && options.statsPlayoffs !== ps.playoffs) {
                                        return false;
                                    }

                                    if (options.statsTid !== null && options.statsTid !== ps.tid) {
                                        return false;
                                    }

                                    return true;
                                }).sort(function (a, b) {
                                    // Sort seasons in ascending order. This is necessary because the index will be ordering them by tid within a season, which is probably not what is ever wanted.
                                    return a.psid - b.psid;
                                });

                                done += 1;

                                if (done === players.length) {
    // do I need to sort?
                                    resolve(players);
                                }
                            };
                        }(i));
                    }
                } else {
                    // No stats needed! Yay!
                    resolve(players);
                }
            };
        });
    }

    function get(options) {
        return getAll(options).get(0);
    }

    // This should ultimately delete stats before writing
    // options.onsuccess defines a callback function to be run on put.onsuccess. This does NOT mean the data is actually written to the database, just that it will be (no key errors or whatever). This should probably only be used to get the player ID from event.target.result when inserting/upserting a player.
    function put(options, cb) {
        var playerStore;

        options = options !== undefined ? options : {};
        options.ot = options.ot !== undefined ? options.ot : null;

        if (!options.hasOwnProperty("p")) {
            throw new Error("Must supply player object p");
        }
        if (options.p.hasOwnProperty("stats")) {
            throw new Error("stats property on player object");
        }

        playerStore = db.getObjectStore(options.ot, "players", "players");

        if (options.hasOwnProperty("onsuccess")) {
            playerStore.put(options.p).onsuccess = options.onsuccess;
        } else {
            playerStore.put(options.p);
        }

        if (cb !== undefined) {
            cb();
        }
    }

    return {
        count: count,
        getAll: getAll,
        get: get,
        put: put
    };
});