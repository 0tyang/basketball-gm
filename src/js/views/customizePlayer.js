// @flow

import backboard from 'backboard';
import g from '../globals';
import * as finances from '../core/finances';
import * as player from '../core/player';
import {getCopy} from '../db';
import bbgmViewReact from '../util/bbgmViewReact';
import * as helpers from '../util/helpers';
import CustomizePlayer from './views/CustomizePlayer';

function get(ctx) {
    if (ctx.params.hasOwnProperty("pid")) {
        return {
            pid: parseInt(ctx.params.pid, 10),
        };
    }

    return {
        pid: null,
    };
}

async function updateCustomizePlayer(inputs, updateEvents) {
    if (!g.godMode) {
        return {
            godMode: g.godMode,
        };
    }

    if (updateEvents.includes('firstRun')) {
        const teams = await getCopy.teams({
            attrs: ["tid", "region", "name"],
        });

        // Once a new draft class is generated, if the next season hasn't started, need to bump up year numbers
        const seasonOffset = g.phase < g.PHASE.FREE_AGENCY ? 0 : 1;

        for (let i = 0; i < teams.length; i++) {
            teams[i].text = `${teams[i].region} ${teams[i].name}`;
        }
        teams.unshift({
            tid: g.PLAYER.RETIRED,
            text: "Retired",
        });
        teams.unshift({
            tid: g.PLAYER.UNDRAFTED_3,
            text: `${g.season + seasonOffset + 2} Draft Prospect`,
        });
        teams.unshift({
            tid: g.PLAYER.UNDRAFTED_2,
            text: `${g.season + seasonOffset + 1} Draft Prospect`,
        });
        teams.unshift({
            tid: g.PLAYER.UNDRAFTED,
            text: `${g.season + seasonOffset} Draft Prospect`,
        });
        teams.unshift({
            tid: g.PLAYER.FREE_AGENT,
            text: "Free Agent",
        });

        let appearanceOption;
        let originalTid;
        let p;

        if (inputs.pid === null) {
            // Generate new player as basis
            const teamSeasons = await g.dbl.teamSeasons.index("tid, season").getAll(backboard.bound([g.userTid, g.season - 2], [g.userTid, g.season]));
            const scoutingRank = finances.getRankLastThree(teamSeasons, "expenses", "scouting");

            p = player.generate(
                g.PLAYER.FREE_AGENT,
                20,
                '',
                50,
                50,
                g.season,
                false,
                scoutingRank,
            );

            p.face.fatness = helpers.round(p.face.fatness, 2);
            p.face.eyes[0].angle = helpers.round(p.face.eyes[0].angle, 1);
            p.face.eyes[1].angle = helpers.round(p.face.eyes[1].angle, 1);

            appearanceOption = 'Cartoon Face';
            p.imgURL = "http://";
        } else {
            // Load a player to edit
            p = await g.dbl.players.get(inputs.pid);
            if (p.imgURL.length > 0) {
                appearanceOption = 'Image URL';
            } else {
                appearanceOption = 'Cartoon Face';
                p.imgURL = "http://";
            }

            originalTid = p.tid;
        }

        return {
            appearanceOption,
            godMode: g.godMode,
            originalTid,
            p,
            season: g.season,
            teams,
        };
    }
}

export default bbgmViewReact.init({
    id: "customizePlayer",
    get,
    runBefore: [updateCustomizePlayer],
    Component: CustomizePlayer,
});
