const g = require('../globals');
const ui = require('../ui');
const player = require('../core/player');
const $ = require('jquery');
const ko = require('knockout');
const bbgmView = require('../util/bbgmView');
const helpers = require('../util/helpers');

function get(req) {
    return {
        season: helpers.validateSeason(req.params.season),
    };
}

function InitViewModel() {
    this.season = ko.observable();
}

const mapping = {
    players: {
        create: options => options.data,
    },
};

async function updatePlayers(inputs, updateEvents) {
    if (updateEvents.indexOf("dbChange") >= 0 || updateEvents.indexOf("firstRun") >= 0 || (updateEvents.indexOf("newPhase") >= 0 && g.phase === g.PHASE.BEFORE_DRAFT)) {
        let players = await g.dbl.players.index('tid').getAll(g.PLAYER.RETIRED);
        players = players.filter(p => p.hof);
        players = await player.withStats(null, players, {statsSeasons: "all", statsPlayoffs: true});
        players = player.filter(players, {
            attrs: ["pid", "name", "draft", "retiredYear", "statsTids"],
            ratings: ["ovr", "pos"],
            stats: ["season", "abbrev", "gp", "min", "trb", "ast", "pts", "per", "ewa"],
            playoffs: true,
        });

        // This stuff isn't in player.filter because it's only used here.
        for (let i = 0; i < players.length; i++) {
            players[i].peakOvr = 0;
            for (let j = 0; j < players[i].ratings.length; j++) {
                if (players[i].ratings[j].ovr > players[i].peakOvr) {
                    players[i].peakOvr = players[i].ratings[j].ovr;
                }
            }

            players[i].bestStats = {};
            let bestEWA = 0;
            for (let j = 0; j < players[i].stats.length; j++) {
                const rEWA = players[i].stats[j].ewa;
                let pEWA = 0;
                for (let k = 0; k < players[i].statsPlayoffs.length; k++) {
                    if (players[i].stats[j].season === players[i].statsPlayoffs[k].season) {
                        pEWA = players[i].statsPlayoffs[k].ewa;
                        break;
                    }
                }
                if (rEWA + pEWA > bestEWA) {
                    bestEWA = rEWA + pEWA;
                    players[i].bestStats = players[i].stats[j];
                }
            }
        }

        return {
            players,
        };
    }
}

function uiFirst(vm) {
    ui.title("Hall of Fame");

    ko.computed(() => {
        ui.datatable($("#hall-of-fame"), 2, vm.players().map(p => {
            let pick;
            if (p.draft.round > 0) {
                pick = `${p.draft.round}-${p.draft.pick}`;
            } else {
                pick = '';
            }
            return [`<a href="${helpers.leagueUrl(["player", p.pid])}">${p.name}</a>`, p.ratings[p.ratings.length - 1].pos, String(p.draft.year), String(p.retiredYear), pick, String(p.peakOvr), String(p.bestStats.season), `<a href="${helpers.leagueUrl(["roster", p.bestStats.abbrev, p.bestStats.season])}">${p.bestStats.abbrev}</a>`, String(p.bestStats.gp), helpers.round(p.bestStats.min, 1), helpers.round(p.bestStats.pts, 1), helpers.round(p.bestStats.trb, 1), helpers.round(p.bestStats.ast, 1), helpers.round(p.bestStats.per, 1), String(p.careerStats.gp), helpers.round(p.careerStats.min, 1), helpers.round(p.careerStats.pts, 1), helpers.round(p.careerStats.trb, 1), helpers.round(p.careerStats.ast, 1), helpers.round(p.careerStats.per, 1), helpers.round(p.careerStats.ewa, 1), p.statsTids.indexOf(g.userTid) >= 0];
        }), {
            rowCallback(row, data) {
                // Highlight players from the user's team
                if (data[data.length - 1]) {
                    row.classList.add("info");
                }
            },
        });
    }).extend({throttle: 1});

    ui.tableClickableRows($("#hall-of-fame"));
}

module.exports = bbgmView.init({
    id: "hallOfFame",
    get,
    InitViewModel,
    mapping,
    runBefore: [updatePlayers],
    uiFirst,
});
