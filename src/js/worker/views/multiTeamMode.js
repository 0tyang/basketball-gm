// @flow

import g from '../../globals';
import * as league from '../core/league';
import bbgmViewReact from '../../util/bbgmViewReact';
import MultiTeamMode from '../../ui/views/MultiTeamMode';

async function updateMultiTeamMode(inputs, updateEvents) {
    if (updateEvents.includes('dbChange') || updateEvents.includes('firstRun') || updateEvents.includes('g.userTids')) {
        // Make sure it's current
        await league.loadGameAttribute('godMode');

        const teams = [];
        for (let i = 0; i < g.numTeams; i++) {
            teams.push({
                tid: i,
                name: `${g.teamRegionsCache[i]} ${g.teamNamesCache[i]}`,
            });
        }

        return {
            userTids: g.userTids,
            teams,
        };
    }
}

export default bbgmViewReact.init({
    id: "multiTeamMode",
    runBefore: [updateMultiTeamMode],
    Component: MultiTeamMode,
});
