/*eslint new-cap: 0*/
const g = require('../globals');
const $ = require('jquery');

function showGCS() {
    window.TriggerPrompt("http://www.basketball-gm.com/", (new Date()).getTime());
}

function showSurvata() {
    window.Survata.ready(() => {
        const s = window.Survata.createSurveywall({
            brand: "Basketball GM",
            explainer: "Please take this short survey to support Basketball GM!",
            disallowClose: true,
            allowSkip: false,
            contentName: new Date().toISOString(),
        });

        s.on("load", data => {
            if (data.status === "monetizable") {
                s.startInterview();
            } else {
                // If Survata doesn't have a survey to show, try GCS
                showGCS();
            }
        });
    });

    // If Survata is down, try other ad
    /*eslint no-use-before-define: 0*/
    window.Survata.fail(show);
}

function showModal() {
    $("#modal-ads").modal("show");
}

function show() {
    // No ads during multi season auto sim
    if (g.autoPlaySeasons > 0) {
        return;
    }

    // No ads for Gold members
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (!g.vm.topMenu.goldCancelled() && currentTimestamp <= g.vm.topMenu.goldUntil()) {
        return;
    }

    const r = Math.random();
    if (r < 0.68) {
        showGCS();
    } else if (r < 0.75) {
        showModal();
    } else {
        // This is all in milliseconds!
        const adTimer = localStorage.adTimer !== undefined ? parseInt(localStorage.adTimer, 10) : 0;
        const now = Date.now();

        // Only show ad once per 60 minutes, at most
        if (now - adTimer > 1000 * 60 * 60) {
            showSurvata();
            localStorage.adTimer = now;
        }
    }
}

module.exports = {
    show,
    showModal,
};
