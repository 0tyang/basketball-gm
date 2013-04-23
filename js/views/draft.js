/**
 * @name views.playoffs
 * @namespace Show current or archived playoffs, or projected matchups for an in-progress season.
 */
define(["api", "db", "globals", "ui", "core/draft", "lib/davis", "lib/jquery", "util/bbgmView", "util/helpers", "util/viewHelpers", "views/components"], function (api, db, g, ui, draft, Davis, $, bbgmView, helpers, viewHelpers, components) {
    "use strict";

    function updateDraftTables(pids) {
        var draftedPlayer, draftedRows, i, j, undraftedTds;

        for (i = 0; i < pids.length; i++) {
            draftedPlayer = new Array(5);
            // Find row in undrafted players table, get metadata, delete row
            undraftedTds = $("#undrafted-" + pids[i] + " td");
            for (j = 0; j < 5; j++) {
                draftedPlayer[j] = undraftedTds[j].innerHTML;
            }

            // Find correct row (first blank row) in drafted players table, write metadata
            draftedRows = $("#drafted tbody tr");
            for (j = 0; j < draftedRows.length; j++) {
                if (draftedRows[j].children[3].innerHTML.length === 0) {
                    $("#undrafted-" + pids[i]).remove();
                    draftedRows[j].children[2].innerHTML = draftedPlayer[0];
                    draftedRows[j].children[3].innerHTML = draftedPlayer[1];
                    draftedRows[j].children[4].innerHTML = draftedPlayer[2];
                    draftedRows[j].children[5].innerHTML = draftedPlayer[3];
                    draftedRows[j].children[6].innerHTML = draftedPlayer[4];
                    break;
                }
            }
        }
    }

    function draftUntilUserOrEnd() {
        api.draftUntilUserOrEnd(function (pids, done) {
            updateDraftTables(pids);
            if (!done) {
                $("#undrafted button").removeAttr("disabled");
            }
        });
    }

    function get(req) {
        if (g.phase !== g.PHASE.DRAFT) {
            return {
                redirectUrl: "/l/" + g.lid + "/draft_summary"
            };
        }
    }

    function updateDraft(inputs, updateEvents, vm) {
        var deferred, playerStore, vars;

        deferred = $.Deferred();
        vars = {};

        playerStore = g.dbl.transaction("players").objectStore("players");
        playerStore.index("tid").getAll(g.PLAYER.UNDRAFTED).onsuccess = function (event) {
            var attributes, ratings, stats, undrafted;

            attributes = ["pid", "name", "pos", "age", "injury"];
            ratings = ["ovr", "pot", "skills"];
            stats = [];
            undrafted = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});
            undrafted.sort(function (a, b) { return (b.ratings.ovr + 2 * b.ratings.pot) - (a.ratings.ovr + 2 * a.ratings.pot); });

            playerStore.index("draft.year").getAll(g.season).onsuccess = function (event) {
                var attributes, drafted, i, players, ratings, stats, started;

                attributes = ["pid", "tid", "name", "pos", "age", "draft", "injury"];
                ratings = ["ovr", "pot", "skills"];
                stats = [];
                players = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});

                drafted = [];
                for (i = 0; i < players.length; i++) {
                    if (players[i].tid !== g.PLAYER.UNDRAFTED) {
                        drafted.push(players[i]);
                    }
                }
                drafted.sort(function (a, b) { return (100 * a.draft.round + a.draft.pick) - (100 * b.draft.round + b.draft.pick); });

                started = drafted.length > 0;

                draft.getOrder(function (draftOrder) {
                    var data, i, slot;

                    for (i = 0; i < draftOrder.length; i++) {
                        slot = draftOrder[i];
                        drafted.push({
                            draft: {
                                abbrev: slot.abbrev,
                                round: slot.round,
                                pick: slot.pick
                            },
                            pid: -1
                        });
                    }

                    vars = {undrafted: undrafted, drafted: drafted, started: started};
                    deferred.resolve(vars);
                });
            };
        };

        return deferred.promise();
    }

    function uiFirst() {
        ui.title("Draft");

        $("#start-draft").click(function (event) {
            $($("#start-draft").parent()).hide();
            draftUntilUserOrEnd();
        });

        $("#undrafted button").click(function (event) {
            $("#undrafted button").attr("disabled", "disabled");
            api.draftUser(this.getAttribute("data-player-id"), function (pid) {
                updateDraftTables([pid]);
                draftUntilUserOrEnd();
            });
        });
    }

    function uiEvery(updateEvents, vm) {
    }

    return bbgmView.init({
        id: "draft",
        get: get,
        runBefore: [updateDraft],
        uiFirst: uiFirst,
        uiEvery: uiEvery
    });
});