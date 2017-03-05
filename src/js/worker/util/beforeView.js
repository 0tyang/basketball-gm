// @flow

import {Cache, connectLeague, idb} from '../db';
import {g, helpers} from '../../common';
import {league} from '../core';
import {toUI, updatePhase, updatePlayMenu, updateStatus} from '../util';

const beforeLeague = async (newLid: number, loadedLid: ?number) => {
    g.lid = newLid;

    // Check for some other window making changes to the database
    const checkDbChange = async lid => {
        // Stop if the league isn't viewed anymore
        if (lid !== g.lid) {
            return;
        }

        // league.loadGameAttribute cannot be used to check for a new lastDbChange because we need to have the old g.lastDbChange available right up to the last moment possible, for cases where league.loadGameAttribute might be blocked during a slow page refresh, as happens when viewing player rating and stat distributions. Otherwise, an extra refresh would occur with a stale lastDbChange.

        const lastDbChange = await idb.league.gameAttributes.get("lastDbChange");
        if (g.lastDbChange !== lastDbChange.value) {
            await league.loadGameAttributes();
            //leagueContentEl.innerHTML = "&nbsp;";  // Blank doesn't work, for some reason
            await toUI('realtimeUpdate', ["dbChange"]);
            await updatePlayMenu();
            updatePhase();
            updateStatus();
            setTimeout(() => checkDbChange(lid), 3000);
        } else {
            setTimeout(() => checkDbChange(lid), 3000);
        }
    };

    // Make sure league template FOR THE CURRENT LEAGUE is showing
    if (loadedLid !== g.lid) {
        // Clear old game attributes from g, just to be sure
        helpers.resetG();
        await toUI('resetG');

        // Make sure this league exists before proceeding
        const l = await idb.meta.leagues.get(g.lid);
        if (l === undefined) {
            throw new Error('League not found.');
        }

        idb.league = await connectLeague(g.lid);

        // Reuse existing cache, if it was just created for a new league
        if (!idb.cache || !idb.cache.newLeague) {
            idb.cache = new Cache();
            await idb.cache.fill();
        } else if (idb.cache && idb.cache.newLeague) {
            idb.cache.newLeague = false;
        }

        await league.loadGameAttributes();

        // Update play menu
        updateStatus();
        updatePhase();
        await updatePlayMenu();
        toUI('emit', 'updateTopMenu', {lid: g.lid});
        //checkDbChange(g.lid); // Currently not working
    }
};

const beforeNonLeague = () => {
    g.lid = undefined;
    toUI('emit', 'updateTopMenu', {lid: undefined});
};

export default {
    league: beforeLeague,
    nonLeague: beforeNonLeague,
};
