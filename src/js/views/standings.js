const g = require('../globals');
const ui = require('../ui');
const team = require('../core/team');
const $ = require('jquery');
const ko = require('knockout');
const komapping = require('knockout.mapping');
const components = require('./components');
const bbgmView = require('../util/bbgmView');
const helpers = require('../util/helpers');


function get(req) {
    return {
        season: helpers.validateSeason(req.params.season),
    };
}

function InitViewModel() {
    this.season = ko.observable();
    this.confs = ko.observable([]);
}

const mapping = {
    confs: {
        create(options) {
            return new function () {
                komapping.fromJS(options.data, {
                    divs: {
                        key: data => ko.unwrap(data.name),
                    },
                    teams: {
                        key: data => ko.unwrap(data.tid),
                    },
                }, this);
            }();
        },
        key: data => ko.unwrap(data.name),
    },
};

async function updateStandings(inputs, updateEvents, vm) {
    if (updateEvents.indexOf("dbChange") >= 0 || (inputs.season === g.season && updateEvents.indexOf("gameSim") >= 0) || inputs.season !== vm.season()) {
        const teams = await team.filter({
            attrs: ["tid", "cid", "did", "abbrev", "region", "name"],
            seasonAttrs: ["won", "lost", "winp", "wonHome", "lostHome", "wonAway", "lostAway", "wonDiv", "lostDiv", "wonConf", "lostConf", "lastTen", "streak"],
            season: inputs.season,
            sortBy: ["winp", "-lost", "won"],
        });

        const numPlayoffTeams = Math.pow(2, g.numPlayoffRounds);

        const confs = [];
        for (let i = 0; i < g.confs.length; i++) {
            const playoffsRank = [];
            const confTeams = [];
            let l = 0;
            for (let k = 0; k < teams.length; k++) {
                if (g.confs[i].cid === teams[k].cid) {
                    playoffsRank[teams[k].tid] = l + 1; // Store ranks by tid, for use in division standings
                    confTeams.push(helpers.deepCopy(teams[k]));
                    confTeams[l].rank = l + 1;
                    if (l === 0) {
                        confTeams[l].gb = 0;
                    } else {
                        confTeams[l].gb = helpers.gb(confTeams[0], confTeams[l]);
                    }
                    if (confTeams[l].tid === g.userTid) {
                        confTeams[l].highlight = true;
                    } else {
                        confTeams[l].highlight = false;
                    }
                    l += 1;
                }
            }

            confs.push({name: g.confs[i].name, divs: [], teams: confTeams});

            for (let j = 0; j < g.divs.length; j++) {
                if (g.divs[j].cid === g.confs[i].cid) {
                    const divTeams = [];
                    let l = 0;
                    for (let k = 0; k < teams.length; k++) {
                        if (g.divs[j].did === teams[k].did) {
                            divTeams.push(helpers.deepCopy(teams[k]));
                            if (l === 0) {
                                divTeams[l].gb = 0;
                            } else {
                                divTeams[l].gb = helpers.gb(divTeams[0], divTeams[l]);
                            }

                            if (playoffsRank[divTeams[l].tid] <= numPlayoffTeams / 2) {
                                divTeams[l].playoffsRank = playoffsRank[divTeams[l].tid];
                            } else {
                                divTeams[l].playoffsRank = null;
                            }

                            if (divTeams[l].tid === g.userTid) {
                                divTeams[l].highlight = true;
                            } else {
                                divTeams[l].highlight = false;
                            }

                            l += 1;
                        }
                    }

                    confs[i].divs.push({did: g.divs[j].did, name: g.divs[j].name, teams: divTeams});
                }
            }
        }

        const playoffsByConference = g.confs.length === 2 && !localStorage.top16playoffs;

        // Fix playoffsRank if conferences don't matter
        if (!playoffsByConference) {
            for (let i = 0; i < numPlayoffTeams; i++) {
                const t = teams[i];
                const div = confs[t.cid].divs.find(div => t.did === div.did);
                const t2 = div.teams.find(t2 => t.tid === t2.tid);
                if (t2) {
                    t2.playoffsRank = i < numPlayoffTeams ? i + 1 : null;
                }
            }
        }

        return {
            confs,
            playoffsByConference,
            season: inputs.season,
        };
    }
}

function uiFirst(vm) {
    ko.computed(() => {
        ui.title(`Standings - ${vm.season()}`);
    }).extend({throttle: 1});

    ui.tableClickableRows($(".standings-division"));
}

function uiEvery(updateEvents, vm) {
    components.dropdown("standings-dropdown", ["seasons"], [vm.season()], updateEvents);
}

module.exports = bbgmView.init({
    id: "standings",
    get,
    InitViewModel,
    mapping,
    runBefore: [updateStandings],
    uiFirst,
    uiEvery,
});
