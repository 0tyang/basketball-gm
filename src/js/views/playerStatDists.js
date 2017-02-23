import g from '../globals';
import {getCopy} from '../db';
import bbgmViewReact from '../util/bbgmViewReact';
import * as helpers from '../util/helpers';
import PlayerStatDists from './views/PlayerStatDists';

function get(ctx) {
    return {
        season: helpers.validateSeason(ctx.params.season),
    };
}

async function updatePlayers(inputs, updateEvents, state) {
    if (updateEvents.includes('dbChange') || (inputs.season === g.season && (updateEvents.includes('gameSim') || updateEvents.includes('playerMovement'))) || inputs.season !== state.season) {
        let players;
        if (g.season === inputs.season && g.phase <= g.PHASE.PLAYOFFS) {
            players = await g.cache.indexGetAll('playersByTid', [g.PLAYER.FREE_AGENT, Infinity]);
        } else {
            // If it's not this season, get all players, because retired players could apply to the selected season
            players = await getCopy.players({activeAndRetired: true});
        }
        players = await getCopy.playersPlus(players, {
            ratings: ["skills"],
            stats: ["gp", "gs", "min", "fg", "fga", "fgp", "tp", "tpa", "tpp", "ft", "fta", "ftp", "orb", "drb", "trb", "ast", "tov", "stl", "blk", "pf", "pts", "per"],
            season: inputs.season,
        });

        const statsAll = players.reduce((memo, p) => {
            for (const stat of Object.keys(p.stats)) {
                if (stat === 'playoffs') {
                    continue;
                }

                if (memo.hasOwnProperty(stat)) {
                    memo[stat].push(p.stats[stat]);
                } else {
                    memo[stat] = [p.stats[stat]];
                }
            }
            return memo;
        }, {});

        return {
            season: inputs.season,
            statsAll,
        };
    }
}

export default bbgmViewReact.init({
    id: "playerStatDists",
    get,
    runBefore: [updatePlayers],
    Component: PlayerStatDists,
});
