/**
 * @name views.roster
 * @namespace Current or historical rosters for every team. Current roster for user's team is editable.
 */
define(["api", "db", "globals", "ui", "core/team", "lib/knockout", "lib/jquery", "views/components", "util/bbgmView", "util/helpers", "util/viewHelpers"], function (api, db, g, ui, team, ko, $, components, bbgmView, helpers, viewHelpers) {
    "use strict";

    var mapping;

    function highlightHandles() {
        var i;

        i = 1;
        $("#roster tbody").children().each(function () {
            var tr;

            tr = $(this);
            if (i <= 5) {
                tr.find("td:first").removeClass("btn-info").addClass("btn-primary");
            } else {
                tr.find("td:first").removeClass("btn-primary").addClass("btn-info");
            }
            if (i === 5) {
                tr.addClass("separator");
            } else {
                tr.removeClass("separator");
            }
            i++;
        });
    }

    function editableChanged(editable, vm) {
        var rosterTbody;

        rosterTbody = $("#roster tbody");

        if (!rosterTbody.is(":ui-sortable")) {
            // The first time editableChanged is called, set up sorting, but disable it by default
            $("#roster tbody").sortable({
                helper: function (e, ui) {
                    // Return helper which preserves the width of table cells being reordered
                    ui.children().each(function () {
                        $(this).width($(this).width());
                    });
                    return ui;
                },
                cursor: "move",
                update: function (e, ui) {
                    var i, sortedPids;

                    sortedPids = $(this).sortable("toArray", {attribute: "data-pid"});
                    for (i = 0; i < sortedPids.length; i++) {
                        sortedPids[i] = parseInt(sortedPids[i], 10);
                    }

                    api.rosterReorder(sortedPids, function () {
                        highlightHandles();
                    });
                },
                disabled: true
            });

            // Release and Buy Out buttons, which will only appear if the roster is editable
            $("#roster button").click(function (event) {
                var i, pid, players, tr;

                pid = parseInt(this.parentNode.parentNode.dataset.pid, 10);
                players = vm.players();
                for (i = 0; i < players.length; i++) {
                    if (players[i].pid() === pid) {
                        break;
                    }
                }

                if (this.dataset.action === "release") {
                    if (window.confirm("Are you sure you want to release " + players[i].name() + "?  He will become a free agent and no longer take up a roster spot on your team, but you will still have to pay his salary (and have it count against the salary cap) until his contract expires in " + players[i].contract.exp() + ".")) {
                        tr = this.parentNode.parentNode;
                        api.rosterRelease(pid, function (error) {
                            if (error) {
                                alert("Error: " + error);
                            } else {
                                ui.realtimeUpdate(["playerMovement"]);
                            }
                        });
                    }
                } else if (this.dataset.action === "buyOut") {
                    if (vm.team.cash() > players[i].cashOwed()) {
                        if (window.confirm("Are you sure you want to buy out " + players[i].name() + "? You will have to pay him the " + helpers.formatCurrency(players[i].cashOwed(), "M") + " remaining on his contract from your current cash reserves of " + helpers.formatCurrency(vm.team.cash(), "M") + ". He will then become a free agent and his contract will no longer count towards your salary cap.")) {
                            tr = this.parentNode.parentNode;
                            api.rosterBuyOut(pid, function (error) {
                                if (error) {
                                    alert("Error: " + error);
                                } else {
                                    ui.realtimeUpdate(["playerMovement"]);
                                }
                            });
                        }
                    } else {
                        alert("Error: You only have " + helpers.formatCurrency(vm.team.cash(), "M") + " in cash, but it would take $" + this.dataset.cashOwed + "M to buy out " + this.dataset.playerName + ".");
                    }
                }
            });

            $("#roster-auto-sort").click(function (event) {
                vm.players([]); // This is a hack to force a UI update because the jQuery UI sortable roster reordering does not update the view model, which can cause the view model to think the roster is sorted correctly when it really isn't. (Example: load the roster, auto sort, reload, drag reorder it, auto sort -> the auto sort doesn't update the UI.) Fixing this issue would fix flickering.
                team.rosterAutoSort(null, g.userTid, function () {
                    db.setGameAttributes({lastDbChange: Date.now()}, function () {
                        ui.realtimeUpdate(["playerMovement"]);
                    });
                });
            });
        }

        if (editable) {
            rosterTbody.sortable("enable").disableSelection();
        } else {
            rosterTbody.sortable("disable").enableSelection();
        }
    }

    function get(req) {
        var inputs, out;

        // Fix broken links
        if (req.params.abbrev === "FA") {
            return {
                redirectUrl: "/l/" + g.lid + "/free_agents"
            };
        }

        inputs = {};

        out = helpers.validateAbbrev(req.params.abbrev);
        inputs.tid = out[0];
        inputs.abbrev = out[1];
        inputs.season = helpers.validateSeason(req.params.season);

        return inputs;
    }

    function InitViewModel() {
        this.abbrev = ko.observable();
        this.season = ko.observable();
        this.payroll = ko.observable();
        this.salaryCap = ko.observable();
        this.team = {
            cash: ko.observable(),
            name: ko.observable(),
            region: ko.observable()
        };
        this.players = ko.observable([]);
        this.showTradeFor = ko.observable();
        this.editable = ko.observable();

        this.numRosterSpots = ko.computed(function () {
            return 15 - this.players().length;
        }, this).extend({throttle: 1});
        this.isCurrentSeason = ko.computed(function () {
            return g.season === this.season();
        }, this).extend({throttle: 1});
    }

    mapping = {
        players: {
            key: function (data) {
                return ko.utils.unwrapObservable(data.pid);
            }
        }
    };

    function updateRoster(inputs, updateEvents, vm) {
        var deferred, vars, tx;

        if ((inputs.season === g.season && (updateEvents.indexOf("gameSim") >= 0 || updateEvents.indexOf("playerMovement") >= 0)) || inputs.abbrev !== vm.abbrev() || inputs.season !== vm.season()) {
            deferred = $.Deferred();

            vars = {
                abbrev: inputs.abbrev,
                season: inputs.season,
                editable: inputs.season === g.season && inputs.tid === g.userTid,
                salaryCap: g.salaryCap / 1000,
                showTradeFor: inputs.season === g.season && inputs.tid !== g.userTid
            };

            tx = g.dbl.transaction(["players", "releasedPlayers", "schedule", "teams"]);

            tx.objectStore("teams").get(inputs.tid).onsuccess = function (event) {
                var attributes, editable, i, ratings, stats, team, teamAll;

                teamAll = event.target.result;
                for (i = 0; i < teamAll.seasons.length; i++) {
                    if (teamAll.seasons[i].season === inputs.season) {
                        break;
                    }
                }
                vars.team = {region: teamAll.region, name: teamAll.name, cash: teamAll.seasons[i].cash / 1000};

                attributes = ["pid", "name", "pos", "age", "contract", "cashOwed", "rosterOrder", "injury"];
                ratings = ["ovr", "pot", "skills"];
                stats = ["min", "pts", "trb", "ast", "per"];

                if (inputs.season === g.season) {
                    // Show players currently on the roster
                    tx.objectStore("schedule").getAll().onsuccess = function (event) {
                        var i, numGamesRemaining, schedule;

                        // numGamesRemaining doesn't need to be calculated except for g.userTid, but it is.
                        schedule = event.target.result;
                        numGamesRemaining = 0;
                        for (i = 0; i < schedule.length; i++) {
                            if (inputs.tid === schedule[i].homeTid || inputs.tid === schedule[i].awayTid) {
                                numGamesRemaining += 1;
                            }
                        }

                        tx.objectStore("players").index("tid").getAll(inputs.tid).onsuccess = function (event) {
                            var i, players;

                            players = db.getPlayers(event.target.result, inputs.season, inputs.tid, attributes, stats, ratings, {numGamesRemaining: numGamesRemaining, showRookies: true, sortBy: "rosterOrder", showNoStats: true, fuzz: true});

                            for (i = 0; i < players.length; i++) {
                                if (inputs.tid === g.userTid && players.length > 5) {
                                    players[i].canRelease = true;
                                    if (inputs.tid === g.userTid && players[i].cashOwed <= vars.team.cash) {
                                        players[i].canBuyOut = true;
                                    } else {
                                        players[i].canBuyOut = false;
                                    }
                                } else {
                                    players[i].canBuyOut = false;
                                    players[i].canRelease = false;
                                }
                            }

                            vars.players = players;

                            db.getPayroll(tx, inputs.tid, function (payroll) {
                                vars.payroll = payroll / 1000;
                                deferred.resolve(vars);
                            });
                        };
                    };
                } else {
                    // Show all players with stats for the given team and year
                    tx.objectStore("players").index("statsTids").getAll(inputs.tid).onsuccess = function (event) {
                        var i, players;

                        players = db.getPlayers(event.target.result, inputs.season, inputs.tid, attributes, stats, ratings, {numGamesRemaining: 0, showRookies: true, sortBy: "rosterOrder", fuzz: true});

                        for (i = 0; i < players.length; i++) {
                            players[i].age = players[i].age - (g.season - inputs.season);
                            players[i].canBuyOut = false;
                            players[i].canRelease = false;
                        }

                        vars.players = players;
                        vars.payroll = null;

                        deferred.resolve(vars);
                    };
                }
            };
            return deferred.promise();
        }
    }

    function uiFirst(vm) {
        ko.computed(function () {
            ui.title(vm.team.region() + " " + vm.team.name() + " " + "Roster - " + vm.season());
        }).extend({throttle: 1});
    }

    function uiEvery(updateEvents, vm) {
        if (vm.editable()) {
            highlightHandles();
        }
        editableChanged(vm.editable(), vm);

        components.dropdown("roster-dropdown", ["teams", "seasons"], [vm.abbrev(), vm.season()], updateEvents);
    }

    return bbgmView.init({
        id: "roster",
        get: get,
        InitViewModel: InitViewModel,
        mapping: mapping,
        runBefore: [updateRoster],
        uiFirst: uiFirst,
        uiEvery: uiEvery
    });
});