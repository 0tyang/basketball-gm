// @flow

import backboard from 'backboard';
import orderBy from 'lodash.orderby';
import {PLAYER, g} from '../../common';
import {idb} from '../db';
import type {BackboardTx, Player} from '../../common/types';

type Status = 'empty' | 'error' | 'filling' | 'full';

// Only these IDB object stores for now. Keep in memory only player info for non-retired players and team info for the current season.
type Store = 'awards' | 'draftOrder' | 'draftPicks' | 'events' | 'gameAttributes' | 'games' | 'messages' | 'negotiations' | 'playerFeats' | 'playerStats' | 'players' | 'playoffSeries' | 'releasedPlayers' | 'schedule' | 'teamSeasons' | 'teamStats' | 'teams' | 'trade';
type Index = 'draftPicksBySeason' | 'draftPicksByTid' | 'playerStats' | 'playerStatsAllByPid' | 'playerStatsByPid' | 'playersByTid' | 'releasedPlayers' | 'releasedPlayersByTid' | 'teamSeasonsBySeasonTid' | 'teamSeasonsByTidSeason' | 'teamStatsByPlayoffsTid';

// This variable is only needed because Object.keys(storeInfos) is not handled well in Flow
const STORES: Store[] = ['awards', 'draftOrder', 'draftPicks', 'events', 'gameAttributes', 'games', 'messages', 'negotiations', 'playerFeats', 'playerStats', 'players', 'playoffSeries', 'releasedPlayers', 'schedule', 'teamSeasons', 'teamStats', 'teams', 'trade'];

class Cache {
    data: {[key: Store]: any};
    deletes: {[key: Store]: Set<number>};
    dirtyIndexes: Set<Store>; // Does not distinguish individual indexes, just which stores have dirty indexes. Currently this distinction is not meaningful, but if it is at some point, this should be changed.
    index2store: {[key: Index]: Store};
    indexes: {[key: Index]: any};
    lid: number;
    maxIds: {[key: Store]: number};
    newLeague: boolean;
    status: Status;
    season: number;
    storeInfos: {
        [key: Store]: {
            pk: string,
            autoIncrement: boolean,
            getData?: (BackboardTx, Player[]) => (Promise<any[]> | any[]),
            indexes?: {
                name: Index,
                filter?: (any) => boolean,
                key: (any) => string,
                unique?: boolean,
            }[],
        },
    };

    constructor() {
        this.status = 'empty';

        this.data = {};
        this.deletes = {};
        this.dirtyIndexes = new Set();
        this.indexes = {};
        this.maxIds = {};
        this.newLeague = false;

        this.storeInfos = {
            awards: {
                pk: 'season',
                autoIncrement: false,
            },
            draftOrder: {
                pk: 'rid',
                autoIncrement: false,
                getData: (tx: BackboardTx) => tx.draftOrder.getAll(),
            },
            draftPicks: {
                pk: 'dpid',
                autoIncrement: true,
                getData: (tx: BackboardTx) => tx.draftPicks.getAll(),
                indexes: [{
                    name: 'draftPicksBySeason',
                    key: (row) => String(row.season),
                }, {
                    name: 'draftPicksByTid',
                    key: (row) => String(row.tid),
                }],
            },
            events: {
                pk: 'eid',
                autoIncrement: true,
            },
            gameAttributes: {
                pk: 'key',
                autoIncrement: false,
                getData: (tx: BackboardTx) => tx.gameAttributes.getAll(),
            },
            games: {
                pk: 'gid',
                autoIncrement: false,

                // Current season
                getData: (tx: BackboardTx) => tx.games.index('season').getAll(this.season),
            },
            messages: {
                pk: 'mid',
                autoIncrement: true,
            },
            negotiations: {
                pk: 'pid',
                autoIncrement: false,
                getData: (tx: BackboardTx) => tx.negotiations.getAll(),
            },
            playerFeats: {
                pk: 'fid',
                autoIncrement: true,
            },
            playerStats: {
                pk: 'psid',
                autoIncrement: true,

                getData: async (tx: BackboardTx, players: Player[]) => {
                    const psNested = await Promise.all(players.map((p) => {
                        return tx.playerStats
                            .index('pid, season, tid')
                            .getAll(backboard.bound([p.pid, this.season - 1], [p.pid, this.season, '']));
                    }));

                    // Flatten
                    const psRows = [].concat(...psNested);

                    return orderBy(psRows, 'psid');
                },

                indexes: [{
                    // Only save latest stats row for each player (so playoff stats if available, and latest team if traded mid-season)
                    name: 'playerStatsByPid',
                    filter: (row) => row.season === this.season,
                    key: (row) => String(row.pid),
                    unique: true,
                }, {
                    name: 'playerStatsAllByPid',
                    key: (row) => String(row.pid),
                }],
            },
            players: {
                pk: 'pid',
                autoIncrement: true,
                getData: (tx: BackboardTx, players: Player[]) => players,
                indexes: [{
                    name: 'playersByTid',
                    key: (row) => String(row.tid),
                }],
            },
            playoffSeries: {
                pk: 'season',
                autoIncrement: false,

                // Current season
                getData: (tx: BackboardTx) => tx.playoffSeries.getAll(this.season),
            },
            releasedPlayers: {
                pk: 'rid',
                autoIncrement: true,
                getData: (tx: BackboardTx) => tx.releasedPlayers.getAll(),
                indexes: [{
                    name: 'releasedPlayersByTid',
                    key: (row) => String(row.tid),
                }],
            },
            schedule: {
                pk: 'gid',
                autoIncrement: true,
                getData: (tx: BackboardTx) => tx.schedule.getAll(),
            },
            teamSeasons: {
                pk: 'rid',
                autoIncrement: true,

                // Past 3 seasons
                getData: (tx: BackboardTx) => {
                    return tx.teamSeasons
                        .index('season, tid')
                        .getAll(backboard.bound([this.season - 2], [this.season, '']));
                },

                indexes: [{
                    name: 'teamSeasonsBySeasonTid',
                    key: (row) => `${row.season},${row.tid}`,
                    unique: true,
                }, {
                    name: 'teamSeasonsByTidSeason',
                    key: (row) => `${row.tid},${row.season}`,
                    unique: true,
                }],
            },
            teamStats: {
                pk: 'rid',
                autoIncrement: true,

                // Current season
                getData: (tx: BackboardTx) => {
                    return tx.teamStats
                        .index('season, tid')
                        .getAll(backboard.bound([this.season], [this.season, '']));
                },

                indexes: [{
                    name: 'teamStatsByPlayoffsTid',
                    key: (row) => `${row.playoffs ? 1 : 0},${row.tid}`,
                    unique: true,
                }],
            },
            teams: {
                pk: 'tid',
                autoIncrement: false,
                getData: (tx: BackboardTx) => tx.teams.getAll(),
            },
            trade: {
                pk: 'rid',
                autoIncrement: false,
                getData: (tx: BackboardTx) => tx.trade.getAll(),
            },
        };

        this.index2store = {};
        for (const store of Object.keys(this.storeInfos)) {
            if (this.storeInfos[store].indexes) {
                for (const index of this.storeInfos[store].indexes) {
                    this.index2store[index.name] = store;
                }
            }
        }
    }

