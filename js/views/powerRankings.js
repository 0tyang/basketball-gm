/**
 * @name views.powerRankings
 * @namespace Power Rankings based on player ratings, stats, team performance
 */
define(["globals", "ui", "core/team", "core/player", "lib/jquery", "lib/underscore", "lib/knockout", "lib/knockout.mapping", "views/components", "util/bbgmView", "util/helpers", "util/viewHelpers"], function (g, ui, team, player, $, _, ko, komapping, components, bbgmView, helpers, viewHelpers) {
    "use strict";

    var mapping;

    function get(req) {
        return {
            season: helpers.validateSeason(req.params.season)
        };
    }

    function InitViewModel() {
        console.log("power rankings");
        this.season = ko.observable();
        this.teams = ko.observable([]);
    }

    mapping = {
        confs: {
            create: function (options) {
                return new function () {
                    komapping.fromJS(options.data, {
                        divs: {
                            key: function (data) {
                                return ko.utils.unwrapObservable(data.name);
                            }
                        },
                        teams: {
                            key: function (data) {
                                return ko.utils.unwrapObservable(data.tid);
                            }
                        }
                    }, this);
                }();
            },
            key: function (data) {
                return ko.utils.unwrapObservable(data.name);
            }
        }
    };

    function updatePowerRankings(inputs, updateEvents, vm) {
        var deferred, vars, tx;

        console.log("Updating power rankings");

        if (updateEvents.indexOf("dbChange") >= 0 || updateEvents.indexOf("gameSim") >= 0 || inputs.season !== vm.season()) {
            deferred = $.Deferred();

            console.log("deferred");

            vars = {
                season: inputs.season
            };

            tx = g.dbl.transaction(["players", "teams", "releasedPlayers"]);

            team.filter({
                attrs: ["tid", "cid", "did", "abbrev", "region", "name"],
                seasonAttrs: ["won", "lost", "winp", "wonHome", "lostHome", "wonAway", "lostAway", "wonDiv", "lostDiv", "wonConf", "lostConf", "lastTen", "streak"],
                stats: ["gp", "fg", "fga", "fgp", "tp", "tpa", "tpp", "ft", "fta", "ftp", "orb", "drb", "trb", "ast", "tov", "stl", "blk", "pf", "pts", "oppPts", "diff"],
                season: g.season,
                ot: tx
            }, function (teams) {
                // var confs, confRanks, confTeams, divTeams, i, j, k, l;
                var sortedTeams, teamRatings, weightedRatings, weightedStats, weightedRecord, i, j;

                teamRatings = {};

                console.log("teams");
                console.log(teams);

                tx.objectStore("players").index("tid").getAll(IDBKeyRange.lowerBound(0)).onsuccess = function (event) {
                    var i, j, players;

                    players = event.target.result;
                    console.log("Found "+players.length+" players");

                    for (i = 0; i < players.length; i++) {
                        var player = players[i];
                        var weightedRating = 0;
                        var rating = player.ratings[player.ratings.length-1].ovr;

                        if (player.rosterOrder < 5)
                            weightedRating = 0.12*rating;
                        else if (player.rosterOrder < 7)
                            weightedRating = 0.10*rating;

                        teamRatings[player.tid] = (teamRatings[player.tid] ? teamRatings[player.tid] + weightedRating : weightedRating);
                    }

                    sortedTeams = _.sortBy(teams, function(team){
                        team.weightedRating = teamRatings[team.tid];
                        return -teamRatings[team.tid];
                    });

                    console.log("sorted teams");
                    console.log(sortedTeams);

                    deferred.resolve({
                        season: inputs.season,
                        teams: sortedTeams
                    });
                }
            });

            return deferred.promise();
        }
    }

    function uiFirst(vm) {
        ko.computed(function () {
            ui.title("Power Rankings - " + vm.season());
        }).extend({throttle: 1});

        ui.tableClickableRows($(".rankings-division"));
    }

    return bbgmView.init({
        id: "powerRankings",
        get: get,
        InitViewModel: InitViewModel,
        mapping: mapping,
        runBefore: [updatePowerRankings],
        uiFirst: uiFirst
    });
});