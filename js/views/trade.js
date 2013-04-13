/**
 * @name views.trade
 * @namespace Trade.
 */
define(["api", "db", "globals", "ui", "core/trade", "lib/davis", "lib/handlebars.runtime", "lib/jquery", "lib/knockout", "lib/underscore", "util/helpers", "util/viewHelpers"], function (api, db, g, ui, trade, Davis, Handlebars, $, ko, _, helpers, viewHelpers) {
    "use strict";

    var vm;

    function display(updateEvents, cb) {
        var leagueContentEl;

        leagueContentEl = document.getElementById("league_content");
        if (leagueContentEl.dataset.id !== "trade") {
            ui.update({
                container: "league_content",
                template: "trade"
            });
            ko.applyBindings(vm, leagueContentEl);
        }
        ui.title("Trade");

        cb();
    }

    function loadBefore(season, cb) {
        //
    }

    function showTrade(userPids, otherPids, message, cb) {
        message = message !== undefined ? message : null;

/*        if (req.method === "post") {
            // Refresh, but pass the latest message if there is one
            return Davis.location.assign(new Davis.Request("/l/" + g.lid + "/trade", {message: message}));
        }*/

        trade.getOtherTid(function (otherTid) {
            var playerStore;

            playerStore = g.dbl.transaction("players").objectStore("players");

            playerStore.index("tid").getAll(g.userTid).onsuccess = function (event) {
                var attributes, i, ratings, stats, userRoster;

                attributes = ["pid", "name", "pos", "age", "contract", "injury"];
                ratings = ["ovr", "pot", "skills"];
                stats = ["min", "pts", "trb", "ast", "per"];
                userRoster = db.getPlayers(event.target.result, g.season, g.userTid, attributes, stats, ratings, {showNoStats: true, fuzz: true});
                for (i = 0; i < userRoster.length; i++) {
                    if (userPids.indexOf(userRoster[i].pid) >= 0) {
                        userRoster[i].selected = true;
                    } else {
                        userRoster[i].selected = false;
                    }
                }

                playerStore.index("tid").getAll(otherTid).onsuccess = function (event) {
                    var i, otherRoster;

                    otherRoster = db.getPlayers(event.target.result, g.season, otherTid, attributes, stats, ratings, {showNoStats: true, fuzz: true});
                    for (i = 0; i < otherRoster.length; i++) {
                        if (otherPids.indexOf(otherRoster[i].pid) >= 0) {
                            otherRoster[i].selected = true;
                        } else {
                            otherRoster[i].selected = false;
                        }
                    }

                    trade.summary(otherTid, userPids, otherPids, function (summary) {
                        var data, teams, tradeSummary;

                        teams = helpers.getTeams(otherTid);
                        teams.splice(g.userTid, 1);  // Can't trade with yourself

                        tradeSummary = Handlebars.templates.tradeSummary({lid: g.lid, summary: summary, message: message});

                        data = {
                            container: "league_content",
                            template: "trade",
                            title: "Trade",
                            vars: {userPids: userPids, otherPids: otherPids, teams: teams, otherTid: otherTid, tradeSummary: tradeSummary, userTeamName: summary.teams[0].name}
                        };
                        ui.update(data, function () {
                            var i, rosterCheckboxesOther, rosterCheckboxesUser;

                            // Don't use the dropdown function because this needs to be a POST
                            $('#trade-select-team').change(function (event) {
                                Davis.location.replace(new Davis.Request({
                                    abbrev: $("#trade-select-team").val(),
                                    fullPath: "/l/" + g.lid + "/trade",
                                    method: "post"
                                }));
                            });

                            ui.datatableSinglePage($("#roster-user"), 5, _.map(userRoster, function (p) {
                                var selected;

                                if (p.selected) {
                                    selected = ' checked = "checked"';
                                }
                                return ['<input name="user-pids" type="checkbox" value="' + p.pid + '"' + selected + '>', helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1)];
                            }));

                            ui.datatableSinglePage($("#roster-other"), 5, _.map(otherRoster, function (p) {
                                var selected;

                                if (p.selected) {
                                    selected = ' checked = "checked"';
                                }
                                return ['<input name="other-pids" type="checkbox" value="' + p.pid + '"' + selected + '>', helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1)];
                            }));

                            rosterCheckboxesUser = $("#roster-user input");
                            rosterCheckboxesOther = $("#roster-other input");

                            $('#rosters input[type="checkbox"]').click(function (event) {
                                var otherPids, serialized, userPids;

                                serialized = $("#rosters").serializeArray();
                                userPids = _.map(_.pluck(_.filter(serialized, function (o) { return o.name === "user-pids"; }), "value"), Math.floor);
                                otherPids = _.map(_.pluck(_.filter(serialized, function (o) { return o.name === "other-pids"; }), "value"), Math.floor);

                                $("#propose-trade button").attr("disabled", "disabled"); // Will be reenabled, if appropriate, when the summary is loaded
                                api.tradeUpdate(userPids, otherPids, function (summary, userPids, otherPids) {
                                    var found, i, j;

                                    $("#trade-summary").html(summary);
                                    for (i = 0; i < rosterCheckboxesUser.length; i++) {
                                        found = false;
                                        for (j = 0; j < userPids.length; j++) {
                                            if (Math.floor(rosterCheckboxesUser[i].value) === userPids[j]) {
                                                rosterCheckboxesUser[i].checked = true;
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found) {
                                            rosterCheckboxesUser[i].checked = false;
                                        }
                                    }
                                    for (i = 0; i < rosterCheckboxesOther.length; i++) {
                                        found = false;
                                        for (j = 0; j < otherPids.length; j++) {
                                            if (Math.floor(rosterCheckboxesOther[i].value) === otherPids[j]) {
                                                rosterCheckboxesOther[i].checked = true;
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found) {
                                            rosterCheckboxesOther[i].checked = false;
                                        }
                                    }
                                });
                            });

                            $("#propose-trade button").click(function (event) {
                                $("#propose-trade button").attr("disabled", "disabled");
                            });

                            cb();
                        });
                    });
                };
            };
        });
    }

    // Validate that the stored player IDs correspond with the active team ID
    function validateSavedPids(cb) {
        trade.getPlayers(function (userPids, otherPids) {
            trade.updatePlayers(userPids, otherPids, function (userPids, otherPids) {
                cb(userPids, otherPids);
            });
        });
    }

    function update(season, updateEvents, cb) {
        var leagueContentEl;

        leagueContentEl = document.getElementById("league_content");
        if (leagueContentEl.dataset.id !== "teamStats") {
            ko.cleanNode(leagueContentEl);
            vm = {
                season: ko.observable()
            };
            vm.teamShotLocationsUrl = ko.computed(function () {
                return "/l/" + g.lid + "/team_shot_locations/" + vm.season();
            });
            vm.distTeamStatsUrl = ko.computed(function () {
                return "/l/" + g.lid + "/dist_team_stats/" + vm.season();
            });
        }

        if ((season === g.season && (updateEvents.indexOf("gameSim") >= 0 || updateEvents.indexOf("playerMovement") >= 0)) || season !== vm.season()) {
            loadBefore(season, function () {
                display(updateEvents, cb);
            });
        } else {
            display(updateEvents, cb);
        }
    }

    function get(req) {
        viewHelpers.beforeLeague(req, function (updateEvents, cb) {
            var message;

            if (g.phase >= g.PHASE.AFTER_TRADE_DEADLINE && g.phase <= g.PHASE.PLAYOFFS) {
                return helpers.error("You're not allowed to make trades now.", req);
            }

            validateSavedPids(function (userPids, otherPids) {
                showTrade(userPids, otherPids, req.raw.message, cb);
            });

//            update(updateEvents, cb);
        });
    }

    function post(req) {
        viewHelpers.beforeLeague(req, function (updateEvents, cb) {
            var newOtherTid, out, pid;

            pid = req.params.pid !== undefined ? parseInt(req.params.pid, 10) : null;
            if (req.raw.abbrev !== undefined) {
                out = helpers.validateAbbrev(req.raw.abbrev);
                newOtherTid = out[0];
            } else {
                newOtherTid = null;
            }

            if (req.params.clear !== undefined) {
                // Clear trade
                trade.clear(function () {
                    return Davis.location.assign(new Davis.Request("/l/" + g.lid + "/trade"));
//                showTrade([], []);
                });
            } else if (req.params.propose !== undefined) {
                // Propose trade
                trade.propose(function (accepted, message) {
                    return Davis.location.assign(new Davis.Request("/l/" + g.lid + "/trade", {message: message}));
//                trade.getPlayers(function (userPids, otherPids) {
//                    showTrade(userPids, otherPids, message);
//                });
                });
            } else if (newOtherTid !== null || pid !== null) {
                // Start new trade with team or for player
                trade.create(newOtherTid, pid, function () {
                    return Davis.location.assign(new Davis.Request("/l/" + g.lid + "/trade"));
//                validateSavedPids(function (userPids, otherPids) {
//                    showTrade(userPids, otherPids);
//                });
                });
            }
        });
    }

    return {
        update: update,
        get: get,
        post: post
    };
});