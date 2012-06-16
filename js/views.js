define(["bbgm", "db", "core/game", "core/league", "core/season", "util/helpers", "util/playMenu"], function(bbgm, db, game, league, season, helpers, playMenu) {
    function beforeLeague(req, cb) {
        g.lid = parseInt(req.params.lid, 10);
        helpers.loadGameAttributes();

        // Make sure league exists

        // Connect to league database
        request = db.connect_league(g.lid);
        request.onsuccess = function (event) {
            g.dbl = request.result;
            g.dbl.onerror = function (event) {
                console.log("League database error: " + event.target.errorCode);
            };

            cb();
        }

        // Make sure league template FOR THE CURRENT LEAGUE is showing
        var leagueMenu = document.getElementById("league_menu");
        if (leagueMenu === null || leagueMenu.dataset["lid"] != g.lid) {
            data = {};
            var template = Handlebars.templates['league_layout'];
            data["content"] = template({g: g});
            bbgm.ajaxUpdate(data);

            // Update play menu
            playMenu.setStatus()
            playMenu.setPhase()
            playMenu.refreshOptions()
        }
    }

    function schedule(req) {
        beforeLeague(req, function() {
            var data = {"title": "Schedule - League " + g.lid};
            var url = "/l/" + g.lid;

            season.getSchedule(0, function (schedule_) {
                games = [];
                for (var i=0; i<schedule_.length; i++) {
                    game = schedule_[i];
                    tids = [game.homeTid, game.awayTid]
                    if (tids.indexOf(g.userTid) >= 0) {
                        var team = {tid: 0, abbrev: 'a', region: 'a', name: 'a'};
                        row = {teams: [team, team], vsat: 'at'};
                        games.push(row);
                    }
                }

                var template = Handlebars.templates["schedule"];
                data["league_content"] = template({games: games});
                bbgm.ajaxUpdate(data, url);
            });

        });
    }

    return {
        init_db: function (req) {
            var data = {"title": "Initialize Database"};
            var url = "/init_db";

            data["content"] = "Resetting databases..."

            // Delete any current league databases
            console.log("Delete any current league databases...");
            if (g.dbl !== undefined) {
                g.dbl.close();
            }
            db.getAll(g.dbm, "leagues", function (leagues) {
                for (var i=0; i<leagues.length; i++) {
                    g.indexedDB.deleteDatabase("league" + leagues[i]["lid"]);
                }
            });

            // Delete any current meta database
            console.log("Delete any current meta database...");
            g.dbm.close();
            g.indexedDB.deleteDatabase("meta");

            // Create new meta database
            console.log("Create new meta database...");
            request = db.connect_meta();
            request.onsuccess = function(event) {
                g.dbm = request.result;
                g.dbm.onerror = function(event) {
                    console.log("Meta database error: " + event.target.errorCode);
                };
            };

            console.log("Done!");

            bbgm.ajaxUpdate(data, url);
        },

        dashboard: function (req) {
            var data = {"title": "Dashboard"};
            var url = "/";

            db.getAll(g.dbm, "leagues", function (leagues) {
                var template = Handlebars.templates['dashboard'];
                data["content"] = template({leagues: leagues});

                bbgm.ajaxUpdate(data, url);
            });
        },

        new_league: function (req) {
            var data = {"title": "Create New League"};
            var url = "/new_league";

            if (req.method === "get") {
                db.getAll(g.dbm, "teams", function (teams) {
                    var template = Handlebars.templates['new_league'];
                    data["content"] = template({teams: teams});

                    bbgm.ajaxUpdate(data, url);
                });
            }
            else if (req.method === "post") {
                tid = parseInt(req.params["tid"], 10);
                if (tid >= 0 && tid <= 29) {
                    league.new(tid);
                }
            }
        },

        delete_league: function (req) {
            lid = parseInt(req.params['lid'], 10);
            league.delete(lid)
            req.redirect('/');
        },

        league_dashboard: function (req) {
            beforeLeague(req, function() {
                var data = {"title": "Dashboard - League " + g.lid};
                var url = "/l/" + g.lid;

                var template = Handlebars.templates['league_dashboard'];
                data["league_content"] = template({g: g});

                bbgm.ajaxUpdate(data, url);
            });
        },

        game_log: function(req) {
            beforeLeague(req, function() {
                var viewAbbrev = typeof req.params.viewAbbrev !== "undefined" ? req.params.viewAbbrev : undefined;
                [viewTid, viewAbbrev] = helpers.validateAbbrev(viewAbbrev);
                var viewSeason = typeof req.params.viewSeason !== "undefined" ? req.params.viewSeason : undefined;
                viewSeason = helpers.validateSeason(viewSeason);

                var data = {"title": "Game Log - League " + g.lid};
                var url = "/l/" + g.lid + "/game_log";

                var seasons = [{season: 2012, selected: true}, {season: 2013, selected: false}, {season: 2014, selected: false}];
                g.dbl.transaction(["teams"]).objectStore("teams").index("season").getAll(viewSeason).onsuccess = function(event) {
                    var teamsAll = event.target.result;
                    var teams = [];
                    for (var i=0; i<teamsAll.length; i++) {
                        var team = teamsAll[i];

                        if (team.tid == viewTid) {
                            var selected = true;
                        }
                        else {
                            var selected = false;
                        }

                        teams.push({tid: team.tid, abbrev: team.abbrev, region: team.region, name: team.name, selected: selected});
                    }
                    var template = Handlebars.templates['game_log'];
                    data["league_content"] = template({g: g, teams: teams, seasons: seasons});

                    bbgm.ajaxUpdate(data, url);
                };

            });
        },

        schedule: schedule
    };
});
