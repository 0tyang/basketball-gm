// @flow

import {ads, emitter, realtimeUpdate} from '../ui/util';
import {showEvent} from '../ui/util/logEvent';
import type {GameAttributes, LogEventShowOptions, UpdateEvents} from '../common/types';

const emit = (name: string, content: any) => {
    emitter.emit(name, content);
};

const initAds = (goldUntil: number | void) => {
    // No ads for Gold members
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp > goldUntil) {
        let el;
        el = document.getElementById('banner-ad-top-wrapper');
        if (el) {
            el.innerHTML = '<div id="div-gpt-ad-1473268147477-1" style="text-align: center; min-height: 95px; margin-top: 1em"></div>';
        }
        el = document.getElementById('banner-ad-bottom-wrapper-1');
        if (el) {
            el.innerHTML = '<div id="div-gpt-ad-1479941549483-2" style="text-align: center; height: 250px; position: absolute; top: 5px; left: 0"></div>';
        }
        el = document.getElementById('banner-ad-bottom-wrapper-2');
        if (el) {
            el.innerHTML = '<div id="div-gpt-ad-1479941549483-1" style="text-align: center; height: 250px; position: absolute; top: 5px; right: 0"></div>';
        }
        el = document.getElementById('banner-ad-bottom-wrapper-logo');
        if (el) {
            el.innerHTML = '<div style="height: 250px; margin: 5px 310px 0 310px; display:flex; align-items: center; justify-content: center;"><img src="https://basketball-gm.com/files/logo.png" style="max-height: 100%; max-width: 100%"></div>';
        }
        ads.showBanner();
    } else {
        const wrappers = ['banner-ad-top-wrapper', 'banner-ad-bottom-wrapper-1', 'banner-ad-bottom-wrapper-logo', 'banner-ad-bottom-wrapper-2'];
        for (const wrapper of wrappers) {
            const el = document.getElementById(wrapper);
            if (el) {
                el.innerHTML = '';
            }
        }
    }
};

async function realtimeUpdate2(updateEvents: UpdateEvents = [], url?: string, raw?: Object = {}) {
    await realtimeUpdate(updateEvents, url, raw);
}

const setGameAttributes = (gameAttributes: GameAttributes) => {
    console.log('Should populate g in ui', gameAttributes);
};

const showEvent2 = (options: LogEventShowOptions) => {
    showEvent(options);
};

export {
    emit,
    initAds,
    realtimeUpdate2 as realtimeUpdate,
    setGameAttributes,
    showEvent2 as showEvent,
};
