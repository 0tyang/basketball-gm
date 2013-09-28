/**
 * @name views.negotiationList
 * @namespace List of resigning negotiations in progress.
 */
define(["globals", "ui", "core/freeAgents", "core/player", "lib/jquery", "lib/knockout", "lib/underscore", "util/bbgmView", "util/helpers", "util/viewHelpers"], function (g, ui, freeAgents, player, $, ko, _, bbgmView, helpers, viewHelpers) {
    "use strict";

    var mapping;

    function get(req) {
        if (g.phase !== g.PHASE.RESIGN_PLAYERS) {
            return {
                redirectUrl: helpers.leagueUrl(["negotiation", -1])
            };
        }
    }

    mapping = {
        players: {
            create: function (options) {
                return options.data;
            }
        }
    };

    function updateNegotiationList() {
        var deferred;

        deferred = $.Deferred();

        g.dbl.transaction("negotiations").objectStore("negotiations").getAll().onsuccess = function (event) {
            var negotiations;

            negotiations = event.target.result;

            // Get all free agents, filter array based on negotiations data, pass to player.filter, augment with contract data from negotiations
            g.dbl.transaction("players").objectStore("players").index("tid").getAll(g.PLAYER.FREE_AGENT).onsuccess = function (event) {
                var i, j, players, playersAll, playersSome;

                playersAll = event.target.result;
                playersSome = [];
                for (i = 0; i < playersAll.length; i++) {
                    for (j = 0; j < negotiations.length; j++) {
                        if (playersAll[i].pid === negotiations[j].pid) {
                            playersSome.push(playersAll[i]);
                            break;
                        }
                    }
                }

                players = player.filter(playersSome, {
                    attrs: ["pid", "name", "pos", "age", "freeAgentMood", "injury"],
                    ratings: ["ovr", "pot", "skills"],
                    stats: ["min", "pts", "trb", "ast", "per"],
                    season: g.season,
                    tid: g.userTid,
                    showNoStats: true,
                    fuzz: true
                });

                for (i = 0; i < players.length; i++) {
                    for (j = 0; j < negotiations.length; j++) {
                        if (players[i].pid === negotiations[j].pid) {
                            players[i].contract = {};
                            players[i].contract.amount = negotiations[j].player.amount / 1000;
                            players[i].contract.exp = g.season + negotiations[j].player.years;
                            break;
                        }
                    }
                }

                deferred.resolve({
                    players: players
                });
            };
        };

        return deferred.promise();
    }

    function uiFirst(vm) {
        ui.title("Resign Players");

        ko.computed(function () {
            ui.datatable($("#negotiation-list"), 4, _.map(vm.players(), function (p) {
                var negotiateButton;
                if (freeAgents.refuseToNegotiate(p.contract.amount * 1000, p.freeAgentMood[g.userTid])) {
                    negotiateButton = "Refuses!";
                } else {
                    // This can be a plain link because the negotiation has already been started at this point.
                    negotiateButton = '<a href="' + helpers.leagueUrl(["negotiation", p.pid]) + '" class="btn btn-xs btn-primary">Negotiate</a>';
                }
                return [helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, negotiateButton];
            }));
        }).extend({throttle: 1});
    }

    return bbgmView.init({
        id: "negotiationList",
        get: get,
        mapping: mapping,
        runBefore: [updateNegotiationList],
        uiFirst: uiFirst
    });
});