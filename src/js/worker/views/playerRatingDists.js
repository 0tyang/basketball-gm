import g from '../../globals';
import {getCopy} from '../db';
import type {GetOutput, UpdateEvents} from '../../common/types';

async function updatePlayers(
    inputs: GetOutput,
    updateEvents: UpdateEvents,
    state: any,
): void | {[key: string]: any} {
    if (updateEvents.includes('dbChange') || (inputs.season === g.season && (updateEvents.includes('gameSim') || updateEvents.includes('playerMovement'))) || inputs.season !== state.season) {
        let players;
        if (g.season === inputs.season && g.phase <= g.PHASE.PLAYOFFS) {
            players = await g.cache.indexGetAll('playersByTid', [g.PLAYER.FREE_AGENT, Infinity]);
        } else {
            // If it's not this season, get all players, because retired players could apply to the selected season
            players = await getCopy.players({activeAndRetired: true});
        }

        players = await getCopy.playersPlus(players, {
            ratings: ["ovr", "pot", "hgt", "stre", "spd", "jmp", "endu", "ins", "dnk", "ft", "fg", "tp", "blk", "stl", "drb", "pss", "reb"],
            season: inputs.season,
            showNoStats: true,
            showRookies: true,
            fuzz: true,
        });

        const ratingsAll = players.reduce((memo, p) => {
            for (const rating of Object.keys(p.ratings)) {
                if (memo.hasOwnProperty(rating)) {
                    memo[rating].push(p.ratings[rating]);
                } else {
                    memo[rating] = [p.ratings[rating]];
                }
            }
            return memo;
        }, {});

        return {
            season: inputs.season,
            ratingsAll,
        };
    }
}

export default {
    runBefore: [updatePlayers],
};
