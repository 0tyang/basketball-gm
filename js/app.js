requirejs.config({
    baseUrl: "/js",
    shim: {
        "../gen/templates": {
            deps: ["lib/handlebars.runtime", "util/templateHelpers"]
        },
        "lib/bootstrap-dropdown": {
            deps: ["lib/jquery"]
        },
        "lib/boxPlot": {
            exports: "boxPlot"
        },
        "lib/davis": {
            deps: ["lib/jquery"],
            exports: "Davis"
        },
        "lib/davis.google_analytics": {
            deps: ["lib/davis"]
        },
        "lib/faces": {
            deps: ["lib/raphael"],
            exports: "faces"
        },
        "lib/handlebars.runtime": {
            exports: "Handlebars"
        },
        "lib/IndexedDB-getAll-shim": {},
        "lib/jquery-ui": {
            deps: ["lib/jquery"]
        },
        "lib/jquery": {
            exports: "$"
        },
        "lib/jquery.dataTables": {
            deps: ["lib/jquery"]
        },
        "lib/jquery.dataTables.bbgmSorting": {
            deps: ["lib/jquery", "lib/jquery.dataTables"]
        },
        "lib/jquery.dataTables.bootstrap": {
            deps: ["lib/jquery", "lib/jquery.dataTables"]
        },
        "lib/jquery.tabSlideOut": {
            deps: ["lib/jquery"]
        },
        "lib/raphael": {
            exports: "Raphael"
        },
        "lib/underscore": {
            exports: "_"
        }
    }
});

requirejs(["db", "views", "ui", "lib/davis", "lib/jquery", "util/helpers", "../gen/templates", "lib/bootstrap-dropdown", "lib/davis.google_analytics", "lib/IndexedDB-getAll-shim", "lib/jquery-ui", "lib/jquery.dataTables", "lib/jquery.dataTables.bbgmSorting", "lib/jquery.dataTables.bootstrap", "lib/jquery.tabSlideOut"], function (db, views, ui, Davis, $, helpers) {
    "use strict";

    ui.init();

    // Can't proceed any further without IndexedDB support
    /*window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
    window.IDBObjectStore = window.IDBObjectStore || window.webkitIDBObjectStore;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;*/
    if (indexedDB === undefined) {
        var data = {
            container: "content",
            template: "browserError",
            title: "Error",
            vars: {}
        };
        ui.update(data);
        return;
    }

    db.connectMeta(function () {
        var app = new Davis(function () {
            this.configure(function () {
                this.generateRequestOnPageLoad = true;
                this.handleRouteNotFound = true;
                this.linkSelector = "a:not([data-no-davis=true])";
            });

            this.use(Davis.googleAnalytics);

            this.bind("routeNotFound", function (req) {
                helpers.error("Page not found.", req);
            });

            // Non-league views
            this.get("/init_db", views.init_db);
            this.get("/", views.dashboard);
            this.get("/new_league", views.newLeague);
            this.post("/new_league", views.newLeague);
            this.post("/delete_league", views.deleteLeague);
            this.get("/manual", views.manual);
            this.get("/manual/:page", views.manual);

            // League views
            this.get("/l/:lid", views.leagueDashboard);
            this.get("/l/:lid/standings", views.standings);
            this.get("/l/:lid/standings/:season", views.standings);
            this.get("/l/:lid/playoffs", views.playoffs);
            this.get("/l/:lid/playoffs/:season", views.playoffs);
            this.get("/l/:lid/finances", views.finances);
            this.get("/l/:lid/history", views.history);
            this.get("/l/:lid/history/:season", views.history);
            this.get("/l/:lid/roster", views.roster);
            this.get("/l/:lid/roster/:abbrev", views.roster);
            this.get("/l/:lid/roster/:abbrev/:season", views.roster);
            this.get("/l/:lid/schedule", views.schedule);
            this.get("/l/:lid/team_history", views.teamHistory);
            this.get("/l/:lid/free_agents", views.freeAgents);
            this.get("/l/:lid/trade", views.trade);
            this.post("/l/:lid/trade", views.trade);
            this.get("/l/:lid/draft", views.draft);
            this.get("/l/:lid/draft/:season", views.draft);
            this.get("/l/:lid/game_log", views.gameLog);
            this.get("/l/:lid/game_log/:abbrev", views.gameLog);
            this.get("/l/:lid/game_log/:abbrev/:season", views.gameLog);
            this.get("/l/:lid/game_log/:abbrev/:season/:gid", views.gameLog);
            this.get("/l/:lid/game_log/:abbrev/:season/:gid/:view", views.gameLog);
            this.get("/l/:lid/leaders", views.leaders);
            this.get("/l/:lid/leaders/:season", views.leaders);
            this.get("/l/:lid/player_ratings", views.playerRatings);
            this.get("/l/:lid/player_ratings/:season", views.playerRatings);
            this.get("/l/:lid/player_stats", views.playerStats);
            this.get("/l/:lid/player_stats/:season", views.playerStats);
            this.get("/l/:lid/team_stats", views.teamStats);
            this.get("/l/:lid/team_stats/:season", views.teamStats);
            this.get("/l/:lid/player/:pid", views.player);
            this.get("/l/:lid/negotiation", views.negotiationList);
            this.get("/l/:lid/negotiation/:pid", views.negotiation);
            this.post("/l/:lid/negotiation/:pid", views.negotiation);
            this.get("/l/:lid/dist_player_ratings", views.distPlayerRatings);
            this.get("/l/:lid/dist_player_ratings/:season", views.distPlayerRatings);
            this.get("/l/:lid/dist_player_stats", views.distPlayerStats);
            this.get("/l/:lid/dist_player_stats/:season", views.distPlayerStats);
            this.get("/l/:lid/dist_team_stats", views.distTeamStats);
            this.get("/l/:lid/dist_team_stats/:season", views.distTeamStats);
            this.get("/l/:lid/player_shot_locations", views.playerShotLocations);
            this.get("/l/:lid/player_shot_locations/:season", views.playerShotLocations);
            this.get("/l/:lid/team_shot_locations", views.teamShotLocations);
            this.get("/l/:lid/team_shot_locations/:season", views.teamShotLocations);
        });

        $(document).ready(function () {
            app.start();
        });
    });
});
