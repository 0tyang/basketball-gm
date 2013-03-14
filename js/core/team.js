/**
 * @name core.team
 * @namespace Functions operating on team objects, or parts of team objects.
 */
define(["globals", "util/helpers"], function (g, helpers) {
    "use strict";

    /**
     * Add a new row of season attributes to a team object.
     * 
     * There should be one season attributes row for each year, and a new row should be added for each team at the start of a season.
     *
     * @memberOf core.team
     * @param {Object} t Team object.
     * @return {Object} Updated team object.
     */
    function addSeasonRow(t) {
        var key, newSeason, s;

        s = t.seasons.length - 1; // Most recent ratings

        if (s === -1) {
            // Initial entry
            newSeason = {
                season: g.season,
                gp: 0,
                att: 0,
                cash: 10000,
                won: 0,
                lost: 0,
                wonHome: 0,
                lostHome: 0,
                wonAway: 0,
                lostAway: 0,
                wonDiv: 0,
                lostDiv: 0,
                wonConf: 0,
                lostConf: 0,
                lastTen: [],
                streak: 0,
                madePlayoffs: false,
                confChamps: false,
                leagueChamps: false,
                hype: Math.random(),
                pop: 0,  // Needs to be set somewhere!
                popRank: 0,  // Needs to be set somewhere!
                tvContract: {
                    amount: 0,
                    exp: 0
                },
                merchRevenue: 0,
                sponsorRevenue: 0,
                ticketRevenue: 0,
                nationalTvRevenue: 0,
                localTvRevenue: 0,
                payrollEndOfSeason: -1,
                salaryPaid: 0,
                luxuryTaxPaid: 0,
                minTaxPaid: 0,
                otherPaid: 0,
                scoutingPaid: 0,
                scoutingPaidRank: 0,
                coachingPaid: 0,
                coachingPaidRank: 0,
                healthPaid: 0,
                healthPaidRank: 0,
                facilitiesPaid: 0,
                facilitiesPaidRank: 0,
                stadiumPaid: 0,
                stadiumPaidRank: 0
            };
        } else {
            // New season, carrying over some values from the first season
            newSeason = {};
            for (key in t.seasons[s]) {
                if (t.seasons[s].hasOwnProperty(key)) {
                    newSeason[key] = t.seasons[s][key];
                }
            }
            newSeason.season = g.season;
        }

        t.seasons.push(newSeason);

        return t;
    }

    /**
     * Add a new row of stats to a team object.
     * 
     * A row contains stats for unique values of (season, playoffs). So new rows need to be added when a new season starts or when a team makes the playoffs.
     *
     * @memberOf core.team
     * @param {Object} t Team object.
     * @param {=boolean} playoffs Is this stats row for the playoffs or not? Default false.
     * @return {Object} Updated team object.
     */
    function addStatsRow(t, playoffs) {
        var key, newStats;

        playoffs = playoffs !== undefined ? playoffs : false;

        t.stats.push({
            season: g.season,
            playoffs: playoffs,
            gp: 0,
            min: 0,
            fg: 0,
            fga: 0,
            fgAtRim: 0,
            fgaAtRim: 0,
            fgLowPost: 0,
            fgaLowPost: 0,
            fgMidRange: 0,
            fgaMidRange: 0,
            tp: 0,
            tpa: 0,
            ft: 0,
            fta: 0,
            orb: 0,
            drb: 0,
            trb: 0,
            ast: 0,
            tov: 0,
            stl: 0,
            blk: 0,
            pf: 0,
            pts: 0,
            oppPts: 0
        });

        return t;
    }

    /**
     * Create a new team object.
     * 
     * @memberOf core.team
     * @param {Object} tm Team metadata object, likely from util.helpers.getTeams.
     * @return {Object} Team object to insert in the database.
     */
    function generate(tm) {
        var t;

        t = {
            tid: tm.tid,
            cid: tm.cid,
            did: tm.did,
            region: tm.region,
            name: tm.name,
            abbrev: tm.abbrev,
            stats: [],
            seasons: [],
            ticketPrice: helpers.round(25 + 25 * (30 - tm.popRank) / 29, 2),
            ticketPriceRank: tm.popRank,
            scoutingBudget: helpers.round(200 + 300 * (30 - tm.popRank) / 29) * 10,
            scoutingBudgetRank: tm.popRank,
            coachingBudget: helpers.round(200 + 300 * (30 - tm.popRank) / 29) * 10,
            coachingBudgetRank: tm.popRank,
            healthBudget: helpers.round(200 + 300 * (30 - tm.popRank) / 29) * 10,
            healthBudgetRank: tm.popRank,
            facilitiesBudget: helpers.round(200 + 300 * (30 - tm.popRank) / 29) * 10,
            facilitiesBudgetRank: tm.popRank,
            stadiumBudget: helpers.round(200 + 300 * (30 - tm.popRank) / 29) * 10,
            stadiumBudgetRank: tm.popRank
        };

        t = addSeasonRow(t);
        t = addStatsRow(t);

        t.seasons[0].pop = tm.pop;
        t.seasons[0].popRank = tm.popRank;

        return t;
    }

    return {
        addSeasonRow: addSeasonRow,
        addStatsRow: addStatsRow,
        generate: generate
    };
});