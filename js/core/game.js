function Game() {
}

Game.prototype.load = function(results, playoffs) {
    // Retrieve stats
    this.team = results['team'];
    this.playoffs = playoffs;
    this.id = results['gid'];
    this.home = [true, false];

    // What is the attendance of the game?
    r = g.dbex('SELECT won + lost, CASE won + lost WHEN 0 THEN 0 ELSE won / (won + lost) END FROM team_attributes WHERE season = :season AND (tid = :tid_home OR tid = :tid_away)', season=g.season, tid_home=this.team[0]['id'], tid_away=this.team[1]['id'])
    games_played, winp = r.fetchone()
    if (games_played < 5) {
        this.att = random.gauss(22000 + games_played * 1000, 1000);
    }
    else {
        this.att = random.gauss(winp * 36000, 1000);
    }
    if (this.att > 25000) {
        this.att = 25000;
    }
    else if (this.att < 10000) {
        this.att = 10000;
    }

    // Are the teams in the same conference/division?
    this.same_conference = false;
    this.same_division = false;
    cid = [-1, -1];
    did = [-1, -1];
    for (t=0; t<2; t++) {
        r = g.dbex('SELECT ld.cid, ta.did FROM team_attributes as ta, divisions as ld WHERE ta.tid = :tid AND ta.season = :season AND ta.did = ld.did', tid=this.team[t]['id'], season=g.season)
        row = r.fetchone()
        cid[t] = row[0];
        did[t] = row[1];
    }
    if (cid[0] == cid[1]) {
        this.same_conference = true;
    }
    if (did[0] == did[1]) {
        this.same_division = true;
    }
}

Game.prototype.writeStats = function() {
    // Record who the starters are
/*    for (t=0; t<2; t++) {
        r = g.dbex('SELECT pid FROM player_attributes WHERE tid = :tid ORDER BY roster_order ASC LIMIT 5', tid=this.team[t]['id'])
        for starter_id, in r.fetchall() {
            for (p=0; p<this.team[t]['player'].length; p++) {
                if (this.team[t]['player'][p]['id'] == starter_id) {
                    this.team[t]['player'][p]['stat']['gs'] = 1;
                }
            }
        }
    }*/

    // Player stats and team stats
    for (t=0; t<2; t++) {
        this.writeTeamStats(t);
        params = [];
        for (p=0; p<this.team[t]['player'].length; p++) {
            params.push({'pid': this.team[t]['player'][p]['id'], 'tid': this.team[t]['id'], 'gid': this.id, 'season': g.season, 'playoffs': this.playoffs, 'gs': this.team[t]['player'][p]['stat']['gs'], 'min': int(round(this.team[t]['player'][p]['stat']['min'])), 'fg': this.team[t]['player'][p]['stat']['fg'], 'fga': this.team[t]['player'][p]['stat']['fga'], 'tp': this.team[t]['player'][p]['stat']['tp'], 'tpa': this.team[t]['player'][p]['stat']['tpa'], 'ft': this.team[t]['player'][p]['stat']['ft'], 'fta': this.team[t]['player'][p]['stat']['fta'], 'orb': this.team[t]['player'][p]['stat']['orb'], 'drb': this.team[t]['player'][p]['stat']['drb'], 'ast': this.team[t]['player'][p]['stat']['ast'], 'tov': this.team[t]['player'][p]['stat']['tov'], 'stl': this.team[t]['player'][p]['stat']['stl'], 'blk': this.team[t]['player'][p]['stat']['blk'], 'pf': this.team[t]['player'][p]['stat']['pf'], 'pts': this.team[t]['player'][p]['stat']['pts']})
        query = 'INSERT INTO player_stats (pid, tid, gid, season, playoffs, gs, min, fg, fga, tp, tpa, ft, fta, orb, drb, ast, tov, stl, blk, pf, pts) VALUES(:pid, :tid, :gid, :season, :playoffs, :gs, :min, :fg, :fga, :tp, :tpa, :ft, :fta, :orb, :drb, :ast, :tov, :stl, :blk, :pf, :pts)'
        }
        g.dbexmany(query, params)
    }
}

