// @flow

import Promise from 'bluebird';
import g from '../globals';
import * as ui from './ui';
import {init, views} from '../worker';
import {league} from '../worker/core';

const runBefore = async (viewId, inputs, updateEvents, prevData, setStateData, topMenu) => {
    if (views.hasOwnProperty(viewId) && views[viewId].hasOwnProperty('runBefore')) {
        return Promise.all(views[viewId].runBefore.map((fn) => {
            return fn(inputs, updateEvents, prevData, setStateData, topMenu);
        }));
    }

    return [];
};

const updatePlayerWatch = async (pid: number, watch: boolean) => {
    const cachedPlayer = await g.cache.get('players', pid);
    if (cachedPlayer) {
        cachedPlayer.watch = watch;
    } else {
        await g.dbl.tx('players', 'readwrite', async tx => {
            const p = await tx.players.get(this.props.pid);
            p.watch = watch;
            await tx.players.put(p);
        });
    }

    ui.realtimeUpdate(['playerMovement', 'watchList']);
    league.updateLastDbChange();
};

const updateUserTid = async (userTid: number) => {
    await league.setGameAttributes({
        userTid,
    });
    g.emitter.emit('updateMultiTeam');

    // dbChange is kind of a hack because it was designed for multi-window update only, but it should update everything
    ui.realtimeUpdate(['dbChange']);
    league.updateLastDbChange();
};

export {
    init,
    runBefore,
    updatePlayerWatch,
    updateUserTid,
};
