const g = require('../globals');
const ui = require('../ui');
const player = require('../core/player');
const backboard = require('backboard');
const Promise = require('bluebird');
const ko = require('knockout');
const komapping = require('knockout.mapping');
const bbgmView = require('../util/bbgmView');
const helpers = require('../util/helpers');
const components = require('./components');


function get(req) {
    return {
        season: helpers.validateSeason(req.params.season)
    };
}

function InitViewModel() {
    this.season = ko.observable();
    this.categories = ko.observable([]);
}

const mapping = {
    categories: {
        create: function (options) {
            return new function () {
                komapping.fromJS(options.data, {
                    data: {
                        key: function (data) {
                            return ko.unwrap(data.pid);
                        }
                    }
                }, this);
            }();
        },
        key: function (data) {
            return ko.unwrap(data.name);
        }
    }
};

function updateLeaders(inputs, updateEvents, vm) {
    // Respond to watchList in case players are listed twice in different categories
    if (updateEvents.indexOf("dbChange") >= 0 || updateEvents.indexOf("watchList") >= 0 || (inputs.season === g.season && updateEvents.indexOf("gameSim") >= 0) || inputs.season !== vm.season()) {
        return Promise.all([
            g.dbl.teamSeasons.index("season, tid").getAll(backboard.bound([inputs.season], [inputs.season, ''])),
            g.dbl.players.getAll().then(function (players) {
                return player.withStats(null, players, {statsSeasons: [inputs.season]});
            })
        ]).spread(function (teamSeasons, players) {
            var categories, factor, gps, i, j, k, leader, pass, playerValue, stats, userAbbrev;

            // Calculate the number of games played for each team, which is used later to test if a player qualifies as a league leader
            gps = teamSeasons.map(function (teamSeason) {
                // Don't count playoff games
                if (teamSeason.gp > g.numGames) {
                    return g.numGames;
                }
                return teamSeason.gp;
            });

            players = player.filter(players, {
                attrs: ["pid", "name", "injury", "watch"],
                ratings: ["skills"],
                stats: ["pts", "trb", "ast", "fgp", "tpp", "ftp", "blk", "stl", "min", "per", "ewa", "gp", "fg", "tp", "ft", "abbrev", "tid"],
                season: inputs.season
            });

            userAbbrev = helpers.getAbbrev(g.userTid);

            // minStats and minValues are the NBA requirements to be a league leader for each stat http://www.nba.com/leader_requirements.html. If any requirement is met, the player can appear in the league leaders
            factor = (g.numGames / 82) * Math.sqrt(g.quarterLength / 12); // To handle changes in number of games and playing time
            categories = [];
            categories.push({name: "Points", stat: "Pts", title: "Points Per Game", data: [], minStats: ["gp", "pts"], minValue: [70, 1400]});
            categories.push({name: "Rebounds", stat: "Reb", title: "Rebounds Per Game", data: [], minStats: ["gp", "trb"], minValue: [70, 800]});
            categories.push({name: "Assists", stat: "Ast", title: "Assists Per Game", data: [], minStats: ["gp", "ast"], minValue: [70, 400]});
            categories.push({name: "Field Goal Percentage", stat: "FG%", title: "Field Goal Percentage", data: [], minStats: ["fg"], minValue: [300]});
            categories.push({name: "Three-Pointer Percentage", stat: "3PT%", title: "Three-Pointer Percentage", data: [], minStats: ["tp"], minValue: [55]});
            categories.push({name: "Free Throw Percentage", stat: "FT%", title: "Free Throw Percentage", data: [], minStats: ["ft"], minValue: [125]});
            categories.push({name: "Blocks", stat: "Blk", title: "Blocks Per Game", data: [], minStats: ["gp", "blk"], minValue: [70, 100]});
            categories.push({name: "Steals", stat: "Stl", title: "Steals Per Game", data: [], minStats: ["gp", "stl"], minValue: [70, 125]});
            categories.push({name: "Minutes", stat: "Min", title: "Minutes Per Game", data: [], minStats: ["gp", "min"], minValue: [70, 2000]});
            categories.push({name: "Player Efficiency Rating", stat: "PER", title: "Player Efficiency Rating", data: [], minStats: ["min"], minValue: [2000]});
            categories.push({name: "Estimated Wins Added", stat: "EWA", title: "Estimated Wins Added", data: [], minStats: ["min"], minValue: [2000]});
            stats = ["pts", "trb", "ast", "fgp", "tpp", "ftp", "blk", "stl", "min", "per", "ewa"];

            for (i = 0; i < categories.length; i++) {
                players.sort(function (a, b) { return b.stats[stats[i]] - a.stats[stats[i]]; });
                for (j = 0; j < players.length; j++) {
                    // Test if the player meets the minimum statistical requirements for this category
                    pass = false;
                    for (k = 0; k < categories[i].minStats.length; k++) {
                        // Everything except gp is a per-game average, so we need to scale them by games played
                        if (categories[i].minStats[k] === "gp") {
                            playerValue = players[j].stats[categories[i].minStats[k]];
                        } else {
                            playerValue = players[j].stats[categories[i].minStats[k]] * players[j].stats.gp;
                        }

                        // Compare against value normalized for team games played
                        if (playerValue >= Math.ceil(categories[i].minValue[k] * factor * gps[players[j].stats.tid] / g.numGames)) {
                            pass = true;
                            break;  // If one is true, don't need to check the others
                        }
                    }

                    if (pass) {
                        leader = helpers.deepCopy(players[j]);
                        leader.i = categories[i].data.length + 1;
                        leader.stat = leader.stats[stats[i]];
                        leader.abbrev = leader.stats.abbrev;
                        delete leader.stats;
                        if (userAbbrev === leader.abbrev) {
                            leader.userTeam = true;
                        } else {
                            leader.userTeam = false;
                        }
                        categories[i].data.push(leader);
                    }

                    // Stop when we found 10
                    if (categories[i].data.length === 10) {
                        break;
                    }
                }

                delete categories[i].minStats;
                delete categories[i].minValue;
            }

            return {
                season: inputs.season,
                categories: categories
            };
        });
    }
}

function uiFirst(vm) {
    ko.computed(function () {
        ui.title("League Leaders - " + vm.season());
    }).extend({throttle: 1});
}

function uiEvery(updateEvents, vm) {
    components.dropdown("leaders-dropdown", ["seasons"], [vm.season()], updateEvents);
}

module.exports = bbgmView.init({
    id: "leaders",
    get,
    InitViewModel,
    mapping,
    runBefore: [updateLeaders],
    uiFirst,
    uiEvery
});
