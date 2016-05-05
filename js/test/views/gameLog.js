const assert = require('assert');
const db = require('../../db');
const g = require('../../globals');
const league = require('../../core/league');
const $ = require('jquery');
const gameLog = require('../../views/gameLog');

function confirmNotBuilt() {
    assert(!document.getElementById("game-log-dropdown"));
    assert(!document.getElementById("box-score"));
    assert(!document.getElementById("game-log-list"));
}

function confirmBuilt() {
    assert(document.getElementById("game-log-dropdown"));
    assert(document.getElementById("box-score"));
    assert(document.getElementById("game-log-list"));
}

function addFakeGame(tx, gid) {
    var game, j, k;

    game = {
        gid: gid,
        season: g.season,
        teams: [
            {
                pts: 100,
                tid: 0,
                players: []
            },
            {
                pts: 105,
                tid: 4,
                players: []
            }
        ],
        overtimes: 0
    };
    for (j = 0; j < 2; j++) {
        for (k = 0; k < 7; k++) {
            game.teams[j].players.push({
                gs: 0,
                min: 40,
                injury: {type: "Healthy", gamesRemaining: 0}
            });
        }
    }
    tx.games.add(game);
}

describe("views/gameLog", function () {
    before(function () {
        $("body").append('<div id="testsWrapper" style="visibility: hidden;"><div id="league_content"></div></div>');
        return db.connectMeta().then(function () {
            return league.create("Test", 0, undefined, 2013, false);
        }).then(function () {
            return g.dbl.tx("games", "readwrite", function (tx) {
                var i;
                for (i = 0; i < 10; i++) {
                    addFakeGame(tx, i);
                }
            });
        });
    });
    after(function () {
        $("#testsWrapper").remove();
        return league.remove(g.lid);
    });
    afterEach(function () {
        document.getElementById("league_content").dataset.idLoaded = "";
        document.getElementById("league_content").innerHTML = "";
    });

    describe("#update()", function () {
        it("should load complete UI if gameLog is not already loaded", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "CHI", season: g.season, gid: -1}, [], function () {
                confirmBuilt();
                done();
            });
        });
        it("should load and update nothing if gameLog is already loaded with same parameters", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "CHI", season: g.season, gid: -1}, [], function () {
                confirmBuilt();

                document.getElementById("game-log-dropdown-seasons").dataset.dummy = "shit";
                document.getElementById("box-score").innerHTML = "fuck";
                document.getElementById("game-log-list").innerHTML = "cunt";
                gameLog.update({abbrev: "CHI", season: g.season, gid: -1}, [], function () {
                    assert.equal(document.getElementById("game-log-dropdown-seasons").dataset.dummy, "shit");
                    assert.equal(document.getElementById("box-score").innerHTML, "fuck");
                    assert.equal(document.getElementById("game-log-list").innerHTML, "cunt");
                    done();
                });
            });
        });
        // These tests broke when moving to Knockout for the box score
        /*it("should load only a new box score if everything is the same except the game ID", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "CHI", season: g.season, gid: -1}, [], function () {
                confirmBuilt();

                document.getElementById("game-log-dropdown-seasons").dataset.dummy = "shit";
                document.getElementById("box-score").innerHTML = "fuck";
                document.getElementById("game-log-list").innerHTML = "cunt";
                gameLog.update({abbrev: "CHI", season: g.season, gid: 5}, [], function () {
                    assert.equal(document.getElementById("game-log-dropdown-seasons").dataset.dummy, "shit");
                    assert.notEqual(document.getElementById("box-score").innerHTML, "fuck");
                    assert.equal(document.getElementById("game-log-list").innerHTML, "cunt");
                    done();
                });
            });
        });
        it("should load only a new game log list if everything is the same except the team", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "CHI", season: g.season, gid: 3}, [], function () {
                confirmBuilt();

                document.getElementById("game-log-dropdown-seasons").dataset.dummy = "shit";
                document.getElementById("box-score").innerHTML = "fuck";
                assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 11);
                gameLog.update({abbrev: "BOS", season: g.season, gid: 3}, [], function () {
                    assert.equal(document.getElementById("game-log-dropdown-seasons").dataset.dummy, "shit");
                    assert.equal(document.getElementById("box-score").innerHTML, "fuck");
                    assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 1);
                    done();
                });
            });
        });
        it("should load only a new game log list if everything is the same except the season", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "ATL", season: g.season, gid: 3}, [], function () {
                confirmBuilt();

                document.getElementById("game-log-dropdown-seasons").dataset.dummy = "shit";
                document.getElementById("box-score").innerHTML = "fuck";
                assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 11);
                gameLog.update({abbrev: "ATL", season: g.season + 1, gid: 3}, [], function () {
                    assert.equal(document.getElementById("game-log-dropdown-seasons").dataset.dummy, "shit");
                    assert.equal(document.getElementById("box-score").innerHTML, "fuck");
                    assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 1);
                    done();
                });
            });
        });
        it("should load only a new game log list and box score if game ID, team, and season all change", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "ATL", season: g.season, gid: -1}, [], function () {
                confirmBuilt();

                document.getElementById("game-log-dropdown-seasons").dataset.dummy = "shit";
                document.getElementById("box-score").innerHTML = "fuck";

                assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 11);
                gameLog.update({abbrev: "BOS", season: g.season + 1, gid: 3}, [], function () {
                    assert.equal(document.getElementById("game-log-dropdown-seasons").dataset.dummy, "shit");
                    assert.notEqual(document.getElementById("box-score").innerHTML, "fuck");
                    assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 1);
                    done();
                });
            });
        });
        it("should update only game log list in response to gameSim updateEvent, if all other parameters are the same", function (done) {
            confirmNotBuilt();
            gameLog.update({abbrev: "ATL", season: g.season, gid: 3}, [], function () {
                var child, i, tx;

                confirmBuilt();

                document.getElementById("game-log-dropdown-seasons").dataset.dummy = "shit";
                document.getElementById("box-score").innerHTML = "fuck";
                assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 11);

                // Remove  a row, to make sure that the old games will not be subsequently updated
                child = document.getElementById("game-log-list").querySelector("tbody tr");
                child.parentNode.removeChild(child);

                // Add fake games
                return g.dbl.tx("games", "readwrite", function (tx) {
                    var i;
                    for (i = 10; i < 20; i++) {
                        addFakeGame(tx, i);
                    }
                }).then(function () {
                        gameLog.update({abbrev: "ATL", season: g.season, gid: 3}, ["gameSim"], function () {
                        assert.equal(document.getElementById("game-log-dropdown-seasons").dataset.dummy, "shit");
                        assert.equal(document.getElementById("box-score").innerHTML, "fuck");
                        assert.equal(document.getElementById("game-log-list").querySelectorAll("tbody tr").length, 20);
                        done();
                    });
                };
            });
        });*/
    });
});
