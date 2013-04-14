define(["api", "db", "globals", "ui", "core/contractNegotiation", "core/draft", "core/finances", "core/freeAgents", "core/game", "core/league", "core/season", "data/names", "lib/boxPlot", "lib/davis", "lib/handlebars.runtime", "lib/jquery", "lib/underscore", "util/helpers", "util/viewHelpers", "views/gameLog", "views/negotiation", "views/playerStats", "views/roster", "views/teamStats", "views/trade"], function (api, db, g, ui, contractNegotiation, draft, finances, freeAgents, game, league, season, names, boxPlot, Davis, Handlebars, $, _, helpers, viewHelpers, gameLog, negotiation, playerStats, roster, teamStats, trade) {
    "use strict";

    function initDb(req) {
        var key;

        viewHelpers.beforeNonLeague();

        // localStorage, which is just use for table sorting currently
        for (key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                localStorage.removeItem(key);
            }
        }

        // Delete any current league databases
        console.log("Deleting any current league databases...");
        g.dbm.transaction("leagues").objectStore("leagues").getAll().onsuccess = function (event) {
            var data, done, i, leagues, request;

            leagues = event.target.result;

            if (leagues.length === 0) {
                console.log('No leagues found.');
                Davis.location.assign(new Davis.Request("/"));
            }

            done = 0;
            for (i = 0; i < leagues.length; i++) {
                league.remove(i, function () {
                    done += 1;
                    if (done === leagues.length) {
                        // Delete any current meta database
                        console.log("Deleting any current meta database...");
                        g.dbm.close();
                        request = indexedDB.deleteDatabase("meta");
                        request.onsuccess = function (event) {
                            // Create new meta database
                            console.log("Creating new meta database...");
                            db.connectMeta(function () {
                                console.log("Done!");
                                Davis.location.assign(new Davis.Request("/"));
                            });
                        };
                    }
                });
            }
        };
    }

    function dashboard(req) {
        viewHelpers.beforeNonLeague();

        g.dbm.transaction("leagues").objectStore("leagues").getAll().onsuccess = function (event) {
            var data, i, leagues, teams;

            leagues = event.target.result;
            teams = helpers.getTeams();

            for (i = 0; i < leagues.length; i++) {
                leagues[i].region = teams[leagues[i].tid].region;
                leagues[i].teamName = teams[leagues[i].tid].name;
                delete leagues[i].tid;
            }

            data = {
                container: "content",
                template: "dashboard",
                title: "Dashboard",
                vars: {leagues: leagues}
            };
            ui.update(data);
        };
    }

    function newLeague(req) {
        var data, name, tid, teams;

        viewHelpers.beforeNonLeague();

        if (req.method === "get") {
            g.dbm.transaction("leagues").objectStore("leagues").openCursor(null, "prev").onsuccess = function (event) {
                var cursor, data, l, newLid, teams;

                cursor = event.target.result;
                if (cursor) {
                    newLid = cursor.value.lid + 1;
                } else {
                    newLid = 1;
                }

                teams = helpers.getTeams();

                data = {
                    container: "content",
                    template: "newLeague",
                    title: "Create New League",
                    vars: {teams: teams, name: "League " + newLid}
                };
                ui.update(data, function () {
                    var select, updatePopText;

                    updatePopText = function () {
                        var difficulty, team;

                        team = teams[select.val()];

                        if (team.popRank <= 5) {
                            difficulty = "very easy";
                        } else if (team.popRank <= 13) {
                            difficulty = "easy";
                        } else if (team.popRank <= 16) {
                            difficulty = "normal";
                        } else if (team.popRank <= 23) {
                            difficulty = "hard";
                        } else {
                            difficulty = "very hard";
                        }

                        $("#pop-text").html("Region population: " + team.pop + " million, #" + team.popRank + " leaguewide<br>Difficulty: " + difficulty);
                    };

                    select = $("select[name='tid']");
                    select.change(updatePopText);
                    select.keyup(updatePopText);

                    updatePopText();
                });
            };
        } else if (req.method === "post") {
            $("#create-new-league").attr("disabled", "disabled");  // Disable button
            tid = Math.floor(req.params.tid);
            if (tid >= 0 && tid <= 29) {
                league.create(req.params.name, tid, req.params.players, function (lid) {
                    Davis.location.assign(new Davis.Request("/l/" + lid));
                });
            }
        }
    }

    function deleteLeague(req) {
        var lid;

        lid = parseInt(req.params.lid, 10);

        if (!req.params.confirm) {
            db.connectLeague(lid, function () {
                var transaction;

                transaction = g.dbl.transaction(["games", "players", "teams"]);
                transaction.objectStore("games").count().onsuccess = function (event) {
                    var numGames;

                    numGames = event.target.result;

                    transaction.objectStore("teams").get(0).onsuccess = function (event) {
                        var numSeasons;

                        numSeasons = event.target.result.seasons.length;

                        transaction.objectStore("players").count().onsuccess = function (event) {
                            var data, numPlayers;

                            numPlayers = event.target.result;

                            g.lid = lid;  // Injected into the template by ui.update
                            data = {
                                container: "content",
                                template: "deleteLeague",
                                title: "Dashboard",
                                vars: {numGames: numGames, numPlayers: numPlayers, numSeasons: numSeasons}
                            };
                            ui.update(data, req.raw.cb);
                        };
                    };
                };
            });
        } else {
            league.remove(lid, function () {
                req.redirect("/");
            });
        }
    }

    function manual(req) {
        var data, page;

        viewHelpers.beforeNonLeague();

        page = req.params.page !== undefined ? req.params.page : "overview";

        if (page === "overview") {
            data = {
                container: "content",
                template: "manualOverview",
                title: "Manual",
                vars: {}
            };
        }
        ui.update(data, req.raw.cb);
    }

    function leagueDashboard(req) {
        viewHelpers.beforeLeague(req, function () {
            var transaction, vars;

            vars = {};
            vars.season = g.season;
            vars.salaryCap = g.salaryCap / 1000;  // [millions of dollars]

            transaction = g.dbl.transaction(["games", "players", "playoffSeries", "releasedPlayers", "schedule", "teams"]);

            transaction.objectStore("teams").get(g.userTid).onsuccess = function (event) {
                var extraText, i, userTeam, userTeamSeason;

                userTeam = event.target.result;
                userTeamSeason = _.last(userTeam.seasons);

                vars.region = userTeam.region;
                vars.name = userTeam.name;
                vars.abbrev = userTeam.abbrev;
                vars.won = userTeamSeason.won;
                vars.lost = userTeamSeason.lost;
                vars.cash = userTeamSeason.cash / 1000;  // [millions of dollars]

                vars.recentHistory = [];
                // 3 most recent years
                for (i = userTeam.seasons.length - 2; i > userTeam.seasons.length - 5 && i >= 0; i--) {
                    extraText = "";
                    if (userTeam.seasons[i].playoffRoundsWon === 4) {
                        extraText = "league champs";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 3) {
                        extraText = "conference champs";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 2) {
                        extraText = "made conference finals";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 1) {
                        extraText = "made second round";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 0) {
                        extraText = "made playoffs";
                    }

                    vars.recentHistory.push({
                        season: userTeam.seasons[i].season,
                        won: userTeam.seasons[i].won,
                        lost: userTeam.seasons[i].lost,
                        extraText: extraText
                    });
                }

                db.getPayroll(transaction, g.userTid, function (payroll) {
                    var attributes, seasonAttributes, stats;

                    vars.payroll = payroll / 1000;  // [millions of dollars]

                    attributes = ["tid", "cid"];
                    stats = ["pts", "oppPts", "trb", "ast"];  // This is also used later to find ranks for these team stats
                    seasonAttributes = ["won", "lost", "winp", "streakLong", "att", "revenue", "profit"];
                    db.getTeams(transaction, g.season, attributes, stats, seasonAttributes, {sortBy: "winp"}, function (teams) {
                        var i, j, ranks;

                        vars.rank = 1;
                        for (i = 0; i < teams.length; i++) {
                            if (teams[i].cid === userTeam.cid) {
                                if (teams[i].tid === g.userTid) {
                                    vars.pts = teams[i].pts;
                                    vars.oppPts = teams[i].oppPts;
                                    vars.trb = teams[i].trb;
                                    vars.ast = teams[i].ast;

                                    vars.streakLong = teams[i].streakLong;
                                    vars.att = teams[i].att;
                                    vars.revenue = teams[i].revenue;
                                    vars.profit = teams[i].profit;
                                    break;
                                } else {
                                    vars.rank += 1;
                                }
                            }
                        }

                        for (i = 0; i < stats.length; i++) {
                            teams.sort(function (a, b) { return b[stats[i]] - a[stats[i]]; });
                            for (j = 0; j < teams.length; j++) {
                                if (teams[j].tid === g.userTid) {
                                    vars[stats[i] + "Rank"] = j + 1;
                                    break;
                                }
                            }
                        }
                        vars.oppPtsRank = 31 - vars.oppPtsRank;

                        transaction.objectStore("games").index("season").getAll(g.season).onsuccess = function (event) {
                            var games, i, overtime;

                            games = event.target.result;
                            games.reverse();  // Look through most recent games first

                            vars.recentGames = [];
                            for (i = 0; i < games.length; i++) {
                                if (games[i].overtimes === 1) {
                                    overtime = " (OT)";
                                } else if (games[i].overtimes > 1) {
                                    overtime = " (" + games[i].overtimes + "OT)";
                                } else {
                                    overtime = "";
                                }

                                // Check tid
                                if (games[i].teams[0].tid === g.userTid) {
                                    vars.recentGames.push({
                                        gid: games[i].gid,
                                        home: true,
                                        pts: games[i].teams[0].pts,
                                        oppPts: games[i].teams[1].pts,
                                        oppAbbrev: helpers.getAbbrev(games[i].teams[1].tid),
                                        won: games[i].teams[0].pts > games[i].teams[1].pts,
                                        overtime: overtime
                                    });
                                } else if (games[i].teams[1].tid === g.userTid) {
                                    vars.recentGames.push({
                                        gid: games[i].gid,
                                        home: false,
                                        pts: games[i].teams[1].pts,
                                        oppPts: games[i].teams[0].pts,
                                        oppAbbrev: helpers.getAbbrev(games[i].teams[0].tid),
                                        won: games[i].teams[1].pts > games[i].teams[0].pts,
                                        overtime: overtime
                                    });
                                }

                                if (vars.recentGames.length === 3) {
                                    break;
                                }
                            }

                            season.getSchedule(transaction, 0, function (schedule) {
                                var i;

                                vars.nextGameAbbrev = "";
                                vars.nextGameHome = false;
                                for (i = 0; i < schedule.length; i++) {
                                    if (schedule[i].homeTid === g.userTid) {
                                        vars.nextGameAbbrev = schedule[i].awayAbbrev;
                                        vars.nextGameHome = true;
                                        break;
                                    } else if (schedule[i].awayTid === g.userTid) {
                                        vars.nextGameAbbrev = schedule[i].homeAbbrev;
                                        break;
                                    }
                                }

                                g.dbl.transaction(["players"]).objectStore("players").index("tid").getAll(IDBKeyRange.lowerBound(g.PLAYER.RETIRED, true)).onsuccess = function (event) {
                                    var attributes, i, freeAgents, leagueLeaders, players, ratings, stats, userPlayers;

                                    attributes = ["pid", "name", "abbrev", "tid", "age", "contract", "rosterOrder"];
                                    ratings = ["ovr", "pot"];
                                    stats = ["pts", "trb", "ast"];  // This is also used later to find team/league leaders for these player stats
                                    players = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});

                                    // League leaders
                                    vars.leagueLeaders = {};
                                    for (i = 0; i < stats.length; i++) {
                                        players.sort(function (a, b) { return b.stats[stats[i]] - a.stats[stats[i]]; });
                                        vars.leagueLeaders[stats[i]] = {
                                            pid: players[0].pid,
                                            name: players[0].name,
                                            abbrev: players[0].abbrev,
                                            stat: players[0].stats[stats[i]]
                                        };
                                    }

                                    // Team leaders
                                    userPlayers = _.filter(players, function (p) { return p.tid === g.userTid; });
                                    vars.teamLeaders = {};
                                    for (i = 0; i < stats.length; i++) {
                                        userPlayers.sort(function (a, b) { return b.stats[stats[i]] - a.stats[stats[i]]; });
                                        vars.teamLeaders[stats[i]] = {
                                            pid: userPlayers[0].pid,
                                            name: userPlayers[0].name,
                                            stat: userPlayers[0].stats[stats[i]]
                                        };
                                    }

                                    // Expiring contracts
                                    userPlayers.sort(function (a, b) {  return a.rosterOrder - b.rosterOrder; });
                                    vars.expiring = [];
                                    for (i = 0; i < userPlayers.length; i++) {
                                        // Show contracts expiring this year, or next year if we're already in free agency
                                        if (userPlayers[i].contract.exp === g.season || (g.phase >= g.PHASE.RESIGN_PLAYERS && userPlayers[i].contract.exp === g.season + 1)) {
                                            vars.expiring.push({
                                                pid: userPlayers[i].pid,
                                                name: userPlayers[i].name,
                                                age: userPlayers[i].age,
                                                pts: userPlayers[i].stats.pts,
                                                contractAmount: userPlayers[i].contract.amount,
                                                ovr: userPlayers[i].ratings.ovr,
                                                pot: userPlayers[i].ratings.pot
                                            });
                                        }
                                    }

                                    // Free agents
                                    freeAgents = _.filter(players, function (p) { return p.tid === g.PLAYER.FREE_AGENT; });
                                    freeAgents.sort(function (a, b) {  return (b.ratings.ovr + b.ratings.pot) - (a.ratings.ovr + a.ratings.pot); });
                                    vars.freeAgents = [];
                                    if (freeAgents.length > 0) {
                                        i = 0;
                                        while (true) {
                                            vars.freeAgents.push({
                                                pid: freeAgents[i].pid,
                                                name: freeAgents[i].name,
                                                age: freeAgents[i].age,
                                                ovr: freeAgents[i].ratings.ovr,
                                                pot: freeAgents[i].ratings.pot
                                            });

                                            i += 1;
                                            if (i === 3 || i === freeAgents.length) {
                                                break;
                                            }
                                        }
                                    }
                                    vars.numRosterSpots = 15 - userPlayers.length;

                                    g.dbl.transaction("playoffSeries").objectStore("playoffSeries").get(g.season).onsuccess = function (event) {
                                        var data, found, i, playoffSeries, rnd, series;

                                        playoffSeries = event.target.result;
                                        vars.showPlayoffSeries = false;
                                        vars.playoffsStarted = g.phase >= g.PHASE.PLAYOFFS;
                                        if (playoffSeries !== undefined) {
                                            series = playoffSeries.series;
                                            found = false;
                                            // Find the latest playoff series with the user's team in it
                                            for (rnd = playoffSeries.currentRound; rnd >= 0; rnd--) {
                                                for (i = 0; i < series[rnd].length; i++) {
                                                    if (series[rnd][i].home.tid === g.userTid || series[rnd][i].away.tid === g.userTid) {
                                                        vars.series = [[series[rnd][i]]];
                                                        found = true;
                                                        vars.showPlayoffSeries = true;
                                                        if (rnd === 0) {
                                                            vars.seriesTitle = "First Round";
                                                        } else if (rnd === 1) {
                                                            vars.seriesTitle = "Second Round";
                                                        } else if (rnd === 2) {
                                                            vars.seriesTitle = "Conference Finals";
                                                        } else if (rnd === 3) {
                                                            vars.seriesTitle = "League Finals";
                                                        }
                                                        break;
                                                    }
                                                }
                                                if (found) {
                                                    break;
                                                }
                                            }
                                        }

                                        data = {
                                            container: "league_content",
                                            template: "leagueDashboard",
                                            title: "Dashboard",
                                            vars: vars
                                        };
                                        ui.update(data, req.raw.cb);
                                    };
                                };
                            });
                        };
                    });
                });
            };
        });
    }

    function inbox(req) {
        viewHelpers.beforeLeague(req, function () {
            g.dbl.transaction("messages").objectStore("messages").getAll().onsuccess = function (event) {
                var anyUnread, data, i, messages;

                messages = event.target.result;
                messages.reverse();

                anyUnread = false;
                for (i = 0; i < messages.length; i++) {
                    messages[i].text = messages[i].text.replace("<p>", "").replace("</p>", " ");
                    if (!messages[i].read) {
                        anyUnread = true;
                    }
                }

                data = {
                    container: "league_content",
                    template: "inbox",
                    title: "Inbox",
                    vars: {messages: messages, anyUnread: anyUnread}
                };
                ui.update(data, req.raw.cb);
            };
        });
    }

    function message(req) {
        viewHelpers.beforeLeague(req, function () {
            var mid, tx;

            g.realtimeUpdate = false;

            // If null, then the most recent message will be loaded
            mid = req.params.mid ? parseInt(req.params.mid, 10) : null;

            tx = g.dbl.transaction("messages", "readwrite");
            tx.objectStore("messages").openCursor(mid, "prev").onsuccess = function (event) {
                var cursor, data, message;

                cursor = event.target.result;
                message = cursor.value;

                data = {
                    container: "league_content",
                    template: "message",
                    title: "Message From " + message.from,
                    vars: {message: message}
                };

                if (!message.read) {
                    message.read = true;
                    cursor.update(message);

                    tx.oncomplete = function () {
                        if (g.gameOver) {
                            ui.updateStatus("You're fired! Game over!");
                        }

                        ui.updatePlayMenu(null, function () {
                            ui.update(data, req.raw.cb);
                        });
                    };
                } else {
                    ui.update(data, req.raw.cb);
                }
            };
        });
    }

    function standings(req) {
        viewHelpers.beforeLeague(req, function () {
            var attributes, gb, season, seasonAttributes, seasons;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            // Calculate the number of games that team is behind team0
            gb = function (team0, team) {
                return ((team0.won - team0.lost) - (team.won - team.lost)) / 2;
            };

            attributes = ["tid", "cid", "did", "abbrev", "region", "name"];
            seasonAttributes = ["won", "lost", "winp", "wonHome", "lostHome", "wonAway", "lostAway", "wonDiv", "lostDiv", "wonConf", "lostConf", "lastTen", "streak"];
            db.getTeams(null, season, attributes, [], seasonAttributes, {sortBy: "winp"}, function (teams) {
                var confs, confTeams, data, divTeams, i, j, k, l, lastTenLost, lastTenWon;

                confs = [];
                for (i = 0; i < g.confs.length; i++) {
                    confTeams = [];
                    l = 0;
                    for (k = 0; k < teams.length; k++) {
                        if (g.confs[i].cid === teams[k].cid) {
                            confTeams.push(helpers.deepCopy(teams[k]));
                            confTeams[l].rank = l + 1;
                            if (l === 0) {
                                confTeams[l].gb = 0;
                            } else {
                                confTeams[l].gb = gb(confTeams[0], confTeams[l]);
                            }
                            l += 1;
                        }
                    }
                    confTeams[7].separator = true;

                    confs.push({name: g.confs[i].name, divs: [], teams: confTeams});

                    for (j = 0; j < g.divs.length; j++) {
                        if (g.divs[j].cid === g.confs[i].cid) {
                            divTeams = [];
                            l = 0;
                            for (k = 0; k < teams.length; k++) {
                                if (g.divs[j].did === teams[k].did) {
                                    divTeams.push(helpers.deepCopy(teams[k]));
                                    if (l === 0) {
                                        divTeams[l].gb = 0;
                                    } else {
                                        divTeams[l].gb = gb(divTeams[0], divTeams[l]);
                                    }
                                    l += 1;
                                }
                            }

                            confs[i].divs.push({name: g.divs[j].name, teams: divTeams});
                        }
                    }
                }

                data = {
                    container: "league_content",
                    template: "standings",
                    title: "Standings - " + season,
                    vars: {confs: confs, seasons: seasons, season: season}
                };
                ui.update(data, function () {
                    ui.dropdown($('#standings-select-season'));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            });
        });
    }

    function playoffs(req) {
        viewHelpers.beforeLeague(req, function () {
            var attributes, finalMatchups, season, seasonAttributes, seasons;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            function cb(finalMatchups, series) {
                var data;

                data = {
                    container: "league_content",
                    template: "playoffs",
                    title: "Playoffs - " + season,
                    vars: {finalMatchups: finalMatchups, series: series, seasons: seasons, season: season}
                };
                ui.update(data, function () {
                    ui.dropdown($('#playoffs-select-season'));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            }

            if (season === g.season && g.phase < g.PHASE.PLAYOFFS) {
                // In the current season, before playoffs start, display projected matchups
                finalMatchups = false;
                attributes = ["tid", "cid", "abbrev", "name"];
                seasonAttributes = ["winp"];
                db.getTeams(null, season, attributes, [], seasonAttributes, {sortBy: "winp"}, function (teams) {
                    var cid, i, j, keys, series, teamsConf;

                    series = [[], [], [], []];  // First round, second round, third round, fourth round
                    for (cid = 0; cid < 2; cid++) {
                        teamsConf = [];
                        for (i = 0; i < teams.length; i++) {
                            if (teams[i].cid === cid) {
                                teamsConf.push(teams[i]);
                            }
                        }
                        series[0][cid * 4] = {home: teamsConf[0], away: teamsConf[7]};
                        series[0][cid * 4].home.seed = 1;
                        series[0][cid * 4].away.seed = 8;
                        series[0][1 + cid * 4] = {home: teamsConf[1], away: teamsConf[6]};
                        series[0][1 + cid * 4].home.seed = 2;
                        series[0][1 + cid * 4].away.seed = 7;
                        series[0][2 + cid * 4] = {home: teamsConf[2], away: teamsConf[5]};
                        series[0][2 + cid * 4].home.seed = 3;
                        series[0][2 + cid * 4].away.seed = 6;
                        series[0][3 + cid * 4] = {home: teamsConf[3], away: teamsConf[4]};
                        series[0][3 + cid * 4].home.seed = 4;
                        series[0][3 + cid * 4].away.seed = 5;
                    }

                    cb(finalMatchups, series);
                });
            } else {
                // Display the current or archived playoffs
                finalMatchups = true;
                g.dbl.transaction("playoffSeries").objectStore("playoffSeries").get(season).onsuccess = function (event) {
                    var playoffSeries, series;

                    playoffSeries = event.target.result;
                    series = playoffSeries.series;

                    cb(finalMatchups, series);
                };
            }
        });
    }

    function leagueFinances(req) {
        viewHelpers.beforeLeague(req, function () {
            var attributes, season, seasons, seasonAttributes;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            attributes = ["tid", "abbrev", "region", "name"];
            seasonAttributes = ["att", "revenue", "profit", "cash", "payroll", "salaryPaid"];
            db.getTeams(null, season, attributes, [], seasonAttributes, {}, function (teams) {
                var data, i;

                for (i = 0; i < teams.length; i++) {
                    teams[i].cash /= 1000;  // [millions of dollars]
                }

                data = {
                    container: "league_content",
                    template: "leagueFinances",
                    title: "League Finances - " + season,
                    vars: {salaryCap: g.salaryCap / 1000, minPayroll: g.minPayroll / 1000, luxuryPayroll: g.luxuryPayroll / 1000, luxuryTax: g.luxuryTax, seasons: seasons}
                };
                ui.update(data, function () {
                    ui.dropdown($("#league-finances-select-season"));

                    ui.datatableSinglePage($("#league-finances"), 5, _.map(teams, function (t) {
                        var payroll;

                        payroll = season === g.season ? t.payroll : t.salaryPaid;  // Display the current actual payroll for this season, or the salary actually paid out for prior seasons

                        return ['<a href="/l/' + g.lid + '/team_finances/' + t.abbrev + '">' + t.region + ' ' + t.name + '</a>', helpers.numberWithCommas(helpers.round(t.att)), helpers.formatCurrency(t.revenue, "M"), helpers.formatCurrency(t.profit, "M"), helpers.formatCurrency(t.cash, "M"), helpers.formatCurrency(payroll, "M")];
                    }));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            });
        });
    }

    function history(req) {
        viewHelpers.beforeLeague(req, function () {
            var attributes, season, seasonAttributes, seasons;

            season = helpers.validateSeason(req.params.season);

            g.realtimeUpdate = false;

            // If playoffs aren't over, season awards haven't been set
            if (g.phase <= g.PHASE.PLAYOFFS) {
                // View last season by default
                if (season === g.season) {
                    season -= 1;
                }
                seasons = helpers.getSeasons(season, g.season);  // Don't show this season as an option
            } else {
                seasons = helpers.getSeasons(season);  // Show this season as an option
            }

            if (season < g.startingSeason) {
                helpers.error("There is no league history yet. Check back after the playoffs.", req.raw.cb);
                return;
            }

            g.dbl.transaction("awards").objectStore("awards").get(season).onsuccess = function (event) {
                var awards;

                awards = event.target.result;

                g.dbl.transaction("players").objectStore("players").index("retiredYear").getAll(season).onsuccess = function (event) {
                    var retiredPlayers;

                    retiredPlayers = db.getPlayers(event.target.result, season, null, ["pid", "name", "age"], [], ["ovr"], {fuzz: true});

                    db.getTeams(null, season, ["abbrev", "region", "name"], [], ["playoffRoundsWon"], {}, function (teams) {
                        var champ, data, i;

                        for (i = 0; i < teams.length; i++) {
                            if (teams[i].playoffRoundsWon === 4) {
                                champ = teams[i];
                                break;
                            }
                        }

                        data = {
                            container: "league_content",
                            template: "history",
                            title: "Season Summary - " + season,
                            vars: {awards: awards, champ: champ, retiredPlayers: retiredPlayers, seasons: seasons, season: season}
                        };
                        ui.update(data, function () {
                            ui.dropdown($("#history-select-season"));

                            if (req.raw.cb !== undefined) {
                                req.raw.cb();
                            }
                        });
                    });
                };
            };
        });
    }

    function schedule(req) {
        viewHelpers.beforeLeague(req, function () {
            season.getSchedule(null, 0, function (schedule_) {
                var data, game, games, i, row, team0, team1;

                games = [];
                for (i = 0; i < schedule_.length; i++) {
                    game = schedule_[i];
                    if (g.userTid === game.homeTid || g.userTid === game.awayTid) {
                        team0 = {tid: game.homeTid, abbrev: game.homeAbbrev, region: game.homeRegion, name: game.homeName};
                        team1 = {tid: game.awayTid, abbrev: game.awayAbbrev, region: game.awayRegion, name: game.awayName};
                        if (g.userTid === game.homeTid) {
                            row = {teams: [team1, team0], vsat: "vs"};
                        } else {
                            row = {teams: [team0, team1], vsat: "at"};
                        }
                        games.push(row);
                    }
                }

                data = {
                    container: "league_content",
                    template: "schedule",
                    title: "Schedule",
                    vars: {games: games}
                };
                ui.update(data, req.raw.cb);
            });
        });
    }

    function teamFinances(req) {
        viewHelpers.beforeLeague(req, function () {
            var abbrev, out, show, shows, teams, tid, tx;

            show = req.params.show !== undefined ? req.params.show : "10";
            out = helpers.validateAbbrev(req.params.abbrev);
            tid = out[0];
            abbrev = out[1];
            teams = helpers.getTeams(tid);

            // First, handle any changes to the finances form
            if (req.method === "post") {
                $("#finances-settings button").attr("disabled", "disabled").html("Saving...");

                tx = g.dbl.transaction("teams", "readwrite");
                tx.objectStore("teams").openCursor(g.userTid).onsuccess = function (event) {
                    var budget, cursor, i, key, t;

                    cursor = event.target.result;
                    t = cursor.value;

                    budget = req.params.budget;

                    for (key in budget) {
                        if (budget.hasOwnProperty(key)) {
                            if (key === "ticketPrice") {
                                // Already in [dollars]
                                budget[key] = helpers.round(budget[key], 2);
                            } else {
                                // Convert from [millions of dollars] to [thousands of dollars] rounded to the nearest $10k
                                budget[key] = helpers.round(budget[key] * 100) * 10;
                            }
                            t.budget[key].amount = budget[key];
                        }
                    }

                    cursor.update(t);

                    finances.updateRanks(tx, ["budget"], function () {
                        Davis.location.assign(new Davis.Request("/l/" + g.lid + "/team_finances"));
                    });
                };
                return;
            }

            shows = [
                {
                    text: "Past 10 seasons",
                    show: "10",
                    selected: req.params.show === "10"
                },
                {
                    text: "All seasons",
                    show: "all",
                    selected: req.params.show === "all"
                }
            ];
            if (show === "all") {
                show = g.season - g.startingSeason + 1;
            } else {
                show = parseInt(show, 10);
            }

            db.getPayroll(null, tid, function (payroll, contracts) {
                var aboveBelow, contractTotals, i, j, salariesSeasons, season;

                aboveBelow = {
                    minPayroll: payroll > g.minPayroll ? "above" : "below",
                    salaryCap: payroll > g.salaryCap ? "above" : "below",
                    luxuryPayroll: payroll > g.luxuryPayroll ? "above" : "below"
                };

                payroll /= 1000;

                // Convert contract objects into table rows
                contractTotals = [0, 0, 0, 0, 0];
                season = g.season;
                if (g.phase >= g.PHASE.DRAFT) {
                    // AFter the draft, don't show old contract year
                    season += 1;
                }
                for (i = 0; i < contracts.length; i++) {
                    contracts[i].amounts = [];
                    for (j = season; j <= contracts[i].exp; j++) {
                        contracts[i].amounts.push(contracts[i].amount / 1000);
                        contractTotals[j - season] += contracts[i].amount / 1000;
                    }
                    delete contracts[i].amount;
                    delete contracts[i].exp;
                }
                salariesSeasons = [season, season + 1, season + 2, season + 3, season + 4];

                g.dbl.transaction("teams").objectStore("teams").get(tid).onsuccess = function (event) {
                    var barData, barSeasons, data, i, keys, team, teamAll, tempData;

                    team = event.target.result;
                    team.seasons.reverse();  // Most recent season first

                    keys = ["won", "hype", "pop", "att", "cash", "revenues", "expenses"];
                    barData = {};
                    for (i = 0; i < keys.length; i++) {
                        if (typeof team.seasons[0][keys[i]] !== "object") {
                            barData[keys[i]] = helpers.nullPad(_.pluck(team.seasons, keys[i]), show);
                        } else {
                            // Handle an object in the database
                            barData[keys[i]] = {};
                            tempData = _.pluck(team.seasons, keys[i]);
                            _.each(tempData[0], function (value, key, obj) {
                                barData[keys[i]][key] = helpers.nullPad(_.pluck(_.pluck(tempData, key), "amount"), show);
                            });
                        }
                    }

                    // Process some values
                    barData.att = _.map(barData.att, function (num, i) { if (team.seasons[i] !== undefined) { return num / team.seasons[i].gp; } });  // per game
                    keys = ["cash"];
                    for (i = 0; i < keys.length; i++) {
                        barData[keys[i]] = _.map(barData[keys[i]], function (num) { return num / 1000; });  // convert to millions
                    }

                    barSeasons = [];
                    for (i = 0; i < show; i++) {
                        barSeasons[i] = g.season - i;
                    }

                    // Get stuff for the finances form
                    db.getTeam(team, g.season, ["region", "name", "abbrev", "budget"], [], ["expenses"], {}, function (team) {
                        data = {
                            container: "league_content",
                            template: "teamFinances",
                            title: team.region + " " + team.name + " " + "Finances - " + season,
                            vars: {payroll: payroll, aboveBelow: aboveBelow, salaryCap: g.salaryCap / 1000, minPayroll: g.minPayroll / 1000, luxuryPayroll: g.luxuryPayroll / 1000, luxuryTax: g.luxuryTax, salariesSeasons: salariesSeasons, shows: shows, team: team, teams: teams, contractTotals: contractTotals}
                        };
                        ui.update(data, function () {
                            var disableFinanceSettings, enableFinanceSettings;

                            ui.dropdown($("#team-finances-select-team"), $("#team-finances-select-show"));

                            ui.datatableSinglePage($("#player-salaries"), 1, _.map(contracts, function (p) {
                                var i, output;
                                output = [helpers.playerNameLabels(p.pid, p.name, p.injury, p.skills)];
                                if (p.released) {
                                    output[0] = "<i>" + output[0] + "</i>";
                                }
                                for (i = 0; i < 5; i++) {
                                    if (p.amounts[i]) {
                                        output.push(helpers.formatCurrency(p.amounts[i], "M"));
                                    } else {
                                        output.push("");
                                    }
                                    if (p.released) {
                                        output[i + 1] = "<i>" + output[i + 1] + "</i>";
                                    }
                                }
                                return output;
                            }));

                            $("#help-payroll-limits").clickover({
                                title: "Payroll Limits",
                                content: "The salary cap is a soft cap, meaning that you can exceed it to resign your own players or to sign free agents to minimum contracts ($" + g.minContract + "k/year); however, you cannot exceed the salary cap to sign a free agent for more than the minimum. Teams with payrolls below the minimum payroll limit will be assessed a fine equal to the difference at the end of the season. Teams with payrolls above the luxury tax limit will be assessed a fine equal to " + g.luxuryTax + " times the difference at the end of the season."
                            });

                            $("#help-hype").clickover({
                                title: "Hype",
                                content: "\"Hype\" refers to fans' interest in your team. If your team is winning or improving, then hype increases; if your team is losing or stagnating, then hype decreases. Hype influences attendance, various revenue sources such as mercahndising, and the attitude players have towards your organization."
                            });

                            $("#help-revenue-settings").clickover({
                                title: "Revenue Settings",
                                content: "Set your ticket price too high, and attendance will decrease and some fans will resent you for it. Set it too low, and you're not maximizing your profit."
                            });

                            $("#help-expense-settings").clickover({
                                title: "Expense Settings",
                                html: true,
                                content: "<p>Scouting: Controls the accuracy of displayed player ratings.<p></p>Coaching: Better coaches mean better player development.</p><p>Health: A good team of doctors speeds recovery from injuries.</p>Facilities: Better training facilities make your players happier and other players envious; stadium renovations increase attendance."
                            });

                            $.barGraph($("#bar-graph-won"), barData.won, [0, 82], barSeasons);
                            $.barGraph($("#bar-graph-hype"), barData.hype, [0, 1], barSeasons, function (val) {
                                return helpers.round(val, 2);
                            });
                            $.barGraph($("#bar-graph-pop"), barData.pop, [0, 20], barSeasons, function (val) {
                                return helpers.round(val, 1) + "M";
                            });
                            $.barGraph($("#bar-graph-att"), barData.att, [0, 25000], barSeasons, function (val) {
                                return helpers.numberWithCommas(helpers.round(val));
                            });

                            $.barGraph(
                                $("#bar-graph-revenue"),
                                [barData.revenues.nationalTv, barData.revenues.localTv, barData.revenues.ticket, barData.revenues.sponsor, barData.revenues.merch],
                                undefined,
                                [
                                    barSeasons,
                                    ["national TV revenue", "local TV revenue", "ticket revenue",  "corporate sponsorship revenue", "merchandising revenue"]
                                ],
                                function (val) {
                                    return helpers.formatCurrency(val / 1000, "M", 1);
                                }
                            );
                            $.barGraph(
                                $("#bar-graph-expenses"),
                                [barData.expenses.salary, barData.expenses.minTax, barData.expenses.luxuryTax, barData.expenses.buyOuts, barData.expenses.scouting, barData.expenses.coaching, barData.expenses.health, barData.expenses.facilities],
                                undefined,
                                [
                                    barSeasons,
                                    ["player salaries", "minimum payroll tax", "luxury tax", "buy outs", "scouting", "coaching", "health", "facilities"]
                                ],
                                function (val) {
                                    return helpers.formatCurrency(val / 1000, "M", 1);
                                }
                            );
                            $.barGraph($("#bar-graph-cash"), barData.cash, undefined, barSeasons, function (val) {
                                return helpers.formatCurrency(val, "M", 1);
                            });

                            // Form enabling/disabling
                            disableFinanceSettings = function () {
                                $("#finances-settings input, button").attr("disabled", "disabled");
                                if (tid === g.userTid) {
                                    $("#finances-settings .text-error").html("Stop game simulation to edit.");
                                } else {
                                    $("#finances-settings button").hide();
                                }
                            };
                            enableFinanceSettings = function () {
                                if (tid === g.userTid) {
                                    $("#finances-settings input, button").removeAttr("disabled");
                                }
                                $("#finances-settings .text-error").html("");
                                if (tid === g.userTid) {
                                    $("#finances-settings button").show();
                                } else {
                                    $("#finances-settings button").hide();
                                }
                            };
                            $("#finances-settings").on("gameSimulationStart", disableFinanceSettings);
                            $("#finances-settings").on("gameSimulationStop", enableFinanceSettings);
                            if (g.gamesInProgress) {
                                disableFinanceSettings();
                            } else {
                                enableFinanceSettings();
                            }

                            if (req.raw.cb !== undefined) {
                                req.raw.cb();
                            }
                        });
                    });
                };
            });
        });
    }

    function teamHistory(req) {
        viewHelpers.beforeLeague(req, function () {
            g.dbl.transaction("teams").objectStore("teams").get(g.userTid).onsuccess = function (event) {
                var abbrev, data, extraText, history, i, userTeam, userTeamSeason;

                userTeam = event.target.result;

                abbrev = userTeam.abbrev;

                history = [];
                for (i = 0; i < userTeam.seasons.length; i++) {
                    extraText = "";
                    if (userTeam.seasons[i].playoffRoundsWon === 4) {
                        extraText = "league champs";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 3) {
                        extraText = "conference champs";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 2) {
                        extraText = "made conference finals";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 1) {
                        extraText = "made second round";
                    } else if (userTeam.seasons[i].playoffRoundsWon === 0) {
                        extraText = "made playoffs";
                    }

                    history.push({
                        season: userTeam.seasons[i].season,
                        won: userTeam.seasons[i].won,
                        lost: userTeam.seasons[i].lost,
                        extraText: extraText
                    });
                }
                history.reverse(); // Show most recent season first

                data = {
                    container: "league_content",
                    template: "teamHistory",
                    title: "Team History",
                    vars: {abbrev: abbrev, history: history}
                };
                ui.update(data, req.raw.cb);
            };
        });
    }

    function freeAgents_(req) {
        viewHelpers.beforeLeague(req, function () {
            if (g.phase >= g.PHASE.AFTER_TRADE_DEADLINE && g.phase <= g.PHASE.RESIGN_PLAYERS) {
                if (g.phase === g.PHASE.RESIGN_PLAYERS) {
                    Davis.location.assign(new Davis.Request("/l/" + g.lid + "/negotiation"));
                    return;
                }

                helpers.error("You're not allowed to sign free agents now.", req.raw.cb);
                return;
            }

            db.getPayroll(null, g.userTid, function (payroll, contracts) {
                var capSpace;

                capSpace = (g.salaryCap - payroll) / 1000;
                if (capSpace < 0) {
                    capSpace = 0;
                }

                g.dbl.transaction("players").objectStore("players").index("tid").getAll(g.PLAYER.FREE_AGENT).onsuccess = function (event) {
                    var attributes, data, i, players, ratings, stats;

                    attributes = ["pid", "name", "pos", "age", "contract", "freeAgentMood", "injury"];
                    ratings = ["ovr", "pot", "skills"];
                    stats = ["min", "pts", "trb", "ast", "per"];
                    players = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {oldStats: true, showNoStats: true, fuzz: true});

                    for (i = 0; i < players.length; i++) {
                        players[i].contract.amount = freeAgents.amountWithMood(players[i].contract.amount, players[i].freeAgentMood[g.userTid]);
                    }

                    data = {
                        container: "league_content",
                        template: "freeAgents",
                        title: "Free Agents",
                        vars: {capSpace: capSpace}
                    };
                    ui.update(data, function () {
                        ui.datatable($("#free-agents"), 4, _.map(players, function (p) {
                            var negotiateButton;
                            if (freeAgents.refuseToNegotiate(p.contract.amount * 1000, p.freeAgentMood[g.userTid])) {
                                negotiateButton = "Refuses!";
                            } else {
                                negotiateButton = '<form action="/l/' + g.lid + '/negotiation/' + p.pid + '" method="POST" style="margin: 0"><input type="hidden" name="new" value="1"><button type="submit" class="btn btn-mini btn-primary">Negotiate</button></form>';
                            }
                            return [helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, negotiateButton];
                        }));

                        $("#help-salary-cap").clickover({
                            title: "Cap Space",
                            html: true,
                            content: "<p>\"Cap space\" is the difference between your current payroll and the salary cap. You can sign a free agent to any valid contract as long as you don't go over the cap.</p>You can only exceed the salary cap to sign free agents to minimum contracts ($" + g.minContract + "k/year)."
                        });

                        if (req.raw.cb !== undefined) {
                            req.raw.cb();
                        }
                    });
                };
            });
        });
    }

    function draft_(req) {
        viewHelpers.beforeLeague(req, function () {
            var playerStore, season, seasons;

            season = helpers.validateSeason(req.params.season);

            // Draft hasn't happened yet this year
            if (g.phase < g.PHASE.DRAFT) {
                // View last season by default
                if (season === g.season) {
                    season -= 1;
                }
                seasons = helpers.getSeasons(season, g.season);  // Don't show this season as an option
            } else {
                seasons = helpers.getSeasons(season);  // Show this season as an option
            }

            if (season < g.startingSeason) {
                helpers.error("There is no draft history yet. Check back after the draft.", req.raw.cb);
                return;
            }

            playerStore = g.dbl.transaction("players").objectStore("players");
            // Active draft
            if (g.phase === g.PHASE.DRAFT && season === g.season) {
                playerStore.index("tid").getAll(g.PLAYER.UNDRAFTED).onsuccess = function (event) {
                    var attributes, ratings, stats, undrafted;

                    attributes = ["pid", "name", "pos", "age", "injury"];
                    ratings = ["ovr", "pot", "skills"];
                    stats = [];
                    undrafted = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});
                    undrafted.sort(function (a, b) { return (b.ratings.ovr + 2 * b.ratings.pot) - (a.ratings.ovr + 2 * a.ratings.pot); });

                    playerStore.index("draft.year").getAll(g.season).onsuccess = function (event) {
                        var attributes, drafted, i, players, ratings, stats, started;

                        attributes = ["pid", "tid", "name", "pos", "age", "draft", "injury"];
                        ratings = ["ovr", "pot", "skills"];
                        stats = [];
                        players = db.getPlayers(event.target.result, g.season, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});

                        drafted = [];
                        for (i = 0; i < players.length; i++) {
                            if (players[i].tid !== g.PLAYER.UNDRAFTED) {
                                drafted.push(players[i]);
                            }
                        }
                        drafted.sort(function (a, b) { return (100 * a.draft.round + a.draft.pick) - (100 * b.draft.round + b.draft.pick); });

                        started = drafted.length > 0;

                        draft.getOrder(function (draftOrder) {
                            var data, i, slot;

                            for (i = 0; i < draftOrder.length; i++) {
                                slot = draftOrder[i];
                                drafted.push({draft: {
                                    abbrev: slot.abbrev,
                                    round: slot.round,
                                    pick: slot.pick
                                }});
                            }

                            data = {
                                container: "league_content",
                                template: "draft",
                                title: "Draft",
                                vars: {undrafted: undrafted, drafted: drafted, started: started}
                            };
                            ui.update(data, function () {
                                var draftUntilUserOrEnd, updateDraftTables;

                                updateDraftTables = function (pids) {
                                    var draftedPlayer, draftedRows, i, j, undraftedTds;

                                    for (i = 0; i < pids.length; i++) {
                                        draftedPlayer = new Array(5);
                                        // Find row in undrafted players table, get metadata, delete row
                                        undraftedTds = $("#undrafted-" + pids[i] + " td");
                                        for (j = 0; j < 5; j++) {
                                            draftedPlayer[j] = undraftedTds[j].innerHTML;
                                        }

                                        // Find correct row (first blank row) in drafted players table, write metadata
                                        draftedRows = $("#drafted tbody tr");
                                        for (j = 0; j < draftedRows.length; j++) {
                                            if (draftedRows[j].children[3].innerHTML.length === 0) {
                                                $("#undrafted-" + pids[i]).remove();
                                                draftedRows[j].children[2].innerHTML = draftedPlayer[0];
                                                draftedRows[j].children[3].innerHTML = draftedPlayer[1];
                                                draftedRows[j].children[4].innerHTML = draftedPlayer[2];
                                                draftedRows[j].children[5].innerHTML = draftedPlayer[3];
                                                draftedRows[j].children[6].innerHTML = draftedPlayer[4];
                                                break;
                                            }
                                        }
                                    }
                                };

                                draftUntilUserOrEnd = function () {
                                    api.draftUntilUserOrEnd(function (pids, done) {
                                        updateDraftTables(pids);
                                        if (!done) {
                                            $("#undrafted button").removeAttr("disabled");
                                        }
                                    });
                                };

                                $("#start-draft").click(function (event) {
                                    $($("#start-draft").parent()).hide();
                                    draftUntilUserOrEnd();
                                });

                                $("#undrafted button").click(function (event) {
                                    $("#undrafted button").attr("disabled", "disabled");
                                    api.draftUser(this.getAttribute("data-player-id"), function (pid) {
                                        updateDraftTables([pid]);
                                        draftUntilUserOrEnd();
                                    });
                                });
                            });
                        });
                    };
                };
                return;
            }

            // Show a summary of an old draft
            g.realtimeUpdate = false;
            playerStore.index("draft.year").getAll(season).onsuccess = function (event) {
                var attributes, currentPr, data, i, pa, player, players, playersAll, ratings, stats;

                attributes = ["tid", "abbrev", "draft", "pid", "name", "pos", "age"];
                ratings = ["ovr", "pot", "skills"];
                stats = ["gp", "min", "pts", "trb", "ast", "per"];  // This needs to be in the same order as categories
                playersAll = db.getPlayers(event.target.result, null, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});

                players = [];
                for (i = 0; i < playersAll.length; i++) {
                    pa = playersAll[i];

                    if (pa.draft.round === 1 || pa.draft.round === 2) {
                        // Attributes
                        player = {pid: pa.pid, name: pa.name, pos: pa.pos, draft: pa.draft, currentAge: pa.age, currentAbbrev: pa.abbrev};

                        // Ratings
                        currentPr = _.last(pa.ratings);
                        if (pa.tid !== g.PLAYER.RETIRED) {
                            player.currentOvr = currentPr.ovr;
                            player.currentPot = currentPr.pot;
                            player.currentSkills = currentPr.skills;
                        } else {
                            player.currentOvr = "";
                            player.currentPot = "";
                            player.currentSkills = "";
                        }

                        // Stats
                        player.careerStats = pa.careerStats;

                        players.push(player);
                    }
                }

                data = {
                    container: "league_content",
                    template: "draftSummary",
                    title: "Draft Results - " + season,
                    vars: {seasons: seasons}
                };
                ui.update(data, function () {
                    ui.dropdown($("#draft-select-season"));

                    ui.datatableSinglePage($("#draft-results"), 0, _.map(players, function (p) {
                        return [p.draft.round + '-' + p.draft.pick, '<a href="/l/' + g.lid + '/player/' + p.pid + '">' + p.name + '</a>', p.pos, '<a href="/l/' + g.lid + '/roster/' + p.draft.abbrev + '">' + p.draft.abbrev + '</a>', String(p.draft.age), String(p.draft.ovr), String(p.draft.pot), '<span class="skills_alone">' + helpers.skillsBlock(p.draft.skills) + '</span>', '<a href="/l/' + g.lid + '/roster/' + p.currentAbbrev + '">' + p.currentAbbrev + '</a>', String(p.currentAge), String(p.currentOvr), String(p.currentPot), '<span class="skills_alone">' + helpers.skillsBlock(p.currentSkills) + '</span>', helpers.round(p.careerStats.gp), helpers.round(p.careerStats.min, 1), helpers.round(p.careerStats.pts, 1), helpers.round(p.careerStats.trb, 1), helpers.round(p.careerStats.ast, 1), helpers.round(p.careerStats.per, 1)];
                    }));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            };
        });
    }

    function leaders(req) {
        viewHelpers.beforeLeague(req, function () {
            var season, seasons, tx;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            tx = g.dbl.transaction(["players", "teams"]);

            tx.objectStore("teams").getAll().onsuccess = function (event) {
                var gps, i, teams;

                teams = event.target.result;

                // Calculate the number of games played for each team, which is used later to test if a player qualifies as a league leader
                gps = [];
                for (i = 0; i < teams.length; i++) {
                    gps[i] = _.last(teams[i].seasons).gp;
                }

                tx.objectStore("players").getAll().onsuccess = function (event) {
                    var attributes, categories, data, i, j, k, leader, pass, players, ratings, stats, userAbbrev, playerValue;

                    userAbbrev = helpers.getAbbrev(g.userTid);

                    // minStats and minValues are the NBA requirements to be a league leader for each stat http://www.nba.com/leader_requirements.html. If any requirement is met, the player can appear in the league leaders
                    categories = [];
                    categories.push({name: "Points", stat: "Pts", title: "Points Per Game", data: [], minStats: ["gp", "pts"], minValue: [70, 1400]});
                    categories.push({name: "Rebounds", stat: "Reb", title: "Rebounds Per Game", data: [], minStats: ["gp", "trb"], minValue: [70, 800]});
                    categories.push({name: "Assists", stat: "Ast", title: "Assists Per Game", data: [], minStats: ["gp", "ast"], minValue: [70, 400]});
                    categories.push({name: "Field Goal Percentage", stat: "FG%", title: "Field Goal Percentage", data: [], minStats: ["fg"], minValue: [300]});
                    categories.push({name: "Three-Pointer Percentage", stat: "3PT%", title: "Three-Pointer Percentage", data: [], minStats: ["tp"], minValue: [55]});
                    categories.push({name: "Free Throw Percentage", stat: "FT%", title: "Free Throw Percentage", data: [], minStats: ["ft"], minValue: [125]});
                    categories.push({name: "Blocks", stat: "Blk", title: "Blocks Per Game", data: [], minStats: ["gp", "blk"], minValue: [70, 100]});
                    categories.push({name: "Steals", stat: "Stl", title: "Steals Per Game", data: [], minStats: ["gp", "stl"], minValue: [70, 125]});
                    categories.push({name: "Minutes", stat: "Min", title: "Minutes Per Game", data: [], minStats: ["gp", "min"], minValue: [70, 2000]});
                    categories.push({name: "Player Efficiency Rating", stat: "PER", title: "Player Efficiency Rating", data: [], minStats: ["min"], minValue: [2000]});

                    attributes = ["pid", "name", "tid", "injury"];
                    ratings = ["skills"];
                    stats = ["pts", "trb", "ast", "fgp", "tpp", "ftp", "blk", "stl", "min", "per", "gp", "fg", "tp", "ft", "abbrev"];  // This needs to be in the same order as categories (at least, initially)
                    players = db.getPlayers(event.target.result, season, null, attributes, stats, ratings);

                    for (i = 0; i < categories.length; i++) {
                        players.sort(function (a, b) { return b.stats[stats[i]] - a.stats[stats[i]]; });
                        for (j = 0; j < players.length; j++) {
                            // Test if the player meets the minimum statistical requirements for this category
                            pass = false;
                            for (k = 0; k < categories[i].minStats.length; k++) {
                                // Everything except gp is a per-game average, so we need to scale them by games played
                                if (categories[i].minStats[k] === "gp") {
                                    playerValue = players[j].stats[categories[i].minStats[k]];
                                } else {
                                    playerValue = players[j].stats[categories[i].minStats[k]] * players[j].stats.gp;
                                }

                                // Compare against value normalized for team games played
                                if (playerValue >= Math.ceil(categories[i].minValue[k] * gps[players[j].tid] / 82)) {
                                    pass = true;
                                    break;  // If one is true, don't need to check the others
                                }
                            }

                            if (pass) {
                                leader = helpers.deepCopy(players[j]);
                                leader.i = categories[i].data.length + 1;
                                leader.stat = leader.stats[stats[i]];
                                leader.abbrev = leader.stats.abbrev;
                                delete leader.stats;
                                if (userAbbrev === leader.abbrev) {
                                    leader.userTeam = true;
                                } else {
                                    leader.userTeam = false;
                                }
                                categories[i].data.push(leader);
                            }

                            // Stop when we found 10
                            if (categories[i].data.length === 10) {
                                break;
                            }
                        }

                        if (i % 3 === 0 && i > 0) {
                            categories[i].newRow = true;
                        } else {
                            categories[i].newRow = false;
                        }
                    }

                    data = {
                        container: "league_content",
                        template: "leaders",
                        title: "League Leaders - " + season,
                        vars: {categories: categories, season: season, seasons: seasons}
                    };
                    ui.update(data, function () {
                        ui.dropdown($('#leaders-select-season'));

                        if (req.raw.cb !== undefined) {
                            req.raw.cb();
                        }
                    });
                };
            };
        });
    }

    function playerRatings(req) {
        viewHelpers.beforeLeague(req, function () {
            var season, seasons;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            g.dbl.transaction(["players"]).objectStore("players").getAll().onsuccess = function (event) {
                var attributes, data, i, players, ratings, stats;

                attributes = ["pid", "name", "pos", "age", "abbrev", "injury"];
                ratings = ["ovr", "pot", "hgt", "stre", "spd", "jmp", "endu", "ins", "dnk", "ft", "fg", "tp", "blk", "stl", "drb", "pss", "reb", "skills"];
                stats = [];
                players = db.getPlayers(event.target.result, season, null, attributes, stats, ratings, {showNoStats: true, fuzz: true});

                // Fix ages
                for (i = 0; i < players.length; i++) {
                    players[i].age = players[i].age - (g.season - season);
                }

                data = {
                    container: "league_content",
                    template: "playerRatings",
                    title: "Player Ratings - " + season,
                    vars: {season: season, seasons: seasons}
                };
                ui.update(data, function () {
                    ui.dropdown($("#player-ratings-select-season"));

                    ui.datatable($("#player-ratings"), 4, _.map(players, function (p) {
                        var teamUrl;
                        return [helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, '<a href="/l/' + g.lid + '/roster/' + p.abbrev + '/' + season + '">' + p.abbrev + '</a>', String(p.age), String(p.ratings.ovr), String(p.ratings.pot), String(p.ratings.hgt), String(p.ratings.stre), String(p.ratings.spd), String(p.ratings.jmp), String(p.ratings.endu), String(p.ratings.ins), String(p.ratings.dnk), String(p.ratings.ft), String(p.ratings.fg), String(p.ratings.tp), String(p.ratings.blk), String(p.ratings.stl), String(p.ratings.drb), String(p.ratings.pss), String(p.ratings.reb)];
                    }));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            };
        });
    }

    function player_(req) {
        viewHelpers.beforeLeague(req, function () {
            var pid;

            pid = req.params.pid !== undefined ? parseInt(req.params.pid, 10) : undefined;

            g.dbl.transaction(["players"]).objectStore("players").get(pid).onsuccess = function (event) {
                var attributes, currentRatings, data, player, ratings, stats;

                attributes = ["pid", "name", "tid", "abbrev", "teamRegion", "teamName", "pos", "age", "hgtFt", "hgtIn", "weight", "born", "contract", "draft", "face", "mood", "injury", "salaries", "salariesTotal", "awards", "freeAgentMood"];
                ratings = ["season", "abbrev", "age", "ovr", "pot", "hgt", "stre", "spd", "jmp", "endu", "ins", "dnk", "ft", "fg", "tp", "blk", "stl", "drb", "pss", "reb", "skills"];
                stats = ["season", "abbrev", "age", "gp", "gs", "min", "fg", "fga", "fgp", "fgAtRim", "fgaAtRim", "fgpAtRim", "fgLowPost", "fgaLowPost", "fgpLowPost", "fgMidRange", "fgaMidRange", "fgpMidRange", "tp", "tpa", "tpp", "ft", "fta", "ftp", "orb", "drb", "trb", "ast", "tov", "stl", "blk", "pf", "pts", "per"];

                player = db.getPlayer(event.target.result, null, null, attributes, stats, ratings, {playoffs: true, showNoStats: true, fuzz: true});

                if (player.tid === g.PLAYER.RETIRED) {
                    g.realtimeUpdate = false;
                }

                // Account for extra free agent demands
                if (player.tid === g.PLAYER.FREE_AGENT) {
                    player.contract.amount = freeAgents.amountWithMood(player.contract.amount, player.freeAgentMood[g.userTid]);
                }

                currentRatings = player.ratings[player.ratings.length - 1];

                data = {
                    container: "league_content",
                    template: "player",
                    title: player.name,
                    vars: {player: player, currentRatings: currentRatings, showTradeFor: player.tid !== g.userTid && player.tid >= 0, freeAgent: player.tid === g.PLAYER.FREE_AGENT, retired: player.tid === g.PLAYER.RETIRED, showContract: player.tid !== g.PLAYER.UNDRAFTED && player.tid !== g.PLAYER.RETIRED, injured: player.injury.type !== "Healthy"}
                };
                ui.update(data, req.raw.cb);
            };
        });
    }

    function negotiationList(req) {
        viewHelpers.beforeLeague(req, function () {
            var negotiations;

            // If there is only one active negotiation with a free agent, go to it
            g.dbl.transaction("negotiations").objectStore("negotiations").getAll().onsuccess = function (event) {
                var negotiations;

                negotiations = event.target.result;

                if (negotiations.length === 1) {
                    return Davis.location.assign(new Davis.Request("/l/" + g.lid + "/negotiation/" + negotiations[0].pid));
                }

                if (g.phase !== g.PHASE.RESIGN_PLAYERS) {
                    return helpers.error("Something bad happened.", req.raw.cb);
                }

                // Get all free agents, filter array based on negotiations data, pass to db.getPlayers, augment with contract data from negotiations
                g.dbl.transaction(["players"]).objectStore("players").index("tid").getAll(g.PLAYER.FREE_AGENT).onsuccess = function (event) {
                    var attributes, data, i, j, players, playersAll, playersSome, ratings, stats;

                    playersAll = event.target.result;
                    playersSome = [];
                    for (i = 0; i < playersAll.length; i++) {
                        for (j = 0; j < negotiations.length; j++) {
                            if (playersAll[i].pid === negotiations[j].pid) {
                                playersSome.push(playersAll[i]);
                                break;
                            }
                        }
                    }

                    attributes = ["pid", "name", "pos", "age", "freeAgentMood", "injury"];
                    stats = ["min", "pts", "trb", "ast", "per"];
                    ratings = ["ovr", "pot", "skills"];
                    players = db.getPlayers(playersSome, g.season, g.userTid, attributes, stats, ratings, {sortBy: "rosterOrder", showNoStats: true, fuzz: true});

                    for (i = 0; i < players.length; i++) {
                        for (j = 0; j < negotiations.length; j++) {
                            if (players[i].pid === negotiations[j].pid) {
                                players[i].contract = {};
                                players[i].contract.amount = negotiations[j].player.amount / 1000;
                                players[i].contract.exp = g.season + negotiations[j].player.years;
                                break;
                            }
                        }
                    }

                    data = {
                        container: "league_content",
                        template: "negotiationList",
                        title: "Resign Players",
                        vars: {}
                    };
                    ui.update(data, function () {
                        ui.datatable($("#negotiation-list"), 4, _.map(players, function (p) {
                            var negotiateButton;
                            if (freeAgents.refuseToNegotiate(p.contract.amount * 1000, p.freeAgentMood[g.userTid])) {
                                negotiateButton = "Refuses!";
                            } else {
                                // This can be a plain link because the negotiation has already been started at this point.
                                negotiateButton = '<a href="/l/' + g.lid + '/negotiation/' + p.pid + '" class="btn btn-mini btn-primary">Negotiate</a>';
                            }
                            return [helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, String(p.age), String(p.ratings.ovr), String(p.ratings.pot), helpers.round(p.stats.min, 1), helpers.round(p.stats.pts, 1), helpers.round(p.stats.trb, 1), helpers.round(p.stats.ast, 1), helpers.round(p.stats.per, 1), helpers.formatCurrency(p.contract.amount, "M") + ' thru ' + p.contract.exp, negotiateButton];
                        }));

                        if (req.raw.cb !== undefined) {
                            req.raw.cb();
                        }
                    });
                };
            };
        });
    }

    function distPlayerRatings(req) {
        viewHelpers.beforeLeague(req, function () {
            var season, seasons;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            g.dbl.transaction(["players"]).objectStore("players").getAll().onsuccess = function (event) {
                var attributes, data, players, ratings, ratingsAll, stats;

                attributes = [];
                ratings = ["ovr", "pot", "hgt", "stre", "spd", "jmp", "endu", "ins", "dnk", "ft", "fg", "tp", "blk", "stl", "drb", "pss", "reb"];
                stats = [];
                players = db.getPlayers(event.target.result, season, null, attributes, stats, ratings, {fuzz: true});

                ratingsAll = _.reduce(players, function (memo, player) {
                    var rating;
                    for (rating in player.ratings) {
                        if (player.ratings.hasOwnProperty(rating)) {
                            if (memo.hasOwnProperty(rating)) {
                                memo[rating].push(player.ratings[rating]);
                            } else {
                                memo[rating] = [player.ratings[rating]];
                            }
                        }
                    }
                    return memo;
                }, {});

                data = {
                    container: "league_content",
                    template: "distPlayerRatings",
                    title: "Player Rating Distributions - " + season,
                    vars: {season: season, seasons: seasons}
                };
                ui.update(data, function () {
                    var rating, tbody;

                    ui.dropdown($("#dist-player-ratings-select-season"));

                    tbody = $("#dist-player-ratings tbody");

                    for (rating in ratingsAll) {
                        if (ratingsAll.hasOwnProperty(rating)) {
                            tbody.append('<tr><td style="text-align: right; padding-right: 1em;">' + rating + '</td><td width="100%"><div id="' + rating + 'BoxPlot"></div></td></tr>');

                            boxPlot.create({
                                data: ratingsAll[rating],
                                scale: [0, 100],
                                container: rating + "BoxPlot"
                            });
                        }
                    }

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            };
        });
    }

    function distPlayerStats(req) {
        viewHelpers.beforeLeague(req, function () {
            var season, seasons;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            g.dbl.transaction(["players"]).objectStore("players").getAll().onsuccess = function (event) {
                var attributes, data, nbaQuartiles, players, ratings, stats, statsAll;

                attributes = [];
                ratings = [];
                stats = ["gp", "gs", "min", "fg", "fga", "fgp", "tp", "tpa", "tpp", "ft", "fta", "ftp", "orb", "drb", "trb", "ast", "tov", "stl", "blk", "pf", "pts"];
                players = db.getPlayers(event.target.result, season, null, attributes, stats, ratings);

                statsAll = _.reduce(players, function (memo, player) {
                    var stat;
                    for (stat in player.stats) {
                        if (player.stats.hasOwnProperty(stat)) {
                            if (memo.hasOwnProperty(stat)) {
                                memo[stat].push(player.stats[stat]);
                            } else {
                                memo[stat] = [player.stats[stat]];
                            }
                        }
                    }
                    return memo;
                }, {});

                nbaQuartiles = {
                    gp: [1, 25, 52, 74, 82],
                    min: [0, 11.4857142857, 20.3759398496, 28.6286673736, 41.359375],
                    fg: [0, 1.2676056338, 2.6043478261, 4.2253994954, 10.1052631579],
                    fga: [0, 2.976744186, 6, 9.144963145, 21.96875],
                    fgp: [0, 39.6551724138, 44.2206477733, 48.7304827389, 100],
                    tp: [0, 0, 0.25, 0.9499921863, 3],
                    tpa: [0, 0.0545454545, 0.9326923077, 2.7269647696, 7.064516129],
                    tpp: [0, 0, 28.5714285714, 35.7142857143, 100],
                    ft: [0, 0.5, 1.069047619, 2.0634920635, 9.2195121951],
                    fta: [0, 0.7464788732, 1.5282193959, 2.8446447508, 10.243902439],
                    ftp: [0, 63.6363636364, 74.184204932, 81.4814814815, 100],
                    orb: [0, 0.3333333333, 0.6938888889, 1.3094934014, 4.4285714286],
                    drb: [0, 1.2272727273, 2.0930735931, 3.2760889292, 9.7317073171],
                    trb: [0, 1.625, 2.8438363737, 4.5811403509, 13.1951219512],
                    ast: [0, 0.5438596491, 1.1645833333, 2.3024060646, 11.012345679],
                    tov: [0, 0.5769230769, 0.9638501742, 1.5492063492, 3.796875],
                    stl: [0, 0.2985074627, 0.5330668605, 0.8278070175, 2.3333333333],
                    blk: [0, 0.1111111111, 0.23875, 0.5, 2.7804878049],
                    pf: [0, 1.2307692308, 1.828536436, 2.4295634921, 4],
                    pts: [0, 3.3333333333, 7.0507246377, 11.2698735321, 30.1463414634]
                };

                data = {
                    container: "league_content",
                    template: "distPlayerStats",
                    title: "Player Stat Distributions - " + season,
                    vars: {season: season, seasons: seasons}
                };
                ui.update(data, function () {
                    var scale, stat, tbody;

                    ui.dropdown($("#dist-player-stats-select-season"));

                    tbody = $("#dist-player-stats tbody");

                    // Scales for the box plots. This is not done dynamically so that the plots will be comparable across seasons.
                    scale = {
                        gp: [0, 82],
                        gs: [0, 82],
                        min: [0, 50],
                        fg: [0, 20],
                        fga: [0, 40],
                        fgp: [0, 100],
                        tp: [0, 5],
                        tpa: [0, 10],
                        tpp: [0, 100],
                        ft: [0, 15],
                        fta: [0, 25],
                        ftp: [0, 100],
                        orb: [0, 10],
                        drb: [0, 15],
                        trb: [0, 25],
                        ast: [0, 15],
                        tov: [0, 10],
                        stl: [0, 5],
                        blk: [0, 5],
                        pf: [0, 6],
                        pts: [0, 50]
                    };

                    for (stat in statsAll) {
                        if (statsAll.hasOwnProperty(stat)) {
                            tbody.append('<tr><td style="text-align: right; padding-right: 1em;">' + stat + '</td><td width="100%"><div id="' + stat + 'BoxPlot"></div></td></tr>');

                            boxPlot.create({
                                data: statsAll[stat],
                                scale: scale[stat],
                                container: stat + "BoxPlot"
                            });

                            if (nbaQuartiles.hasOwnProperty(stat)) {
                                tbody.append('<tr><td></td><td width="100%"><div id="' + stat + 'BoxPlotNba" style="margin-top: -26px"></div></td></tr>');
                                boxPlot.create({
                                    quartiles: nbaQuartiles[stat],
                                    scale: scale[stat],
                                    container: stat + "BoxPlotNba",
                                    color: "#0088cc",
                                    labels: false
                                });
                            }
                        }
                    }

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            };
        });
    }

    function distTeamStats(req) {
        viewHelpers.beforeLeague(req, function () {
            var attributes, season, seasonAttributes, seasons, stats;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            attributes = [];
            stats = ["fg", "fga", "fgp", "tp", "tpa", "tpp", "ft", "fta", "ftp", "orb", "drb", "trb", "ast", "tov", "stl", "blk", "pf", "pts", "oppPts"];
            seasonAttributes = ["won", "lost"];
            db.getTeams(null, season, attributes, stats, seasonAttributes, {}, function (teams) {
                var data, nbaStatsAll, statsAll;

                statsAll = _.reduce(teams, function (memo, team) {
                    var stat;
                    for (stat in team) {
                        if (team.hasOwnProperty(stat)) {
                            if (memo.hasOwnProperty(stat)) {
                                memo[stat].push(team[stat]);
                            } else {
                                memo[stat] = [team[stat]];
                            }
                        }
                    }
                    return memo;
                }, {});

                nbaStatsAll = {
                    won: [50, 42, 43, 40, 55, 61, 36, 58, 57, 17, 57, 46, 37, 39, 24, 52, 22, 41, 32, 62, 23, 30, 56, 48, 19, 44, 46, 24, 34, 35],
                    lost: [32, 40, 39, 42, 27, 21, 46, 24, 25, 65, 25, 36, 45, 43, 58, 30, 60, 41, 50, 20, 59, 52, 26, 34, 63, 38, 36, 58, 48, 47],
                    fg: [38.4, 38.3, 38.7, 39.3, 37.4, 38.4, 39.6, 37, 38.1, 37.7, 37.4, 39, 36.6, 37.4, 38.2, 36, 38.3, 38.1, 36.8, 37.1, 37.2, 37.3, 36.9, 36, 35.2, 36.2, 35.9, 35.6, 35, 34.3],
                    fga: [80.6, 83.7, 85.1, 83.5, 80.6, 80.8, 85.9, 76.8, 82.4, 85.5, 78.8, 82.9, 82.8, 80.4, 85.1, 78.2, 82.4, 82.6, 80.4, 80.3, 84, 81.1, 75.8, 80.5, 81.1, 78.4, 78.2, 81, 77.6, 79.8],
                    fgp: [47.6, 45.7, 45.4, 47, 46.4, 47.5, 46.1, 48.1, 46.3, 44.1, 47.5, 47.1, 44.2, 46.5, 44.9, 46.1, 46.5, 46.1, 45.7, 46.2, 44.3, 46, 48.6, 44.7, 43.4, 46.2, 45.9, 44, 45.1, 43],
                    tp: [8.1, 9.3, 8.3, 8.5, 5.9, 8.4, 8.4, 6.7, 6.4, 7.2, 7.9, 3.8, 7.1, 5.3, 5.2, 9.4, 4.2, 5.4, 6.3, 6.2, 4.8, 5.8, 5, 6.3, 6.2, 6.1, 5.4, 5.6, 4.8, 5.9],
                    tpa: [20.8, 25.4, 22.5, 22.6, 17.1, 21.1, 21.3, 18, 18.1, 19.1, 21.6, 11.3, 20.2, 15.3, 15.6, 25.6, 13.3, 15.2, 18.5, 17.3, 14.4, 15.3, 13.6, 18.3, 18.2, 17.4, 15, 16.3, 14.7, 17.2],
                    tpp: [38.8, 36.8, 36.7, 37.7, 34.7, 39.7, 39.2, 37, 35.2, 37.6, 36.5, 33.4, 35.4, 34.6, 33.5, 36.6, 31.6, 35.5, 33.8, 36.1, 33.2, 37.6, 36.5, 34.5, 34.2, 35.2, 36, 34.3, 32.7, 34.2],
                    ft: [22.7, 20.6, 20.3, 18, 24.1, 18.5, 15.7, 21.5, 18.8, 18.5, 17.5, 18.1, 19.4, 19.4, 17.7, 17.7, 18.2, 17.4, 18.9, 18.2, 18.2, 16.7, 17.8, 18, 18.9, 16.4, 17.7, 17.4, 18.4, 17.4],
                    fta: [29.6, 25.5, 25.4, 23.6, 29.3, 24.2, 20.7, 27.9, 24.1, 24.1, 22.6, 24.2, 24.8, 25.1, 24.2, 25.6, 24.1, 22.6, 26.7, 24.5, 24.4, 22.6, 23.1, 22.4, 25.3, 21.1, 23.1, 22.9, 24.4, 22.9],
                    ftp: [76.5, 80.9, 80.1, 75.9, 82.3, 76.7, 76.1, 76.9, 77.9, 76.8, 77.7, 75, 78.2, 77.1, 73.4, 69.2, 75.5, 77, 70.7, 74.3, 74.5, 73.7, 77, 80.4, 74.5, 77.9, 76.5, 75.9, 75.6, 75.7],
                    orb: [9.6, 10.3, 11.7, 10, 11, 10.1, 11.6, 9.6, 12.1, 13.2, 9.5, 11.8, 11.1, 11, 13.1, 10.5, 11.7, 10.4, 11.7, 11.8, 12.4, 11.4, 7.8, 12.1, 10.4, 9.3, 10, 11.1, 10.3, 10.5],
                    drb: [32.3, 30.1, 31.1, 30.2, 31.8, 31.7, 28.9, 32.5, 31.9, 31.2, 31.9, 29.2, 32.4, 28.5, 30.8, 32.7, 28.6, 31.4, 30.5, 32.4, 29, 27.3, 31, 27.2, 29.9, 30, 30.1, 29.8, 29.8, 30.2],
                    trb: [42, 40.5, 42.8, 40.2, 42.8, 41.9, 40.5, 42.1, 44, 44.4, 41.4, 41, 43.5, 39.5, 43.9, 43.2, 40.3, 41.8, 42.1, 44.2, 41.3, 38.6, 38.8, 39.3, 40.3, 39.3, 40.1, 40.8, 40.1, 40.8],
                    ast: [22.1, 21.4, 23.8, 23.7, 20.4, 22.4, 22.5, 20, 22, 20.1, 23.8, 20.6, 19.6, 23.4, 20.4, 20, 21.9, 22.7, 22.1, 22.3, 19.4, 21.1, 23.4, 21.2, 21, 22, 20.6, 21, 21.1, 18.8],
                    tov: [13.8, 13.3, 12.8, 13.6, 13.5, 12.9, 14.1, 13.2, 12.6, 16.5, 13.5, 13.4, 14.8, 13.6, 15.6, 14.4, 14, 12.2, 15.5, 13.5, 14.7, 12.2, 13.6, 12.4, 13.7, 12.8, 12.2, 13, 13.7, 12.5],
                    stl: [7.4, 7.6, 7.1, 6.6, 8, 7.3, 9, 6.6, 7.3, 7.2, 6.8, 9.4, 7.1, 7.7, 7.4, 6.7, 7.1, 7.6, 7.1, 7.2, 8.1, 7.3, 8.2, 8, 6.6, 6.1, 7.6, 5.6, 6.4, 7.5],
                    blk: [4.3, 5.8, 4.5, 4.4, 5.9, 4.5, 5, 5.2, 5.1, 5.1, 4.3, 5.4, 5.6, 5.9, 4.8, 4.7, 4.3, 4.3, 4.9, 5.7, 6.1, 4, 4.2, 4.4, 4.2, 4.2, 4.4, 4.7, 5.3, 4.9],
                    pf: [21, 21.3, 20, 20.3, 22.4, 19, 22, 20.4, 19, 22.3, 19.2, 20.8, 21.7, 22.7, 22, 20, 22, 19.4, 21.1, 20, 22.6, 19.9, 20.5, 19.3, 20.1, 19, 21, 22, 20, 20.5],
                    pts: [107.5, 106.5, 105.9, 105, 104.8, 103.7, 103.4, 102.1, 101.5, 101.1, 100.2, 99.9, 99.8, 99.4, 99.4, 99.2, 99.1, 99, 98.6, 98.6, 97.3, 97, 96.5, 96.3, 95.5, 95, 94.9, 94.2, 93.3, 91.9],
                    oppPts: [102.7, 105.7, 103.7, 105.9, 101, 98, 105.7, 94.6, 95.4, 107.7, 96, 97.6, 100.9, 101.3, 104.7, 93.7, 105.4, 97.5, 101.8, 91.3, 104.7, 100.6, 91.1, 94.8, 104.5, 95.8, 94, 100.4, 97.3, 92.7]
                };

                data = {
                    container: "league_content",
                    template: "distTeamStats",
                    title: "Team Stat Distributions - " + season,
                    vars: {season: season, seasons: seasons}
                };
                ui.update(data, function () {
                    var scale, stat, tbody;

                    ui.dropdown($("#dist-team-stats-select-season"));

                    tbody = $("#dist-team-stats tbody");

                    // Scales for the box plots. This is not done dynamically so that the plots will be comparable across seasons.
                    scale = {
                        won: [0, 82],
                        lost: [0, 82],
                        fg: [30, 70],
                        fga: [60, 140],
                        fgp: [35, 50],
                        tp: [0, 15],
                        tpa: [0, 30],
                        tpp: [20, 50],
                        ft: [5, 25],
                        fta: [10, 30],
                        ftp: [60, 90],
                        orb: [0, 30],
                        drb: [20, 60],
                        trb: [30, 90],
                        ast: [15, 40],
                        tov: [5, 20],
                        stl: [0, 15],
                        blk: [0, 15],
                        pf: [5, 25],
                        pts: [80, 130],
                        oppPts: [80, 130]
                    };

                    for (stat in statsAll) {
                        if (statsAll.hasOwnProperty(stat)) {
                            tbody.append('<tr><td style="text-align: right; padding-right: 1em;">' + stat + '</td><td width="100%"><div id="' + stat + 'BoxPlot"></div></td></tr>');

                            boxPlot.create({
                                data: statsAll[stat],
                                scale: scale[stat],
                                container: stat + "BoxPlot"
                            });

                            if (nbaStatsAll.hasOwnProperty(stat)) {
                                tbody.append('<tr><td></td><td width="100%"><div id="' + stat + 'BoxPlotNba" style="margin-top: -26px"></div></td></tr>');
                                boxPlot.create({
                                    data: nbaStatsAll[stat],
                                    scale: scale[stat],
                                    container: stat + "BoxPlotNba",
                                    color: "#0088cc",
                                    labels: false
                                });
                            }
                        }
                    }

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            });
        });
    }

    function playerShotLocations(req) {
        viewHelpers.beforeLeague(req, function () {
            var season, seasons;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            g.dbl.transaction(["players"]).objectStore("players").getAll().onsuccess = function (event) {
                var attributes, data, players, ratings, stats;

                attributes = ["pid", "name", "pos", "age", "injury"];
                ratings = ["skills"];
                stats = ["abbrev", "gp", "gs", "min", "fgAtRim", "fgaAtRim", "fgpAtRim", "fgLowPost", "fgaLowPost", "fgpLowPost", "fgMidRange", "fgaMidRange", "fgpMidRange", "tp", "tpa", "tpp"];
                players = db.getPlayers(event.target.result, season, null, attributes, stats, ratings, {showRookies: true});

                data = {
                    container: "league_content",
                    template: "playerShotLocations",
                    title: "Player Shot Locations - " + season,
                    vars: {season: season, seasons: seasons}
                };
                ui.update(data, function () {
                    ui.dropdown($('#player-shot-locations-select-season'));

                    ui.datatable($("#player-shot-locations"), 0, _.map(players, function (p) {
                        return [helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills), p.pos, '<a href="/l/' + g.lid + '/roster/' + p.stats.abbrev + '/' + season + '">' + p.stats.abbrev + '</a>', String(p.stats.gp), String(p.stats.gs), helpers.round(p.stats.min, 1), helpers.round(p.stats.fgAtRim, 1), helpers.round(p.stats.fgaAtRim, 1), helpers.round(p.stats.fgpAtRim, 1), helpers.round(p.stats.fgLowPost, 1), helpers.round(p.stats.fgaLowPost, 1), helpers.round(p.stats.fgpLowPost, 1), helpers.round(p.stats.fgMidRange, 1), helpers.round(p.stats.fgaMidRange, 1), helpers.round(p.stats.fgpMidRange, 1), helpers.round(p.stats.tp, 1), helpers.round(p.stats.tpa, 1), helpers.round(p.stats.tpp, 1)];
                    }));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            };
        });
    }

    function teamShotLocations(req) {
        viewHelpers.beforeLeague(req, function () {
            var attributes, season, seasonAttributes, seasons, stats;

            season = helpers.validateSeason(req.params.season);
            seasons = helpers.getSeasons(season);

            if (season < g.season) {
                g.realtimeUpdate = false;
            }

            attributes = ["abbrev"];
            stats = ["gp", "fgAtRim", "fgaAtRim", "fgpAtRim", "fgLowPost", "fgaLowPost", "fgpLowPost", "fgMidRange", "fgaMidRange", "fgpMidRange", "tp", "tpa", "tpp"];
            seasonAttributes = ["won", "lost"];
            db.getTeams(null, season, attributes, stats, seasonAttributes, {}, function (teams) {
                var data;

                data = {
                    container: "league_content",
                    template: "teamShotLocations",
                    title: "Team Shot Locations - " + season,
                    vars: {season: season, seasons: seasons}
                };
                ui.update(data, function () {
                    ui.dropdown($('#team-shot-locations-select-season'));

                    ui.datatableSinglePage($("#team-shot-locations"), 2, _.map(teams, function (t) {
                        return ['<a href="/l/' + g.lid + '/roster/' + t.abbrev + '">' + t.abbrev + '</a>', String(t.gp), String(t.won), String(t.lost), helpers.round(t.fgAtRim, 1), helpers.round(t.fgaAtRim, 1), helpers.round(t.fgpAtRim, 1), helpers.round(t.fgLowPost, 1), helpers.round(t.fgaLowPost, 1), helpers.round(t.fgpLowPost, 1), helpers.round(t.fgMidRange, 1), helpers.round(t.fgaMidRange, 1), helpers.round(t.fgpMidRange, 1), helpers.round(t.tp, 1), helpers.round(t.tpa, 1), helpers.round(t.tpp, 1)];
                    }));

                    if (req.raw.cb !== undefined) {
                        req.raw.cb();
                    }
                });
            });
        });
    }

    return {
        initDb: initDb,

        dashboard: dashboard,
        newLeague: newLeague,
        deleteLeague: deleteLeague,
        manual: manual,

        leagueDashboard: leagueDashboard,
        inbox: inbox,
        message: message,
        standings: standings,
        playoffs: playoffs,
        leagueFinances: leagueFinances,
        history: history,
        roster: roster,
        schedule: schedule,
        teamFinances: teamFinances,
        teamHistory: teamHistory,
        freeAgents: freeAgents_,
        trade: trade,
        draft: draft_,
        gameLog: gameLog,
        leaders: leaders,
        playerRatings: playerRatings,
        playerStats: playerStats,
        teamStats: teamStats,
        player: player_,
        negotiationList: negotiationList,
        negotiation: negotiation,
        distPlayerRatings: distPlayerRatings,
        distPlayerStats: distPlayerStats,
        distTeamStats: distTeamStats,
        playerShotLocations: playerShotLocations,
        teamShotLocations: teamShotLocations
    };
});