Game.prototype.writeTeamStats = function(t) {
    if (t == 0) {
        t2 = 1;
    }
    else {
        t2 = 0;
    }
    if (this.team[t]['stat']['pts'] > this.team[t2]['stat']['pts']) {
        won = true;
        if (this.playoffs && t == 0) {
            g.dbex('UPDATE playoff_series SET won_home = won_home + 1 WHERE tid_home = :tid_home AND tid_away = :tid_away AND season = :season', tid_home=this.team[t]['id'], tid_away=this.team[t2]['id'], season=g.season)
        }
        else if (this.playoffs) {
            g.dbex('UPDATE playoff_series SET won_away = won_away + 1 WHERE tid_home = :tid_home AND tid_away = :tid_away AND season = :season', tid_home=this.team[t2]['id'], tid_away=this.team[t]['id'], season=g.season)
        }
    }
    else {
        won = false;
    }

    // Only pay player salaries for regular season games.
/*    if (!this.playoffs) {
        r = g.dbex('SELECT SUM(contract_amount) * 1000 / 82 FROM released_players_salaries WHERE tid = :tid', tid=this.team[t]['id'])
        cost_released, = r.fetchone()
        r = g.dbex('SELECT SUM(contract_amount) * 1000 / 82 FROM player_attributes WHERE tid = :tid', tid=this.team[t]['id'])
        cost, = r.fetchone()
        if (cost_released) {
            cost += cost_released;
        }
    }
    else {*/
        cost = 0
//    }
    g.dbex('UPDATE team_attributes SET cash = cash + :revenue - :cost WHERE season = :season AND tid = :tid', revenue=g.ticket_price * this.att, cost=cost, season=g.season, tid=this.team[t]['id'])

    query = 'INSERT INTO team_stats (tid, opp_tid, gid, season, playoffs, won, home, min, fg, fga, tp, tpa, ft, fta, orb, drb, ast, tov, stl, blk, pf, pts, opp_pts, att, cost) VALUES (:tid, :opp_tid, :gid, :season, :playoffs, :won, :home, :min, :fg, :fga, :tp, :tpa, :ft, :fta, :orb, :drb, :ast, :tov, :stl, :blk, :pf, :pts, :opp_pts, :att, :cost)'
    params = {'tid': this.team[t]['id'], 'opp_tid': this.team[t2]['id'], 'gid': this.id, 'season': g.season, 'playoffs': this.playoffs, 'won': won, 'home': this.home[t], 'min': int(round(this.team[t]['stat']['min'])), 'fg': this.team[t]['stat']['fg'], 'fga': this.team[t]['stat']['fga'], 'tp': this.team[t]['stat']['tp'], 'tpa': this.team[t]['stat']['tpa'], 'ft': this.team[t]['stat']['ft'], 'fta': this.team[t]['stat']['fta'], 'orb': this.team[t]['stat']['orb'], 'drb': this.team[t]['stat']['drb'], 'ast': this.team[t]['stat']['ast'], 'tov': this.team[t]['stat']['tov'], 'stl': this.team[t]['stat']['stl'], 'blk': this.team[t]['stat']['blk'], 'pf': this.team[t]['stat']['pf'], 'pts': this.team[t]['stat']['pts'], 'opp_pts': this.team[t2]['stat']['pts'], 'att': this.att, 'cost': cost}
    g.dbex(query, **params)

    if (won && !this.playoffs) {
        g.dbex('UPDATE team_attributes SET won = won + 1 WHERE tid = :tid AND season = :season', tid=this.team[t]['id'], season=g.season)
        if (this.same_division) {
            g.dbex('UPDATE team_attributes SET won_div = won_div + 1, won_conf = won_conf + 1 WHERE tid = :tid AND season = :season', tid=this.team[t]['id'], season=g.season)
        }
        else if (this.same_conference) {
            g.dbex('UPDATE team_attributes SET won_conf = won_conf + 1 WHERE tid = :tid AND season = :season', tid=this.team[t]['id'], season=g.season)
        }
    }
    else if (!this.playoffs) {
        g.dbex('UPDATE team_attributes SET lost = lost + 1 WHERE tid = :tid AND season = :season', tid=this.team[t]['id'], season=g.season)
        if (this.same_division) {
            g.dbex('UPDATE team_attributes SET lost_div = lost_div + 1, lost_conf = lost_conf + 1 WHERE tid = :tid AND season = :season', tid=this.team[t]['id'], season=g.season)
        }
        else if (this.same_conference) {
            g.dbex('UPDATE team_attributes SET lost_conf = lost_conf + 1 WHERE tid = :tid AND season = :season', tid=this.team[t]['id'], season=g.season)
        }
    }
}


