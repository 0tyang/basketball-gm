// @flow

/* eslint-disable import/first */
import '../vendor/babel-external-helpers';
import registerPromiseWorker from 'promise-worker/register';
import * as api from './api';

registerPromiseWorker(([name, ...params]) => {
    if (name.indexOf('actions.') === 0) {
        const subname = name.replace('actions.');
        if (!api.actions.hasOwnProperty(subname)) {
            throw new Error(`API call to nonexistant worker function "${name}" with params ${JSON.stringify(params)}`);
        }

        return api.actions[subname](...params);
    }

    if (!api.hasOwnProperty(name)) {
        throw new Error(`API call to nonexistant worker function "${name}" with params ${JSON.stringify(params)}`);
    }

    return api[name](...params);
});
