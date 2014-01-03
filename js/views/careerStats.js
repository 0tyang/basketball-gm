/**
 * @name views.careerStats
 * @namespace Career stats table.
 */
define(["globals", "ui", "core/player", "lib/jquery", "lib/knockout", "lib/underscore", "views/components", "util/bbgmView", "util/helpers", "util/viewHelpers"], function (g, ui, player, $, ko, _, components, bbgmView, helpers, viewHelpers) {
    "use strict";

    var mapping;

    function get(req) {
        return {
            statType: req.params.statType
        };
    }

    function InitViewModel() {
        this.statType = ko.observable();
    }

    mapping = {
        players: {
            create: function (options) {
                return options.data;
            }
        }
    };

    function updatePlayers(inputs, updateEvents, vm) {
        var deferred;

console.log(inputs.statType);
        if (updateEvents.indexOf("firstRun") >= 0 || updateEvents.indexOf("dbChange") >= 0 || updateEvents.indexOf("gameSim") >= 0 || updateEvents.indexOf("playerMovement") >= 0 || inputs.statType !== vm.statType()) {
            deferred = $.Deferred();

            g.dbl.transaction("players").objectStore("players").getAll().onsuccess = function (event) {
                var i, players;

console.log(inputs.statType);
                players = player.filter(event.target.result, {
                    attrs: ["pid", "name", "pos", "age"],
                    stats: ["abbrev", "gp", "gs", "min", "fg", "fga", "fgp", "tp", "tpa", "tpp", "ft", "fta", "ftp", "orb", "drb", "trb", "ast", "tov", "stl", "blk", "pf", "pts", "per", "ewa"],
                    totals: inputs.statType === "totals"
                });

                for (i = 0; i < players.length; i++) {
                    delete players[i].ratings;
                    delete players[i].stats;
                }

                deferred.resolve({
                    players: players,
                    statType: inputs.statType
                });
            };
            return deferred.promise();
        }
    }

    function uiFirst(vm) {
        ui.title("Career Stats");

        ko.computed(function () {
            ui.datatable($("#career-stats"), 2, _.map(vm.players(), function (p) {
                if (vm.statType() !== "totals") {
                    return [helpers.playerNameLabels(p.pid, p.name), p.pos, String(p.careerStats.gp), String(p.careerStats.gs), helpers.round(p.careerStats.min, 1), helpers.round(p.careerStats.fg, 1), helpers.round(p.careerStats.fga, 1), helpers.round(p.careerStats.fgp, 1), helpers.round(p.careerStats.tp, 1), helpers.round(p.careerStats.tpa, 1), helpers.round(p.careerStats.tpp, 1), helpers.round(p.careerStats.ft, 1), helpers.round(p.careerStats.fta, 1), helpers.round(p.careerStats.ftp, 1), helpers.round(p.careerStats.orb, 1), helpers.round(p.careerStats.drb, 1), helpers.round(p.careerStats.trb, 1), helpers.round(p.careerStats.ast, 1), helpers.round(p.careerStats.tov, 1), helpers.round(p.careerStats.stl, 1), helpers.round(p.careerStats.blk, 1), helpers.round(p.careerStats.pf, 1), helpers.round(p.careerStats.pts, 1), helpers.round(p.careerStats.per, 1), helpers.round(p.careerStats.ewa, 1)];
                } else {
                    return [helpers.playerNameLabels(p.pid, p.name), p.pos, String(p.careerStats.gp), String(p.careerStats.gs), helpers.round(p.careerStats.min, 0), String(p.careerStats.fg), String(p.careerStats.fga), helpers.round(p.careerStats.fgp, 1), String(p.careerStats.tp), String(p.careerStats.tpa), helpers.round(p.careerStats.tpp, 1), String(p.careerStats.ft), String(p.careerStats.fta), helpers.round(p.careerStats.ftp, 1), String(p.careerStats.orb), String(p.careerStats.drb), String(p.careerStats.trb), String(p.careerStats.ast), String(p.careerStats.tov), String(p.careerStats.stl), String(p.careerStats.blk), String(p.careerStats.pf), String(p.careerStats.pts), helpers.round(p.careerStats.per, 1), helpers.round(p.careerStats.ewa, 1)];
                }
            }));
        }).extend({throttle: 1});

        ui.tableClickableRows($("#career-stats"));
    }

    function uiEvery(updateEvents, vm) {
        components.dropdown("career-stats-dropdown", ["statTypes"], [vm.statType()], updateEvents);
    }

    return bbgmView.init({
        id: "careerStats",
        get: get,
        InitViewModel: InitViewModel,
        mapping: mapping,
        runBefore: [updatePlayers],
        uiFirst: uiFirst,
        uiEvery: uiEvery
    });
});