var game = {
    /*Returns a dict containing the minimal information about a team needed to
    simulate a game.
    */
    team: function (tid) {
        t = {id: tid, defense: 0, pace: 0, stat: {}, player: []}

        dbl.transaction(["players"]).objectStore("players").index('tid').get(tid).onsuccess = function(event) { console.log(event.target.result) };
/*        r = g.dbex('SELECT pid FROM player_attributes WHERE tid = :tid ORDER BY roster_order ASC', tid=tid)
        for row in r.fetchall():
            t['player'].push(player(row[0]))*/

        // Number of players to factor into pace and defense rating calculation
        n_players = t['player'].length;
        if (n_players > 7) {
            n_players = 7;
        }

        // Would be better if these were scaled by average min played and end
//        t['pace'] = sum([t['player'][i]['composite_rating']['pace'] for i in xrange(n_players)]) / 7
//        t['defense'] = sum([t['player'][i]['composite_rating']['defense'] for i in xrange(n_players)]) / 7 // 0 to 0.5
t['pace'] = 100;
t['defense'] = 0.25;
        t['defense'] /= 4; // This gives the percentage pts subtracted from the other team's normal FG%


        t['stat'] = {min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0};

        return t;
    },


    /*Returns a dict containing the minimal information about a player needed
    to simulate a game.
    */
    player: function (pid) {
        p = {id: pid, ovr: 0, stat: {}, composite_rating: {}};

        r = g.dbex('SELECT ovr, hgt, stre, spd, jmp, endu, ins, dnk, ft, fg, tp, blk, stl, drb, pss, reb FROM player_ratings WHERE pid = :pid AND season = :season', pid=p['id'], season=g.season)
        rating = r.fetchone()

        p['ovr'] = rating['ovr'];

        p['composite_rating']['pace'] = _composite(90, 140, rating, ['spd', 'jmp', 'dnk', 'tp', 'stl', 'drb', 'pss'], undefined, false);
        p['composite_rating']['shot_ratio'] = _composite(0, 0.5, rating, ['ins', 'dnk', 'fg', 'tp']);
        p['composite_rating']['assist_ratio'] = _composite(0, 0.5, rating, ['drb', 'pss', 'spd']);
        p['composite_rating']['turnover_ratio'] = _composite(0, 0.5, rating, ['drb', 'pss', 'spd'], true);
        p['composite_rating']['field_goal_percentage'] = _composite(0.38, 0.68, rating, ['hgt', 'jmp', 'ins', 'dnk', 'fg', 'tp']);
        p['composite_rating']['free_throw_percentage'] = _composite(0.65, 0.9, rating, ['ft']);
        p['composite_rating']['three_pointer_percentage'] = _composite(0, 0.45, rating, ['tp']);
        p['composite_rating']['rebound_ratio'] = _composite(0, 0.5, rating, ['hgt', 'stre', 'jmp', 'reb']);
        p['composite_rating']['steal_ratio'] = _composite(0, 0.5, rating, ['spd', 'stl']);
        p['composite_rating']['block_ratio'] = _composite(0, 0.5, rating, ['hgt', 'jmp', 'blk']);
        p['composite_rating']['foul_ratio'] = _composite(0, 0.5, rating, ['spd'], true);
        p['composite_rating']['defense'] = _composite(0, 0.5, rating, ['stre', 'spd']);

        p['stat'] = {gs: 0, min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0, court_time: 0, bench_time: 0, energy: 1};

        return p;
    },

    _composite: function (minval, maxval, rating, components, inverse, rand) {
        inverse = typeof inverse !== "undefined" ? inverse : false;
        rand = typeof rand !== "undefined" ? rand : true;

        r = 0.0;
        rmax = 0.0;
        if (inverse) {
            sign = -1;
            add = -100;
        }
        else {
            sign = 1;
            add = 0;
        }
        for (var i=0; i<components.length; i++) {
            component = components[i];
            // Sigmoidal transformation
            y = (rating[component] - 70) / 10;
            rcomp = y / Math.sqrt(1 + Math.pow(y, 2));
            rcomp = (rcomp + 1) * 50;
    //        rcomp = rating[component]

            r = r + sign * (add + rcomp);
            rmax = rmax + sign * (add + 100);
        }
        // Scale from minval to maxval
        r = r / (100.0 * len(components));  // 0-1
    //    r = r / (rmax * len(components))  // 0-1
        r = r * (maxval - minval) + minval;  // Min-Max
        // Randomize: Mulitply by a random number from N(1,0.1)
        if (rand) {
            r = random.gauss(1, 0.1) * r;
        }
        return r;
    },

    /*Convenience function to save game stats.*/
    save_results: function (results, playoffs) {
//        r = g.dbex('SELECT in_progress_timestamp FROM schedule WHERE gid = :gid', gid=results['gid'])
//        in_progress_timestamp, = r.fetchone()
//        if (in_progress_timestamp > 0) {
            game = Game()
            game.load(results, playoffs)
            game.writeStats()
            g.dbex('DELETE FROM schedule WHERE gid = :gid', gid=results['gid'])
            console.log("Saved results for game " + results['gid']);
//        else {
//            console.log("Ignored stale results for game " + results['gid']);
//        }
    },

    /*Play num_days days worth of games. If start is true, then this is
    starting a new series of games. If not, then it's continuing a simulation.
    */
    play: function (num_days, start) {
        start = typeof start !== "undefined" ? start : false;

        teams = [];
        schedule = [];
        playoffs_continue = false;
        url = null;

        // If this is a request to start a new simulation... are we allowed to do
        // that? If so, set the lock and update the play menu
        if (start) {
            if (lock.can_start_games()) {
                lock.set_games_in_progress(true);
                playMenu.refreshOptions();
            }
            else {
                // If not allowed to start games, don't
                return {teams: teams, schedule: schedule, playoffs_continue: playoffs_continue, url: url};
            }
        }

        if (num_days > 0) {
/*            // If the user wants to stop the simulation, then stop the simulation
            r = g.dbex('SELECT stop_games FROM game_attributes WHERE season = :season', season=g.season)
            stop_games, = r.fetchone()
            if (stop_games) {
                g.dbex('UPDATE game_attributes SET stop_games = false WHERE season = :season', season=g.season)
            }*/

            // If we didn't just stop games, let's play
            // Or, if we are starting games (and already passed the lock above),
            // continue even if stop_games was just seen
//            if (start || !stop_games) {
                // Check if it's the playoffs and do some special stuff if it is or isn't
                if (g.phase == c.PHASE_PLAYOFFS) {
                    num_active_teams = season.new_schedule_playoffs_day();

                    // If season.new_schedule_playoffs_day didn't move the phase to 4, then
                    // the playoffs are still happening.
                    if (g.phase == c.PHASE_PLAYOFFS) {
                        playoffs_continue = true;
                    }
                }
                else {
                    num_active_teams = g.num_teams;

                    // Decrease free agent demands and let AI teams sign them
//                    free_agents_decrease_demands();
//                    free_agents_auto_sign();
                }

                playMenu.setStatus("Playing games (" + num_days + " days remaining)...")
                // Create schedule and team lists for today, to be sent to the client
//                schedule = season.get_schedule(num_active_teams / 2);
schedule = {gid: 6235, home_tid: 1, away_tid: 0};
                tids_today = [];
                for (var j=0; j<schedule.length; j++) {
                    game = schedule[j];
                    g.dbex('UPDATE schedule SET in_progress_timestamp = :in_progress_timestamp WHERE gid = :gid', in_progress_timestamp=int(time.time()), gid=game['gid'])
                    tids_today.push(game['home_tid']);
                    tids_today.push(game['away_tid']);
        //                tids_today = list(set(tids_today))  // Unique list
                }
                teams = [];
                for (var tid=0; tid<30; tid++) {
                    // Only send team data for today's active teams
                    if (tids_today.indexOf(tid) >= 0) {
                        teams.push(team(tid))
                    }
                    else {
                        teams.push({'id': tid})
                    }
                }
//            }
        }

        // If this is the last day, update play menu
        if (num_days == 0 || (schedule.length == 0 && !playoffs_continue)) {
            playMenu.setStatus('Idle');
            lock.set_games_in_progress(false);
            playMenu.refreshOptions();
            // Check to see if the season is over
            r = g.dbex('SELECT gid FROM schedule LIMIT 1')
            if (r.rowcount == 0 && g.phase < c.PHASE_PLAYOFFS) {
                season.new_phase(c.PHASE_PLAYOFFS);  // Start playoffs
                url = "/l/" + g.lid + "/history";
            }
        }

        return {teams: teams, schedule: schedule, playoffs_continue: playoffs_continue, url: url};
    }
}
