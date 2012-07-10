define(["util/random"], function (random) {
    "use strict";

    function Player() {
    }

    /**
     * Load existing player's current ratings and attributes from the database.
     */
    Player.prototype.load = function (playerStore, pid, cb) {
        playerStore.get(pid).onsuccess = function (event) {
            this.p = event.target.result;
            cb(); // What goes here?
        };
    };

    /**
     * Develop (increase/decrease) player's ratings. This operates on whatever the last row of p.ratings is.
     * @param {number} years Number of years to develop (default 1).
     * @param {generate} generate Generating a new player? (default false). If true, then
     *     the player's age is also updated based on years.
     */
    function develop(p, years, generate) {
        var age, i, increase, j, key, ovrTemp, plusMinus, pot, r, ratingKeys;

        years = typeof years !== "undefined" ? years : 1;
        generate = typeof generate !== "undefined" ? generate : false;

        r = p.ratings.length - 1;

        // Make sure age is always defined
        if (g.hasOwnProperty("season")) {
            age = g.season - p.bornYear;
        } else {
            age = g.startingSeason - p.bornYear;
        }

        for (i = 0; i < years; i++) {
            age += 1;
            pot = random.gauss(p.ratings[r].pot, 5);
            ovrTemp = p.ratings[r].ovr;

            ratingKeys = ['stre', 'spd', 'jmp', 'endu', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb'];
            for (j = 0; j < ratingKeys.length; j++) {
                key = ratingKeys[j];
                plusMinus = 28 - age;
                if (plusMinus > 0) {
                    if (pot > ovrTemp) {
                        // Cap potential growth
                        if (pot - ovrTemp < 20) {
                            plusMinus *= (pot - ovrTemp) / 20.0 + 0.5;
                        } else {
                            plusMinus *= 1.5;
                        }
                    } else {
                        plusMinus *= 0.5;
                    }
                } else {
                    plusMinus *= 30.0 / pot;
                }
                increase = random.gauss(1, 2) * plusMinus;
                //increase = plusMinus
                p.ratings[r][key] = limitRating(p.ratings[r][key] + increase);
            }

            // Update overall and potential
            p.ratings[r].ovr = ovr(p.ratings[r]);
            p.ratings[r].pot += -2 + parseInt(random.gauss(0, 2), 10);
            if (p.ratings[r].ovr > p.ratings[r].pot || age > 28) {
                p.ratings[r].pot = p.ratings[r].ovr;
            }
        }

        if (generate) {
            if (g.hasOwnProperty("season")) {
                age = g.season - p.bornYear + years;
                p.bornYear = g.season - age;
            } else {
                age = g.startingSeason - p.bornYear + years;
                p.bornYear = g.startingSeason - age;
            }
        }

        return p;
    }

    /**
     * Add or subtract amount from all current ratings. Then, update the player's contract appropriately
     * @param {number} amount Number to be added to each rating (can be negative).
     * @param {boolean} randomizeExp Should the number of years on the player's contract be randomized?.
     */
    function bonus(p, amount, randomizeExp) {
        var c, i, key, r, ratingKeys;

        r = p.ratings.length - 1;

        ratingKeys = ['stre', 'spd', 'jmp', 'endu', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb', 'pot'];
        for (i = 0; i < ratingKeys.length; i++) {
            key = ratingKeys[i];
            p.ratings[r][key] = limitRating(p.ratings[r][key] + amount);
        }

        // Update overall and potential
        p.ratings[r].ovr = ovr(p.ratings[r]);
        if (p.ratings[r].ovr > p.ratings[r].pot) {
            p.ratings[r].pot = p.ratings[r].ovr;
        }

        // Update contract based on development
        c = contract(p.ratings[r], randomizeExp);
        p.contractAmount = c.amount;
        p.contractExp = c.exp;

        return p;
    }

    function limitRating(rating) {
        if (rating > 100) {
            return 100;
        }
        if (rating < 0) {
            return 0;
        }
        return parseInt(rating, 10);
    }

    /**
     * Calculates the overall rating by averaging together all the other ratings.
     * @return {number} Overall rating.
     */
    function ovr(ratings) {
        return parseInt((ratings.hgt + ratings.stre + ratings.spd + ratings.jmp + ratings.endu + ratings.ins + ratings.dnk + ratings.ft + ratings.fg + ratings.tp + ratings.blk + ratings.stl + ratings.drb + ratings.pss + ratings.reb) / 15, 10);
    }

    function contract(ratings, randomizeExp) {
        var amount, expiration, maxAmount, minAmount, potentialDifference, years;

        randomizeExp = typeof randomizeExp !== "undefined" ? randomizeExp : false;

        // Limits on yearly contract amount, in $1000's
        minAmount = 500;
        maxAmount = 20000;

        // Scale amount from 500k to 15mil, proportional to (ovr*2 + pot)*0.5 120-210
        amount = ((2.0 * ratings.ovr + ratings.pot) * 0.85 - 120) / (210 - 120);  // Scale from 0 to 1 (approx)
        amount = amount * (maxAmount - minAmount) + minAmount;  // Scale from 500k to 15mil
        amount *= random.gauss(1, 0.1);  // Randomize

        // Expiration
        // Players with high potentials want short contracts
        potentialDifference = Math.round((ratings.pot - ratings.ovr) / 4.0);
        years = 5 - potentialDifference;
        if (years < 2) {
            years = 2;
        }
        // Bad players can only ask for short deals
        if (ratings.pot < 40) {
            years = 1;
        } else if (ratings.pot < 50) {
            years = 2;
        } else if (ratings.pot < 60) {
            years = 3;
        }

        // Randomize expiration for contracts generated at beginning of new game
        if (randomizeExp) {
            years = random.randInt(1, years);
        }

        if (g.hasOwnProperty("season")) {
            expiration = g.season + years - 1;
        } else {
            expiration = g.startingSeason + years - 1;
        }
        if (amount < minAmount) {
            amount = minAmount;
        } else if (amount > maxAmount) {
            amount = maxAmount;
        } else {
            amount = 50 * Math.round(amount / 50);  // Make it a multiple of 50k
        }

        return {amount: amount, exp: expiration};
    }

    /**
     * Adds player to the free agents list.
     * 
     * This should be THE ONLY way that players are added to the free agents
     * list, because this will also calculate their demanded contract. But
     * currently, the free agents generated at the beginning of the game don't
     * use this function.
     */
/*    Player.prototype.addToFreeAgents = function (phase) {
        var contract, expiration;

        phase = typeof phase !== "undefined" ? phase : g.phase;

        // Player's desired contract
        contract = this.contract();

        // During regular season, or before season starts, allow contracts for
        // just this year.
        if (g.phase > c.PHASE_AFTER_TRADE_DEADLINE) {
            expiration += 1;
        }

//        g.dbex('UPDATE player_attributes SET tid = :tid, contractAmount = :contractAmount, contractExp = :contractExp, free_agent_times_asked = 0 WHERE pid = :pid', tid=c.PLAYER_FREE_AGENT, contractAmount=contract.amount, contractExp=contract.exp, pid=this.id)
    };*/

    /**
     * Release player.
     * 
     * This keeps track of what the player's current team owes him, and then
     * calls this.addToFreeAgents.
     */
/*    Player.prototype.release = function () {
        // Keep track of player salary even when he's off the team
        r = g.dbex('SELECT contractAmount, contractExp, tid FROM player_attributes WHERE pid = :pid', pid=this.id)
        contractAmount, contractExp, tid = r.fetchone()
        g.dbex('INSERT INTO released_players_salaries (pid, tid, contractAmount, contractExp) VALUES (:pid, :tid, :contractAmount, :contractExp)', pid=this.id, tid=tid, contractAmount=contractAmount, contractExp=contractExp)

        this.addToFreeAgents();
    };*/

    Player.prototype.generate = function (tid, age, profile, baseRating, pot, draftYear) {
        var c, maxHgt, minHgt, maxWeight, minWeight, nationality;

        this.p = {}; // Will be saved to database
        this.p.tid = tid;
        this.p.statsTids = [];
        this.p.stats = [];
        if (tid >= 0) {
            this.p.statsTids.push(tid);
            this.p.stats.push({season: g.startingSeason, tid: this.p.tid, playoffs: false, gp: 0, gs: 0, min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, trb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0});
        }
        this.p.rosterOrder = 666;  // Will be set later
        this.p.ratings = [];
        this.p.ratings.push(generateRatings(profile, baseRating, pot));

        minHgt = 69;  // 5'9"
        maxHgt = 89;  // 7'5"
        minWeight = 150;
        maxWeight = 290;

        this.p.pos = pos(this.p.ratings[0]);  // Position (PG, SG, SF, PF, C, G, GF, FC)
        this.p.hgt = parseInt(random.gauss(1, 0.02) * (this.p.ratings[0].hgt * (maxHgt - minHgt) / 100 + minHgt), 10);  // Height in inches (from minHgt to maxHgt)
        this.p.weight = parseInt(random.gauss(1, 0.02) * ((this.p.ratings[0].hgt + 0.5 * this.p.ratings[0].stre) * (maxWeight - minWeight) / 150 + minWeight), 10);  // Weight in pounds (from minWeight to maxWeight)
        if (g.hasOwnProperty('season')) {
            this.p.bornYear = g.season - age;
        } else {
            this.p.bornYear = g.startingSeason - age;
        }

        // Randomly choose nationality  
        nationality = 'USA';

        this.p.bornLoc = nationality;
        this.p.name = name(nationality);

        this.p.college = 0;
        this.p.draftRound = 0;
        this.p.draftPick = 0;
        this.p.draftTid = 0;
        this.p.draftYear = draftYear;
        c = contract(this.p.ratings[0]);
        this.p.contractAmount = c.amount;
        this.p.contractExp = c.exp;

        this.p.freeAgentTimesAsked = 0;
        this.p.yearsFreeAgent = 0;


        this.p.draftPot = pot;
        this.p.draftOvr = this.p.ratings[0].ovr;
    };

    function generateRatings(profile, baseRating, pot) {
        var i, key, profileId, profiles, ratingKeys, ratings, rawRating, rawRatings, sigmas;

        if (profile === 'Point') {
            profileId = 1;
        } else if (profile === 'Wing') {
            profileId = 2;
        } else if (profile === 'Big') {
            profileId = 3;
        } else {
            profileId = 0;
        }

        // Each row should sum to ~150
        profiles = [[10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10],  // Base 
                    [-30, -10, 40,  15,  0,   0,   0,   10,  15,  0,   0,   20,  40,  40,  0],   // Point Guard
                    [10,  10,  15,  15,  0,   0,   25,  15,  15,  5,   0,   10,  15,  0,   15],  // Wing
                    [40,  30,  -10, -10, 10,  30,  30,  0,   -10, -20, 30,  0,   -10, -10, 30]];  // Big
        sigmas = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        baseRating = random.gauss(baseRating, 5);

        rawRatings = [];
        for (i = 0; i < sigmas.length; i++) {
            rawRating = profiles[profileId][i] + baseRating;
            rawRatings[i] = limitRating(random.gauss(rawRating, sigmas[i]));
        }

        ratings = {};
        ratingKeys = ['hgt', 'stre', 'spd', 'jmp', 'endu', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb'];
        for (i = 0; i < ratingKeys.length; i++) {
            key = ratingKeys[i];
            ratings[key] = rawRatings[i];
        }

        ratings.season = g.startingSeason;
        ratings.ovr = ovr(ratings);
        ratings.pot = pot;

        return ratings;
    }

    function name(nationality) {
        var fn, fnRand, i, ln, lnRand;

        // First name
        fnRand = random.uniform(0, 90.04);
        for (i = 0; i < g.firstNames.length; i++) {
            //if row[4].upper() == nationality.upper():
            if (g.firstNames[i][2] >= fnRand) {
                break;
            }
        }
        fn = g.firstNames[i][0];
        fn = fn.charAt(0).toUpperCase() + fn.substring(1).toLowerCase();


        // Last name
        lnRand = random.uniform(0, 77.48);
        for (i = 0; i < g.lastNames.length; i++) {
            //if row[4].upper() == nationality.upper():
            if (g.lastNames[i][2] >= lnRand) {
                break;
            }
        }
        ln = g.lastNames[i][0];
        ln = ln.charAt(0).toUpperCase() + ln.substring(1).toLowerCase();
        // McWhatever
        if (ln.substring(0, 2) === 'Mc') {
            ln = ln.substring(0, 2) + ln.charAt(2).toUpperCase() + ln.substring(3);
        }

        return fn + " " + ln;
    }

    /**
     * Assign a position (PG, SG, SF, PF, C, G, GF, FC) based on ratings.
     */
    function pos(ratings) {
        var c, g, pf, pg, position, sf, sg;

        g = false;
        pg = false;
        sg = false;
        sf = false;
        pf = false;
        c = false;

        // Default position
        if (ratings.drb >= 50) {
            position = 'GF';
        } else {
            position = 'F';
        }

        if (ratings.hgt <= 30 || ratings.spd >= 85) {
            g = true;
            if ((ratings.pss + ratings.drb) >= 100) {
                pg = true;
            }
            if (ratings.hgt >= 30) {
                sg = true;
            }
        }
        if (ratings.hgt >= 50 && ratings.hgt <= 65 && ratings.spd >= 40) {
            sf = true;
        }
        if (ratings.hgt >= 70) {
            pf = true;
        }
        if ((ratings.hgt + ratings.stre) >= 130) {
            c = true;
        }

        if (pg && !sg && !sf && !pf && !c) {
            position = 'PG';
        } else if (!pg && (g || sg) && !sf && !pf && !c) {
            position = 'SG';
        } else if (!pg && !sg && sf && !pf && !c) {
            position = 'SF';
        } else if (!pg && !sg && !sf && pf && !c) {
            position = 'PF';
        } else if (!pg && !sg && !sf && !pf && c) {
            position = 'C';
        }

        // Multiple poss
        if ((pf || sf) && g) {
            position = 'GF';
        } else if (c && (pf || sf)) {
            position = 'FC';
        } else if (pg && sg) {
            position = 'G';
        }
        if (position === 'F' && ratings.drb <= 20) {
            position = 'PF';
        }

        return position;
    }

    return {
        bonus: bonus,
        contract: contract,
        develop: develop,
        Player: Player
    };
});
/* THSES SHOULDN'T BE NEEDED, IDEALLY
    def get_attributes(this):
        d = this.attribute
        d.pid = this.id
        return d

    def get_ratings(this):
        d = this.rating
        if not hasattr(g, 'season'):
            d.season = g.startingSeason
        else {
            d.season = g.season
        d.ovr = this.ovr()
        d.pid = this.id
        return d*/