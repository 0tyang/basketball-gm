/**
 * @name views.tradingBlock
 * @namespace Trading block.
 */
define(["globals", "ui", "core/player", "lib/jquery", "lib/knockout", "lib/underscore", "util/bbgmView", "util/helpers"], function (g, ui, player, $, ko, _, bbgmView, helpers) {
    "use strict";

    var mapping;

    function getOffers(userPids, userDpids) {
        var offers;

        offers = [{
            tid: 1,
            pids: [5, 2, 17],
            dpids: [7, 12]
        }, {
            tid: 17,
            pids: [50, 22, 11],
            dpids: [42, 1]
        }];

        return offers;
    }

    function get(req) {
        return {
            userPids: req.raw.userPids !== undefined ? req.raw.userPids : [],
            userDpids: req.raw.userDpids !== undefined ? req.raw.userDpids : [],
            offers: req.raw.offers !== undefined ? req.raw.offers : []
        };
    }

    function post(req) {
        var buttonEl, offers, userDpids, userPids;

        buttonEl = document.getElementById("ask-button");
        buttonEl.textContent = "Waiting for answer...";
        buttonEl.disabled = true;

        userPids = _.map(req.params.pids, function (x) { return parseInt(x, 10); });
        userDpids = _.map(req.params.dpids, function (x) { return parseInt(x, 10); });

        offers = getOffers(userPids, userDpids);

        ui.realtimeUpdate(["tradingBlockAsk"], helpers.leagueUrl(["trading_block"]), function () {
            buttonEl.textContent = "Ask For Trade Proposals";
            buttonEl.disabled = false;
        }, {
            userPids: userPids,
            userDpids: userDpids,
            offers: offers
        });
    }

    mapping = {
        userPicks: {
            create: function (options) {
                return options.data;
            }
        },
        userRoster: {
            create: function (options) {
                return options.data;
            }
        }
    };

    function updateUserRoster(inputs, updateEvents, vm) {
        var deferred;

        if (updateEvents.indexOf("firstRun") >= 0 || updateEvents.indexOf("playerMovement") >= 0) {
            deferred = $.Deferred();

            g.dbl.transaction("players").objectStore("players").index("tid").getAll(g.userTid).onsuccess = function (event) {
                var attrs, i, ratings, stats, userRoster;

                attrs = ["pid", "name", "pos", "age", "contract", "injury"];
                ratings = ["ovr", "pot", "skills"];
                stats = ["min", "pts", "trb", "ast", "per"];

                userRoster = player.filter(event.target.result, {
                    attrs: attrs,
                    ratings: ratings,
                    stats: stats,
                    season: g.season,
                    tid: g.userTid,
                    showNoStats: true,
                    showRookies: true,
                    fuzz: true
                });
                for (i = 0; i < userRoster.length; i++) {
                    if (inputs.userPids.indexOf(userRoster[i].pid) >= 0) {
                        userRoster[i].selected = true;
                    } else {
                        userRoster[i].selected = false;
                    }
                }

                g.dbl.transaction("draftPicks").objectStore("draftPicks").index("tid").getAll(g.userTid).onsuccess = function (event) {
                    var i, userPicks;

                    userPicks = event.target.result;
                    for (i = 0; i < userPicks.length; i++) {
                        userPicks[i].desc = helpers.pickDesc(userPicks[i]);
                    }

                    deferred.resolve({
                        userDpids: inputs.userDpids,
                        userPicks: userPicks,
                        userRoster: userRoster
                    });
                };
            };

            return deferred.promise();
        }
    }

    function updateOffers(inputs, updateEvents, vm) {
        var deferred, i, offer, offers;

        if (updateEvents.indexOf("firstRun") >= 0 || updateEvents.indexOf("tradingBlockAsk") >= 0) {
            deferred = $.Deferred();

            offers = [];

            if (inputs.offers.length === 0) {
                deferred.resolve({
                    offers: offers
                });
            } else {
                for (i = 0; i < inputs.offers.length; i++) {
                    offer = {
                        region: g.teamRegionsCache[inputs.offers[i].tid],
                        name: g.teamNamesCache[inputs.offers[i].tid]
                    };
                    offers.push(offer);
                }
console.log(inputs.offers);
console.log(offers);
            }

            return deferred.promise();
        }
    }

    function uiFirst(vm) {
        var tradeable;

        ui.title("Trading Block");

        tradeable = function (roster) {
            var playersAndPicks;

            playersAndPicks = _.map(roster, function (p) {
                var selected;

                if (p.selected) {
                    selected = ' checked = "checked"';
                }
                return ['<input name="pids[]" type="checkbox" value="' + p.pid + '"' + selected + '>', helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1)];
            });

            return playersAndPicks;
        };

        ko.computed(function () {
            ui.datatableSinglePage($("#roster-user"), 5, tradeable(vm.userRoster()),
                                   {aoColumnDefs: [{bSortable: false, aTargets: [0]}]});
        }).extend({throttle: 1});
    }

    return bbgmView.init({
        id: "tradingBlock",
        get: get,
        post: post,
        mapping: mapping,
        runBefore: [updateUserRoster, updateOffers],
        uiFirst: uiFirst
    });
});