    checkStatus(...validStatuses: Status[]) {
        if (!validStatuses.includes(this.status)) {
            throw new Error(`Invalid cache status "${this.status}"`);
        }
    }

    setStatus(status: Status) {
        this.status = status;
    }

    markDirtyIndexes(store: Store) {
        if (this.storeInfos[store].indexes) {
            this.dirtyIndexes.add(store);
        }
    }

    refreshIndexes(store: Store) {
        const storeInfo = this.storeInfos[store];

        if (storeInfo.indexes) {
            for (const index of storeInfo.indexes) {
                this.indexes[index.name] = {};
                for (const row of Object.values(this.data[store])) {
                    if (index.filter && !index.filter(row)) {
                        continue;
                    }

                    const key = index.key(row);

                    if (!index.unique) {
                        if (!this.indexes[index.name].hasOwnProperty(key)) {
                            this.indexes[index.name][key] = [row];
                        } else {
                            this.indexes[index.name][key].push(row);
                        }
                    } else {
                        this.indexes[index.name][key] = row;
                    }
                }
            }

            this.dirtyIndexes.delete(store);
        }
    }

    async loadStore(store: Store, tx: BackboardTx, players: Player[]) {
        const storeInfo = this.storeInfos[store];

        // Load data and do maxIds calculation in parallel
        await Promise.all([
            (async () => {
                // No getData implies no need to store any records in cache except new ones
                const data = storeInfo.getData ? await storeInfo.getData(tx, players) : [];

                this.data[store] = {};
                for (const row of data) {
                    const key = row[storeInfo.pk];
                    this.data[store][key] = row;
                }

                this.deletes[store] = new Set();

                this.refreshIndexes(store);
            })(),
            (async () => {
                // Special case for games, due to interaction with schedule (see hack below)
                if (storeInfo.autoIncrement || store === 'games') {
                    this.maxIds[store] = -1;
                    await tx[store].iterate(null, 'prev', (row, shortCircuit) => {
                        if (row) {
                            this.maxIds[store] = row[storeInfo.pk];
                        }
                        shortCircuit();
                    });
                }
            })(),
        ]);
    }

    // Load database from disk and save in cache, wiping out any prior values in cache
    async fill(season?: number) {
        this.checkStatus('empty', 'full');
        this.setStatus('filling');

        this.data = {};

        // This is crap and should be fixed ASAP
        this.season = season !== undefined ? season : g.season;
        if (this.season === undefined) {
            const seasonAttr = await idb.league.gameAttributes.get('season');
            if (seasonAttr) {
                this.season = seasonAttr.value;
            }
        }
        if (this.season === undefined) {
            throw new Error('Undefined season');
        }

        await idb.league.tx(STORES, async (tx) => {
            // Non-retired players - this is special because it's used for players and playerStats
            const [players1, players2] = await Promise.all([
                tx.players.index('tid').getAll(backboard.lowerBound(PLAYER.UNDRAFTED)),
                tx.players.index('tid').getAll(backboard.bound(PLAYER.UNDRAFTED_FANTASY_TEMP, PLAYER.UNDRAFTED_2)),
            ]);

            const players = players1.concat(players2);

            await Promise.all(STORES.map((store) => {
                return this.loadStore(store, tx, players);
            }));
        });

        // HACK - special case for schedule store, maxId can come from schedule or games because we can't rely on schedule always being populated
        if (this.maxIds.schedule < this.maxIds.games) {
            this.maxIds.schedule = this.maxIds.games;
        }

        this.setStatus('full');
    }

