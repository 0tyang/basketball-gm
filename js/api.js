/*These are functions that do not return full pages (either JS objects or partial blocks of HTML) and are called from the client.*/

define(["db", "core/draft", "core/game", "core/season", "util/helpers", "util/lock", "util/playMenu"], function (db, draft, game, season, helpers, lock, playMenu) {
    "use strict";

    /*This is kind of a hodgepodge that handles every request from the play
    button and returns the appropriate response in JSON.
    */
    function play(amount) {
        var numDays;

        if (['day', 'week', 'month', 'through_playoffs'].indexOf(amount) >= 0) {
            // Start playing games
            if (amount === "day") {
                numDays = 1;
            } else if (amount === "week") {
                numDays = 7;
            } else if (amount === "month") {
                numDays = 30;
            } else if (amount === "through_playoffs") {
                numDays = 100;  // There aren't 100 days in the playoffs, so 100 will cover all the games and the sim stops when the playoffs end
            }

            game.play(numDays, true);
        } else if (amount === "until_playoffs") {
            if (g.phase < c.PHASE_PLAYOFFS) {
                season.getSchedule(0, function (schedule) {
                    numDays = Math.floor(2 * schedule.length / (g.numTeams));
                    game.play(numDays, true);
                });
            }
        } else if (amount === "stop") {
            helpers.setGameAttributes({stopGames: true});
//            g.dbex('UPDATE schedule SET in_progress_timestamp = 0')

            // This is needed because we can't be sure if (bbgm.core.game.play will be called again
            playMenu.setStatus('Idle');
            lock.set_games_in_progress(false);
            playMenu.refreshOptions();
        } else if (amount === "until_draft") {
            if (g.phase === c.PHASE_BEFORE_DRAFT) {
                season.newPhase(c.PHASE_DRAFT);
                draft.generatePlayers();
                draft.setOrder(function () {
                    Davis.location.assign(new Davis.Request("/l/" + g.lid + "/draft"));
                });
            }
        } else if (amount === "until_resign_players") {
            if (g.phase === c.PHASE_AFTER_DRAFT) {
                season.newPhase(c.PHASE_RESIGN_PLAYERS);
//            url = url_for('negotiation_list', lid=g.lid)
            }
        } else if (amount === "until_free_agency") {
            if (g.phase === c.PHASE_RESIGN_PLAYERS) {
                season.newPhase(c.PHASE_FREE_AGENCY);
                playMenu.setStatus("Idle");
//            url = url_for('free_agents', lid=g.lid)
            }
        } else if (amount === "until_preseason") {
            if (g.phase === c.PHASE_FREE_AGENCY) {
                season.newPhase(c.PHASE_PRESEASON);
            }
        } else if (amount === "until_regular_season") {
            if (g.phase === c.PHASE_PRESEASON) {
                season.newPhase(c.PHASE_REGULAR_SEASON);
            }
        }

/*        if (error) {
            alert(error);
        }*/

//        return {url: url};
    }

    function rosterRelease(pid, cb) {
        var error, numPlayersOnRoster, tid;

        error = null;

/*        r = g.dbex('SELECT COUNT(*) FROM player_attributes WHERE tid = :tid', tid=g.user_tid)
        num_players_on_roster, = r.fetchone()
        if num_players_on_roster <= 5:
            error = 'You must keep at least 5 players on your roster.'
        else:
            pid = int(request.form['pid'])
            r = g.dbex('SELECT tid FROM player_attributes WHERE pid = :pid', pid=pid)
            tid, = r.fetchone()
            if tid == g.user_tid:  # Don't let the user update CPU-controlled rosters
                p = player.Player()
                p.load(pid)
                p.release()
            else:
                error = 'You aren\'t allowed to do this.'

        return jsonify(error=error)*/

//        error = 'fuck';
        cb(error);
    }

    function gameLogList(abbrev, season, firstTime, cb) {
        var games, tid;

        [tid, abbrev] = helpers.validateAbbrev(abbrev);
        season = helpers.validateSeason(season);

        games = [];
        g.dbl.transaction(["games"]).objectStore("games").index("season").openCursor(IDBKeyRange.only(season)).onsuccess = function (event) {
            var content, cursor, game, home, opp, oppPts, pts, template, tidMatch, won;

            cursor = event.target.result;
            if (cursor) {
                game = cursor.value;

                // Check tid
                tidMatch = false;
                if (game.teams[0].tid === tid) {
                    tidMatch = true;
                    home = true;
                    pts = game.teams[0].pts;
                    oppPts = game.teams[1].pts;
                    opp = helpers.validateTid(game.teams[1].tid);
                } else if (game.teams[1].tid === tid) {
                    tidMatch = true;
                    home = false;
                    pts = game.teams[1].pts;
                    oppPts = game.teams[0].pts;
                    opp = helpers.validateTid(game.teams[0].tid);
                }

                if (tidMatch) {
                    if (pts > oppPts) {
                        won = true;
                    } else {
                        won = false;
                    }
                    games.push({gid: game.gid, home: home, oppAbbrev: opp[1], won: won, pts: pts, oppPts: oppPts});
                }

                cursor.continue();
            } else {
                template = Handlebars.templates.gameLogList;
                content = template({games: games});
                cb(content);
            }
        };
    }

    function draftUntilUserOrEnd(cb2) {
        playMenu.setStatus('Draft in progress...');
        var pids = draft.untilUserOrEnd(function (pids) {
            var done = false;
            if (g.phase === c.PHASE_AFTER_DRAFT) {
                done = true;
                playMenu.setStatus('Idle');
            }
            cb2(pids, done);
        });
    }

    function draftUser(pid, cb) {
        var draftOrder, pick, playerStore;

        pid = parseInt(pid, 10);

        draftOrder = JSON.parse(localStorage.getItem("league" + g.lid + "DraftOrder"));
        pick = draftOrder.shift();
        if (pick.tid === g.userTid) {
            playerStore = g.dbl.transaction(["players"], IDBTransaction.READ_WRITE).objectStore("players");
            draft.selectPlayer(pick, pid, playerStore, cb);
            localStorage.setItem("league" + g.lid + "DraftOrder", JSON.stringify(draftOrder));
        } else {
            console.log("ERROR: User trying to draft out of turn.");
        }
    }

    function boxScore(gid, cb) {
        gid = parseInt(gid, 10);

        g.dbl.transaction(["games"]).objectStore("games").get(gid).onsuccess = function (event) {
            var content, game, template;

            game = event.target.result;

            template = Handlebars.templates.boxScore;
            content = template({g: g, game: game});
            cb(content);
        };
    }

    return {
        play: play,
        rosterRelease: rosterRelease,
        draftUntilUserOrEnd: draftUntilUserOrEnd,
        draftUser: draftUser,
        gameLogList: gameLogList,
        boxScore: boxScore
    };
});