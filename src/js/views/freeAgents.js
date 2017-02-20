// @flow

import Promise from 'bluebird';
import g from '../globals';
import * as freeAgents from '../core/freeAgents';
import * as player from '../core/player';
import * as team from '../core/team';
import {getCopy} from '../db';
import bbgmViewReact from '../util/bbgmViewReact';
import * as helpers from '../util/helpers';
import FreeAgents from './views/FreeAgents';

function get() {
    if (g.phase === g.PHASE.RESIGN_PLAYERS) {
        return {
            redirectUrl: helpers.leagueUrl(["negotiation"]),
        };
    }
}

async function updateFreeAgents() {
    let [payroll, userPlayers, players] = await Promise.all([
        team.getPayroll(g.userTid).get(0),
        g.cache.indexGetAll('playersByTid', g.userTid),
        g.cache.indexGetAll('playersByTid', g.PLAYER.FREE_AGENT),
    ]);

    const capSpace = g.salaryCap > payroll ? (g.salaryCap - payroll) / 1000 : 0;

    players = await getCopy.players(players, {
        attrs: ["pid", "name", "age", "contract", "freeAgentMood", "injury", "watch"],
        ratings: ["ovr", "pot", "skills", "pos"],
        stats: ["min", "pts", "trb", "ast", "per"],
        season: g.season,
        showNoStats: true,
        showRookies: true,
        fuzz: true,
        oldStats: true,
    });

    for (let i = 0; i < players.length; i++) {
        players[i].contract.amount = freeAgents.amountWithMood(players[i].contract.amount, players[i].freeAgentMood[g.userTid]);
        players[i].mood = player.moodColorText(players[i]);
    }

    return {
        capSpace,
        gamesInProgress: g.gamesInProgress,
        minContract: g.minContract,
        numRosterSpots: 15 - userPlayers.length,
        phase: g.phase,
        players,
    };
}

export default bbgmViewReact.init({
    id: "freeAgents",
    get,
    runBefore: [updateFreeAgents],
    Component: FreeAgents,
});
