const g = require('../globals');
const bbgmViewReact = require('../util/bbgmViewReact');
const helpers = require('../util/helpers');
const Transactions = require('./views/Transactions');

function get(req) {
    let abbrev, tid;
    if (req.params.abbrev && req.params.abbrev !== "all") {
        [tid, abbrev] = helpers.validateAbbrev(req.params.abbrev);
    } else if (req.params.abbrev && req.params.abbrev === "all") {
        tid = -1;
        abbrev = "all";
    } else {
        tid = g.userTid;
        abbrev = g.teamAbbrevsCache[tid];
    }

    let season;
    if (req.params.season && req.params.season !== "all") {
        season = helpers.validateSeason(req.params.season);
    } else if (req.params.season && req.params.season === "all") {
        season = "all";
    } else {
        season = g.season;
    }

    return {
        tid,
        abbrev,
        season,
        eventType: req.params.eventType || 'all',
    };
}

async function updateEventLog(inputs, updateEvents, state) {
    if (updateEvents.length >= 0 || inputs.season !== state.season || inputs.abbrev !== state.abbrev || inputs.eventType !== state.eventType) {
        let events = state.events === undefined ? [] : state.events;
        if (inputs.season !== state.season || inputs.abbrev !== state.abbrev || inputs.eventType !== state.eventType) {
            events = [];
        }

        if (events.length === 0) {
            if (inputs.season === "all") {
                events = await g.dbl.events.getAll();
            } else {
                events = await g.dbl.events.index('season').getAll(inputs.season);
            }

            // Show all events, newest at top
            events.reverse(); // Newest first
        } else if (inputs.season === g.season) { // Can't update old seasons!
            // Update by adding any new events to the top of the list
            const maxEid = events[0].eid;
            const newEvents = [];
            await g.dbl.events.index('season').iterate(inputs.season, "prev", (event, shortCircuit) => {
                if (event.eid > maxEid) {
                    newEvents.push(event);
                } else {
                    shortCircuit();
                    // Oldest first (cursor is in "prev" direction and we're adding to the front of vm.events)
                    for (let i = newEvents.length - 1; i >= 0; i--) {
                        events.unshift(newEvents[i]);
                    }
                }
            });
        }

        if (inputs.abbrev !== "all") {
            events = events.filter(event => event.tids !== undefined && event.tids.indexOf(inputs.tid) >= 0);
        }
        if (inputs.eventType === "all") {
            events = events.filter(event => event.type === 'reSigned' || event.type === 'release' || event.type === 'trade' || event.type === 'freeAgent' || event.type === 'draft');
        } else {
            events = events.filter(event => event.type === inputs.eventType);
        }

        events.forEach(helpers.correctLinkLid);

        return {
            abbrev: inputs.abbrev,
            events,
            season: inputs.season,
            eventType: inputs.eventType,
        };
    }
}

module.exports = bbgmViewReact.init({
    id: "transactions",
    get,
    runBefore: [updateEventLog],
    Component: Transactions,
});