    // Take current contents in database and write to disk
    async flush() {
        this.checkStatus('full');

        await idb.league.tx(STORES, 'readwrite', async (tx) => {
            await Promise.all(STORES.map(async (store) => {
                for (const id of this.deletes[store]) {
                    tx[store].delete(id);
                }

                for (const row of Object.values(this.data[store])) {
                    tx[store].put(row);
                }
            }));
        });
    }

    async get(store: Store, id: number | string): Promise<any> {
        this.checkStatus('full');

        return this.data[store][id];
    }

    async getAll(store: Store): Promise<any[]> {
        this.checkStatus('full');

        return Object.values(this.data[store]);
    }

    checkIndexFreshness(index: Index) {
        const store = this.index2store[index];
        if (this.dirtyIndexes.has(store)) {
            this.refreshIndexes(store);
        }
    }

    async indexGet(index: Index, key: number | string): Promise<any> {
        this.checkStatus('full');
        this.checkIndexFreshness(index);

        const val = this.indexes[index][key];

        if (Array.isArray(val)) {
            return val[0];
        }
        return val;
    }

    async indexGetAll(index: Index, key: number | string | [number, number] | [string, string]): Promise<any[]> {
        this.checkStatus('full');
        this.checkIndexFreshness(index);

        if (typeof key === 'number' || typeof key === 'string') {
            if (this.indexes[index].hasOwnProperty(key)) {
                const val = this.indexes[index][key];
                if (!Array.isArray(val)) {
                    return [val];
                }
                return val;
            }
            return [];
        }

        const [min, max] = key;
        let output = [];
        for (const i of Object.keys(this.indexes[index])) {
            if (i >= min && i <= max) {
                output = output.concat(this.indexes[index][i]);
            }
        }
        return output;
    }

    storeObj(type: 'add' | 'put', store: Store, obj: any) {
        this.checkStatus('full');

        const pk = this.storeInfos[store].pk;
        if (obj.hasOwnProperty(pk)) {
            if (type === 'add' && this.data[store][obj[pk]]) {
                throw new Error(`Primary key "${obj[pk]}" already exists in "${store}"`);
            }

            if (this.maxIds.hasOwnProperty(store) && obj[pk] > this.maxIds[store]) {
                this.maxIds[store] = obj[pk];
            }
        } else {
            if (!this.storeInfos[store].autoIncrement) {
                throw new Error(`Primary key field "${pk}" is required for non-autoincrementing store "${store}"`);
            }

            this.maxIds[store] += 1;
            obj[pk] = this.maxIds[store];
        }

        this.data[store][obj[pk]] = obj;
        this.markDirtyIndexes(store);
    }

    async add(store: Store, obj: any): number | string {
        if (['draftOrder', 'draftPicks', 'events', 'games', 'messages', 'negotiations', 'playerFeats', 'playerStats', 'players', 'releasedPlayers', 'schedule', 'teamSeasons', 'teamStats', 'teams', 'trade'].includes(store)) {
            return this.storeObj('add', store, obj);
        }

        throw new Error(`Cache.add not implemented for store "${store}"`);
    }

    async put(store: Store, obj: any): number | string {
        if (['awards', 'draftOrder', 'gameAttributes', 'playoffSeries', 'players', 'teams'].includes(store)) {
            return this.storeObj('put', store, obj);
        }

        throw new Error(`Cache.put not implemented for store "${store}"`);
    }

    async delete(store: Store, key: number) {
        this.checkStatus('full');

        if (['draftPicks', 'negotiations', 'players', 'releasedPlayers', 'schedule', 'teamSeasons'].includes(store)) {
            if (this.data[store].hasOwnProperty(key)) {
                delete this.data[store][key];
                this.deletes[store].add(key);
                this.markDirtyIndexes(store);
            } else {
                throw new Error(`Invalid key to delete from store "${store}": ${key}`);
            }
        } else {
            throw new Error(`delete not implemented for store "${store}"`);
        }
    }

    async clear(store: Store) {
        this.checkStatus('full');

        if (['negotiations', 'releasedPlayers', 'schedule', 'teamSeasons'].includes(store)) {
            for (const key of Object.keys(this.data[store])) {
                delete this.data[store][key];
                this.deletes[store].add(key);
            }
            this.markDirtyIndexes(store);
        } else {
            throw new Error(`clear not implemented for store "${store}"`);
        }
    }
}

export default Cache;
