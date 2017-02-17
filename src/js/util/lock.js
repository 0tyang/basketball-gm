// @flow

import g from '../globals';
import * as league from '../core/league';
import {getCopy} from '../db';
import * as helpers from './helpers';
import type {BackboardTx} from './types';

/**
 * Is game simulation in progress?
 *
 * Calls the callback function with either true or false depending on whether there is a game simulation currently in progress.
 *
 * @memberOf util.lock
 * @return {Promise.boolean}
 */
async function gamesInProgress(): Promise<boolean> {
    await league.loadGameAttribute("gamesInProgress");
    return g.gamesInProgress;
}

/**
 * Is a negotiation in progress?
 *
 * Calls the callback function with either true or false depending on whether there is an ongoing negoation.
 *
 * @memberOf util.lock
 * @param {IDBTransaction|null} tx An IndexedDB transaction on negotiations; if null is passed, then a new transaction will be used.
 * @return {Promise.boolean}
 */
async function negotiationInProgress(tx: ?BackboardTx): Promise<boolean> {
    const dbOrTx = tx !== undefined && tx !== null ? tx : g.dbl;
    const negotiations = await dbOrTx.negotiations.getAll();
    return negotiations.length > 0;
}

/**
 * Is a phase change in progress?
 *
 * @memberOf util.lock
 * @return {Promise.boolean}
 */
async function phaseChangeInProgress(): Promise<boolean> {
    await league.loadGameAttribute("phaseChangeInProgress");
    return g.phaseChangeInProgress;
}

/**
 * Can new game simulations be started?
 *
 * Calls the callback function with either true or false. If games are in progress or any contract negotiation is in progress, false.
 *
 * @memberOf util.lock
 * @param {IDBTransaction|null} tx An IndexedDB transaction on negotiations; if null is passed, then a new transaction will be used.
 * @return {Promise.boolean}
 */
function canStartGames(tx: ?BackboardTx): Promise<boolean> {
    return helpers.maybeReuseTx(["negotiations"], "readonly", tx, async tx2 => {
        const gamesInProgressBool = await gamesInProgress();
        if (gamesInProgressBool) {
            return false;
        }

        const negotiationInProgressBool = await negotiationInProgress(tx2);
        if (negotiationInProgressBool) {
            return false;
        }

        const phaseChangeInProgressBool = await phaseChangeInProgress();
        if (phaseChangeInProgressBool) {
            return false;
        }

        return true;
    });
}

/**
 * Can a new contract negotiation be started?
 *
 * Calls the callback function with either true or false. If games are in progress or a free agent (not re-signing!) is being negotiated with, false.
 *
 * @memberOf util.lock
 * @param {IDBTransaction|null} tx An IndexedDB transaction on negotiations; if null is passed, then a new transaction will be used.
 * @return {Promise.boolean}
 */
function canStartNegotiation(tx: ?BackboardTx): Promise<boolean> {
    return helpers.maybeReuseTx(["negotiations"], "readonly", tx, async tx2 => {
        const gamesInProgressBool = await gamesInProgress();
        if (gamesInProgressBool) {
            return false;
        }

        // Allow multiple parallel negotiations only for re-signing players
        const negotiations = await tx2.negotiations.getAll();

        for (let i = 0; i < negotiations.length; i++) {
            if (!negotiations[i].resigning) {
                return false;
            }
        }

        return true;

        // Don't also check phase change because negotiations are auto-started in phase change
    });
}

/**
 * Is there an undread message from the owner?
 *
 * Calls the callback function with either true or false.
 *
 * @memberOf util.lock
 * @return {Promise.boolean}
 */
async function unreadMessage(): Promise<boolean> {
    const messages = await getCopy.messages();
    for (let i = 0; i < messages.length; i++) {
        if (!messages[i].read) {
            return true;
        }
    }
    return false;
}

export {
    gamesInProgress,
    negotiationInProgress,
    phaseChangeInProgress,
    canStartGames,
    canStartNegotiation,
    unreadMessage,
};

