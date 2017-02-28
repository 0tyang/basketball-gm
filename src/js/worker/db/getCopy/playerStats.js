// @flow

import backboard from 'backboard';
import {idb} from '../../db';
import {mergeByPk} from './helpers';
import type {PlayerStats} from '../../../common/types';

const getCopy = async ({pid}: {pid: number}): Promise<PlayerStats[]> => {
    return mergeByPk(
        await idb.league.playerStats.index("pid, season, tid").getAll(backboard.bound([pid], [pid, ''])),
        await idb.cache.indexGetAll('playerStatsAllByPid', pid),
        idb.cache.storeInfos.playerStats.pk,
    );
};

export default getCopy;
