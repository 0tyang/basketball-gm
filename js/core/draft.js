define(["core/player", "core/season", "util/random"], function(player, season, random) {
    function generatePlayers() {
        var playerStore = g.dbl.transaction(["players"], IDBTransaction.READ_WRITE).objectStore("players");
        var profiles = ["Point", "Wing", "Big", "Big", ""];
        for (var i=0; i<70; i++) {
            var baseRating = random.randInt(0, 19);
            var pot = parseInt(random.gauss(45, 20), 10);
            if (pot < baseRating) {
                pot = baseRating;
            }
            if (pot > 90) {
                pot = 90;
            }

            var profile = profiles[random.randInt(0, profiles.length - 1)];
            var agingYears = random.randInt(0, 3);
            var draftYear = g.season;

            var gp = new player.Player();
            gp.generate(c.PLAYER_UNDRAFTED, 19, profile, baseRating, pot, draftYear);
            gp.develop(agingYears);

            gp.save(playerStore);
        }
    }

    /*Sets draft order based on winning percentage (no lottery).*/
    function setOrder(cb) {
        var teamStore = g.dbl.transaction(["teams"], IDBTransaction.READ_WRITE).objectStore("teams");
        teamStore.index("season").getAll(g.season).onsuccess = function (event) {
            var teamsAll = event.target.result;
            teamsAll.sort(function (a, b) {  return a.won/(a.won+a.lost) - b.won/(b.won+b.lost); }); // Sort by winning percentage, ascending
            var draftOrder = [];

            for (round=1; round<=2; round++) {
                for (i=0; i<teamsAll.length; i++) {
                    draftOrder.push({round: round, pick: i + 1, tid: teamsAll[i].tid, abbrev: teamsAll[i].abbrev});
                }
            }

            localStorage.setItem("league" + g.lid + "DraftOrder", JSON.stringify(draftOrder));

            cb();
        };
    }

    /*Simulate draft picks until it's the user's turn or the draft is over.

    Returns:
        A list of player IDs who were drafted.
    */
    function untilUserOrEnd(cb) {
        var pids = [];

        var playerStore = g.dbl.transaction(["players"], IDBTransaction.READ_WRITE).objectStore("players");
        playerStore.index("tid").getAll(c.PLAYER_UNDRAFTED).onsuccess = function(event) {
            var playersAll = event.target.result;
            playersAll.sort(function (a, b) {  return (b.ratings[0].ovr+2*b.ratings[0].pot) - (a.ratings[0].ovr+2*a.ratings[0].pot); });

            var draftOrder = JSON.parse(localStorage.getItem("league" + g.lid + "DraftOrder"));
            while (draftOrder.length > 0) {
                var pick = draftOrder.shift();
                if (pick.tid == g.userTid) {
                    draftOrder.unshift(pick);
                    break;
                }

                var selection = Math.abs(Math.floor(random.gauss(0, 3)));  // 0=best prospect, 1=next best prospect, etc.
                var pid = playersAll[selection].pid;
                selectPlayer(pick, pid, playerStore);

                pids.push(pid);
                playersAll.splice(selection, 1);  // Delete from the list of undrafted players
            }

            localStorage.setItem("league" + g.lid + "DraftOrder", JSON.stringify(draftOrder));

            // Is draft over?;
            if (draftOrder.length == 0) {
                season.newPhase(c.PHASE_AFTER_DRAFT);
            }

            cb(pids);
        };
    }

    /* Callback is used when this is called to select a player for the user's team.*/
    function selectPlayer(pick, pid, playerStore, cb) {
        cb = typeof cb !== "undefined" ? cb : function (pid) {};
/*
        // Validate that tid should be picking now
        r = g.dbex('SELECT tid, round, pick FROM draftResults WHERE season = :season AND pid = 0 ORDER BY round, pick ASC LIMIT 1', season=g.season);
        tidNext, round, pick = r.fetchone();

        if (tidNext != pick.tid) {
            app.logger.debug('WARNING: Team %d tried to draft out of order' % (tid,));
            return;
*/

        playerStore.openCursor(IDBKeyRange.only(pid)).onsuccess = function(event) {
            var cursor = event.target.result;
            player = cursor.value;

            // Draft player
            player.tid = pick.tid;
            player.draftYear = g.season;
            player.draftRound = pick.round;
            player.draftPick = pick.pick;
            player.draftTid = pick.tid;

            // Contract
            rookieSalaries = [5000, 4500, 4000, 3500, 3000, 2750, 2500, 2250, 2000, 1900, 1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];
            i = pick.pick - 1 + 30 * (pick.round - 1);
            player.contractAmount = rookieSalaries[i];
            years = 4 - pick.round;  // 2 years for 2nd round, 3 years for 1st round;
            player.contractExp = g.season + years;

            cursor.update(player);

            cb(pid);
        };
    }

    return {
        generatePlayers: generatePlayers,
        setOrder: setOrder,
        untilUserOrEnd: untilUserOrEnd,
        selectPlayer: selectPlayer
    }
});
