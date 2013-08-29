/**
 * @name views.newTeam
 * @namespace Pick a new team after being fired.
 */
define(["db", "globals", "ui", "core/team", "lib/jquery", "util/bbgmView", "util/helpers"], function (db, g, ui, team, $, bbgmView, helpers) {
    "use strict";

    function get(req) {
        if (!g.gameOver) {
            return {
                errorMessage: "You may only switch to another team after you're fired."
            };
        }
    }

    function post(req) {
        $("#new-team").attr("disabled", "disabled");

        ui.updateStatus("Idle");
        ui.updatePlayMenu();

        db.setGameAttributes({
            gameOver: false,
            userTid: Math.floor(req.params.tid),
            ownerMood: {
                wins: 0,
                playoffs: 0,
                money: 0
            }
        }, function () {
            ui.realtimeUpdate([], helpers.leagueUrl([]));
        });
    }

    function updateTeamSelect() {
        var deferred;
        deferred = $.Deferred();

        team.filter({
            attrs: ["tid", "abbrev", "region", "name", "cid"],
            seasonAttrs: ["winp", "playoffRoundsWon"],
            season: g.season - 1
        }, function (teams) {
            var bottomTeams, i;
            teams.sort(function (a, b) { return a.winp - b.winp; });

            for (i = 0; i < teams.length; i++) {
                teams[i].tid = i;
            }

            bottomTeams = teams.slice(0, 5);
            deferred.resolve({
                teams: bottomTeams
            });
        });

        return deferred.promise();
    }

    function uiFirst() {
        ui.title("New Team");
    }

    return bbgmView.init({
        id: "newTeam",
        get: get,
        post: post,
        runBefore: [updateTeamSelect],
        uiFirst: uiFirst
    });
});