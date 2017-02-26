// @flow

import g from '../../globals';
import * as api from '../api';
import notify from '../../lib/bbgm-notifications';
import {createLogger} from '../../common';
import type {LogEventShowOptions} from '../../util/types';

const saveEvent = () => {
    throw new Error('UI events should not be saved to DB');
};

const showEvent = ({
    extraClass,
    persistent,
    text,
    type,
}: LogEventShowOptions) => {
    let title;
    if (type === "error") {
        title = "Error!";
    } else if (type === "changes") {
        title = "Changes since your last visit";
    }

    if (persistent && extraClass === undefined) {
        extraClass = 'notification-danger';
    }

    // Don't show non-critical notification if we're viewing a live game now
    if (!location.pathname.includes('/live') || persistent) {
        notify(text, title, {
            extraClass,
            persistent,
        });

        // Persistent notifications are very rare and should stop game sim when displayed
        if (persistent && g.autoPlaySeasons <= 0) {
            api.updateGameAttributes({stopGames: true}, false);
        }
    }

    // Hacky way to make sure there is room for the multi team mode menu
    const notificationContainer = document.getElementById("notification-container");
    if (g.userTids !== undefined && g.userTids.length > 1 && notificationContainer && !notificationContainer.classList.contains("notification-container-extra-margin-bottom")) {
        notificationContainer.classList.add("notification-container-extra-margin-bottom");
    } else if (g.userTids !== undefined && g.userTids.length === 1 && notificationContainer && notificationContainer.classList.contains("notification-container-extra-margin-bottom")) {
        notificationContainer.classList.remove("notification-container-extra-margin-bottom");
    }
};

const logEvent = createLogger(saveEvent, showEvent);

export {
    logEvent as default,
    showEvent,
};
