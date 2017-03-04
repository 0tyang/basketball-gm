// @flow

import {PHASE, g} from '../../common';
import {getCopy} from '../db';
import type {GetOutput, UpdateEvents} from '../../common/types';

async function updatePlayers(
    inputs: GetOutput,
    updateEvents: UpdateEvents,
): void | {[key: string]: any} {
    if (updateEvents.includes('dbChange') || updateEvents.includes('firstRun') || (updateEvents.includes('newPhase') && g.phase === PHASE.BEFORE_DRAFT)) {
        let players = await getCopy.players({retired: true});
        players = players.filter(p => p.hof);
        players = await getCopy.playersPlus(players, {
            attrs: ["pid", "name", "draft", "retiredYear", "statsTids"],
            ratings: ["ovr", "pos"],
            stats: ["season", "abbrev", "tid", "gp", "min", "trb", "ast", "pts", "per", "ewa"],
        });

        // This stuff isn't in getCopy.playersPlus because it's only used here.
        for (const p of players) {
            p.peakOvr = 0;
            for (const pr of p.ratings) {
                if (pr.ovr > p.peakOvr) {
                    p.peakOvr = pr.ovr;
                }
            }

            p.bestStats = {};
            let bestEWA = 0;
            p.teamSums = {};
            for (let j = 0; j < p.stats.length; j++) {
                const tid = p.stats[j].tid;
                const EWA = p.stats[j].ewa;
                if (EWA > bestEWA) {
                    p.bestStats = p.stats[j];
                    bestEWA = EWA;
                }
                if (p.teamSums.hasOwnProperty(tid)) {
                    p.teamSums[tid] += EWA;
                } else {
                    p.teamSums[tid] = EWA;
                }
            }
            p.legacyTid = parseInt(Object.keys(p.teamSums).reduce((teamA, teamB) => (p.teamSums[teamA] > p.teamSums[teamB] ? teamA : teamB)), 10);
        }

        return {
            players,
        };
    }
}

export default {
    runBefore: [updatePlayers],
};
