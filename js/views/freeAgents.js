/**
 * @name views.freeAgents
 * @namespace List of free agents.
 */
define(["db", "globals", "ui", "core/freeAgents", "lib/jquery", "lib/underscore", "util/bbgmView", "util/helpers", "util/viewHelpers"], function (db, g, ui, freeAgents, $, _, bbgmView, helpers, viewHelpers) {
    "use strict";

    var mapping;

    function get(req) {
        if (g.phase >= g.PHASE.AFTER_TRADE_DEADLINE && g.phase <= g.PHASE.RESIGN_PLAYERS) {
            if (g.phase === g.PHASE.RESIGN_PLAYERS) {
                return Davis.location.assign(new Davis.Request("/l/" + g.lid + "/negotiation"));
            }

            return helpers.error("You're not allowed to sign free agents now.", req.raw.cb);
        }
    }

    function InitViewModel() {
        this.players = [];
    }

    mapping = {
        players: {
            create: function (options) {
                return options.data;
            }
        }
    };

    function updateFreeAgents() {
        var deferred, vars;

        deferred = $.Deferred();
        vars = {};

        db.getPayroll(null, g.userTid, function (payroll, contracts) {
            var capSpace;

            capSpace = (g.salaryCap - payroll) / 1000;
            if (capSpace < 0) {
                capSpace = 0;
            }

            g.dbl.transaction("players").objectStore("players").index("tid").getAll(g.PLAYER.FREE_AGENT).onsuccess = function (event) {
                var attributes, data, i, players, ratings, stats;

                attributes = ["pid", "name", "pos", "age", "contract", "freeAgentMood", "injury"];
                ratings = ["ovr", "pot", "skills"];
                stats = ["min", "pts", "trb", "ast", "per"];
                players = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {oldStats: true, showNoStats: true, fuzz: true});

                for (i = 0; i < players.length; i++) {
                    players[i].contract.amount = freeAgents.amountWithMood(players[i].contract.amount, players[i].freeAgentMood[g.userTid]);
                }

                vars = {
                    capSpace: capSpace,
                    players: players
                };

                deferred.resolve(vars);
            };
        });

        return deferred.promise();
    }

    function uiFirst() {
        ui.title("Free Agents");

        $("#help-salary-cap").clickover({
            title: "Cap Space",
            html: true,
            content: "<p>\"Cap space\" is the difference between your current payroll and the salary cap. You can sign a free agent to any valid contract as long as you don't go over the cap.</p>You can only exceed the salary cap to sign free agents to minimum contracts ($" + g.minContract + "k/year)."
        });
    }

    function uiEvery(updateEvents, vm) {
        ui.datatable($("#free-agents"), 4, _.map(vm.players, function (p) {
            var negotiateButton;
            if (freeAgents.refuseToNegotiate(p.contract.amount * 1000, p.freeAgentMood[g.userTid])) {
                negotiateButton = "Refuses!";
            } else {
                negotiateButton = '<form action="/l/' + g.lid + '/negotiation/' + p.pid + '" method="POST" style="margin: 0"><input type="hidden" name="new" value="1"><button type="submit" class="btn btn-mini btn-primary">Negotiate</button></form>';
            }
            return [helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, negotiateButton];
        }));
    }

    return bbgmView.init({
        id: "freeAgents",
        get: get,
        InitViewModel: InitViewModel,
        mapping: mapping,
        runBefore: [updateFreeAgents],
        uiFirst: uiFirst,
        uiEvery: uiEvery
    });
});