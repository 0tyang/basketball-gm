'use strict';

var g = require('../globals');
var ui = require('../ui');
var player = require('../core/player');
var Promise = require('bluebird');
var $ = require('jquery');
var ko = require('knockout');
var _ = require('underscore');
var bbgmView = require('../util/bbgmView');
var helpers = require('../util/helpers');
var components = require('./components');

var mapping;

function get(req) {
    var inputs, out;

    inputs = {};

    inputs.show = req.params.show !== undefined ? req.params.show : "10";
    out = helpers.validateAbbrev(req.params.abbrev);
    inputs.tid = out[0];
    inputs.abbrev = out[1];

    return inputs;
}

mapping = {
    history: {
        create: function (options) {
            return options.data;
        }
    },
    players: {
        create: function (options) {
            return options.data;
        }
    }
};

function updateTeamHistory(inputs, updateEvents, vm) {
    if (updateEvents.indexOf("dbChange") >= 0 || updateEvents.indexOf("firstRun") >= 0 || updateEvents.indexOf("gameSim") >= 0 || inputs.abbrev !== vm.abbrev()) {
        return Promise.all([
            g.dbl.teamSeasons.index('tid').getAll(inputs.tid),
            g.dbl.players.index('statsTids').getAll(inputs.tid).then(function (players) {
                return player.withStats(null, players, {
                    statsSeasons: "all",
                    statsTid: inputs.tid
                });
            })
        ]).spread(function (teamSeasons, players) {
            var championships, history, i, j, playoffAppearances, totalLost, totalWon;

            history = [];
            totalWon = 0;
            totalLost = 0;
            playoffAppearances = 0;
            championships = 0;
            for (i = 0; i < teamSeasons.length; i++) {
                history.push({
                    season: teamSeasons[i].season,
                    won: teamSeasons[i].won,
                    lost: teamSeasons[i].lost,
                    playoffRoundsWon: teamSeasons[i].playoffRoundsWon
                });
                totalWon += teamSeasons[i].won;
                totalLost += teamSeasons[i].lost;
                if (teamSeasons[i].playoffRoundsWon >= 0) {
                    playoffAppearances += 1;
                }
                if (teamSeasons[i].playoffRoundsWon === 4) {
                    championships += 1;
                }
            }
            history.reverse(); // Show most recent season first

            players = player.filter(players, {
                attrs: ["pid", "name", "injury", "tid", "hof", "watch"],
                ratings: ["pos"],
                stats: ["season", "abbrev", "gp", "min", "pts", "trb", "ast", "per", "ewa"],
                tid: inputs.tid
            });

            for (i = 0; i < players.length; i++) {
                players[i].stats.reverse();

                for (j = 0; j < players[i].stats.length; j++) {
                    if (players[i].stats[j].abbrev === g.teamAbbrevsCache[inputs.tid]) {
                        players[i].lastYr = players[i].stats[j].season + ' ';
                        break;
                    }
                }

                players[i].pos = players[i].ratings[players[i].ratings.length - 1].pos;

                delete players[i].ratings;
                delete players[i].stats;
            }

            return {
                abbrev: inputs.abbrev,
                history: history,
                players: players,
                team: {
                    name: g.teamNamesCache[inputs.tid],
                    region: g.teamRegionsCache[inputs.tid],
                    tid: inputs.tid
                },
                totalWon: totalWon,
                totalLost: totalLost,
                playoffAppearances: playoffAppearances,
                championships: championships
            };
        });
    }
}

function uiFirst(vm) {
    ui.title("Team History");

    ko.computed(function () {
        ui.datatable($("#team-history-players"), 2, _.map(vm.players(), function (p) {
            return [helpers.playerNameLabels(p.pid, p.name, p.injury, [], p.watch), p.pos, String(p.careerStats.gp), helpers.round(p.careerStats.min, 1), helpers.round(p.careerStats.pts, 1), helpers.round(p.careerStats.trb, 1), helpers.round(p.careerStats.ast, 1), helpers.round(p.careerStats.per, 1), helpers.round(p.careerStats.ewa, 1), p.lastYr, p.hof, p.tid > g.PLAYER.RETIRED && p.tid !== vm.team.tid(), p.tid === vm.team.tid()];
        }), {
            rowCallback: function (row, data) {
                // Highlight active players
                if (data[data.length - 1]) {
                    row.classList.add("success"); // On this team
                } else if (data[data.length - 2]) {
                    row.classList.add("info"); // On other team
                } else if (data[data.length - 3]) {
                    row.classList.add("danger"); // Hall of Fame
                }
            }
        });
    }).extend({throttle: 1});

    ui.tableClickableRows($("#team-history-players"));
}

function uiEvery(updateEvents, vm) {
    components.dropdown("team-history-dropdown", ["teams"], [vm.abbrev()], updateEvents);
}

module.exports = bbgmView.init({
    id: "teamHistory",
    get: get,
    mapping: mapping,
    runBefore: [updateTeamHistory],
    uiFirst: uiFirst,
    uiEvery: uiEvery
});
