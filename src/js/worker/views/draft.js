// @flow

import g from '../../globals';
import * as draft from '../core/draft';
import {getCopy} from '../db';

async function updateDraft() {
    // DIRTY QUICK FIX FOR v10 db upgrade bug - eventually remove
    // This isn't just for v10 db upgrade! Needed the same fix for http://www.reddit.com/r/BasketballGM/comments/2tf5ya/draft_bug/cnz58m2?context=3 - draft class not always generated with the correct seasons
    {
        const players = await g.cache.indexGetAll('playersByTid', g.PLAYER.UNDRAFTED);
        for (const p of players) {
            const season = p.ratings[0].season;
            if (season !== g.season && g.phase === g.PHASE.DRAFT) {
                console.log("FIXING FUCKED UP DRAFT CLASS");
                console.log(season);
                p.ratings[0].season = g.season;
                p.draft.year = g.season;
            }
        }
    }

    let undrafted = await g.cache.indexGetAll('playersByTid', g.PLAYER.UNDRAFTED);
    undrafted.sort((a, b) => b.valueFuzz - a.valueFuzz);
    undrafted = await getCopy.playersPlus(undrafted, {
        attrs: ["pid", "name", "age", "injury", "contract", "watch"],
        ratings: ["ovr", "pot", "skills", "pos"],
        stats: ["per", "ewa"],
        season: g.season,
        showNoStats: true,
        showRookies: true,
        fuzz: true,
    });

    let drafted = await g.cache.indexGetAll('playersByTid', [0, Infinity]);
    drafted = drafted.filter((p) => p.draft.year === g.season);
    drafted.sort((a, b) => (100 * a.draft.round + a.draft.pick) - (100 * b.draft.round + b.draft.pick));
    drafted = await getCopy.playersPlus(drafted, {
        attrs: ["pid", "tid", "name", "age", "draft", "injury", "contract", "watch"],
        ratings: ["ovr", "pot", "skills", "pos"],
        stats: ["per", "ewa"],
        season: g.season,
        showRookies: true,
        fuzz: true,
    });

    // Start draft if a pick has already been made (then it's already started)
    let started = drafted.length > 0;

    const draftOrder = await draft.getOrder();
    for (let i = 0; i < draftOrder.length; i++) {
        const slot = draftOrder[i];
        drafted.push({
            draft: {
                tid: slot.tid,
                originalTid: slot.originalTid,
                round: slot.round,
                pick: slot.pick,
            },
            pid: -1,
        });
    }

    // ...or start draft if the user has the first pick (in which case starting it has no effect, might as well do it automatically)
    started = started || g.userTids.includes(drafted[0].draft.tid);

    return {
        undrafted,
        drafted,
        started,
        fantasyDraft: g.phase === g.PHASE.FANTASY_DRAFT,
        userTids: g.userTids,
    };
}

export default {
    runBefore: [updateDraft],
};
