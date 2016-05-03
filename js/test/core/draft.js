var assert = require('assert');
var db = require('../../db');
var g = require('../../globals');
var draft = require('../../core/draft');
var league = require('../../core/league');
var team = require('../../core/team');
var sampleTiebreakers = require('../fixtures/sampleTiebreakers.js');
var _ = require('underscore');
var Promise = require('bluebird');

describe("core/draft", function () {
    var testDraftUntilUserOrEnd, testDraftUser, userPick1, userPick2;

    before(function () {
        return db.connectMeta().then(function () {
            return league.create("Test", 15, undefined, 2015, false);
        });
    });
    after(function () {
        return league.remove(g.lid);
    });

    testDraftUntilUserOrEnd = function (numNow, numTotal) {
        return draft.untilUserOrEnd().then(function (pids) {
            assert.equal(pids.length, numNow);
            return g.dbl.players.index('tid').getAll(g.PLAYER.UNDRAFTED).then(function (players) {
                assert.equal(players.length, 140 - numTotal);
            });
        });
    };

    testDraftUser = function (round) {
        return draft.getOrder().then(function (draftOrder) {
            var pick;

            pick = draftOrder.shift();
            assert.equal(pick.round, round);
            if (round === 1) {
                assert.equal(pick.pick, userPick1);
            } else {
                assert.equal(pick.pick, userPick2 - 30);
            }
            assert.equal(pick.tid, g.userTid);

            return g.dbl.players.index('tid').get(g.PLAYER.UNDRAFTED).then(function (p) {
                return draft.selectPlayer(pick, p.pid).then(function () {
                    return g.dbl.players.get(p.pid).then(function (p2) {
                        assert.equal(p2.tid, g.userTid);
                        return draft.setOrder(null, draftOrder);
                    });
                });
            });
        });
    };

    describe("#genPlayers()", function () {
        it("should generate 70 players for the draft", function () {
            return g.dbl.tx(["players", "teams", "teamSeasons"], "readwrite", function (tx) {
                return draft.genPlayers(tx, g.PLAYER.UNDRAFTED, null, null);
            }).then(function () {
                return g.dbl.players.index('draft.year').count(g.season).then(function (numPlayers) {
                    assert.equal(numPlayers, 140); // 70 from original league, 70 from this
                });
            });
        });
    });

    describe("#genOrder()", function () {
        var draftResults, i;

        before(function () {
            return g.dbl.tx(["teams", "teamSeasons"], "readwrite", function (tx) {
                // Load static data
                return tx.teamSeasons.iterate(function (teamSeason) {
                    tx.teamSeasons.delete(teamSeason.rid);
                }).then(function () {
                    return tx.teams.iterate(function (t) {
                        var st, teamSeasons;

                        st = sampleTiebreakers.teams[t.tid];
                        teamSeasons = st.seasons;
                        delete st.seasons;
                        delete st.stats;

                        return Promise.each(teamSeasons, function (teamSeason) {
                            teamSeason.tid = t.tid;
                            return tx.teamSeasons.put(teamSeason);
                        }).then(function () {
                            return st;
                        });
                    });
                });
            });
        });

        it("should schedule 60 draft picks", function () {
            return g.dbl.tx(["draftOrder", "draftPicks", "teams", "teamSeasons", "players"], "readwrite", function (tx) {
                // Load static data
                return draft.genOrder(tx).then(function () {
                    return draft.getOrder(tx);
                }).then(function (draftOrder) {
                    assert.equal(draftOrder.length, 60);
                    draftResults = _.pluck(draftOrder, "originalTid");
                    userPick1 = draftResults.indexOf(g.userTid) + 1;
                    userPick2 = draftResults.lastIndexOf(g.userTid) + 1;
                });
            });
        });

        it("should give the 3 teams with the lowest win percentage picks not lower than 6", function () {
            var tids = [16, 28, 21]; // teams with lowest winp
            for (i = 0; i < tids.length; i++) {
                assert(draftResults.indexOf(tids[i]) >= 0);
                assert(draftResults.indexOf(tids[i]) <= i + 3);
                assert.equal(draftResults.lastIndexOf(tids[i]), 30 + i);
            }
        });

        it("should give lottery team with better record than playoff teams a pick based on actual record for round 2", function () {
            var pofteams = [23, 10, 18, 24, 14];

            // good record lottery team
            assert(draftResults.indexOf(17) >= 0);
            assert(draftResults.indexOf(17) <= 13);
            assert.equal(draftResults.lastIndexOf(17), 48);

            // bad record playoff team
            for (i = 0; i < pofteams.length; i++) {
                assert(draftResults.indexOf(pofteams[i]) > draftResults.indexOf(17));
                assert(draftResults.lastIndexOf(pofteams[i]) < draftResults.lastIndexOf(17));
            }
        });

        it("should give reverse round 2 order for teams with the same record", function () {
            var j, r1picks, r2picks, sameRec, tids;
            sameRec = [
                [3, 15, 25],
                [10, 18],
                [13, 26]
            ];
            for (i = 0; i < sameRec.length; i++) {
                tids = sameRec[i];
                r1picks = [];
                r2picks = [];
                for (j = 0; j < 30; j++) {
                    if (tids.indexOf(draftResults[j]) > -1) {
                        r1picks.push(draftResults[j]);
                    }
                }
                for (j = 59; j > 29; j--) {
                    if (tids.indexOf(draftResults[j]) > -1) {
                        r2picks.push(draftResults[j]);
                    }
                }
                assert.equal(r1picks.length, r2picks.length);
                for (j = 0; j < r1picks.length; j++) {
                    assert.equal(r1picks[j], r2picks[j]);
                }
            }
        });
    });

    describe("#updateChances()", function () {
        it("should distribute combinations to teams with the same record", function () {
            return g.dbl.tx(["draftOrder", "draftPicks", "teams", "teamSeasons"], "readwrite", function (tx) {
                return team.filter({
                    ot: tx,
                    attrs: ["tid", "cid"],
                    seasonAttrs: ["winp", "playoffRoundsWon"],
                    season: g.season
                }).then(function (teams) {
                    var chances, i, j, maxIdx, sameRec, tids, value;
                    chances = [250, 199, 156, 119, 88, 63, 43, 28, 17, 11, 8, 7, 6, 5];
                    // index instead of tid
                    sameRec = [
                        [6, 7, 8],
                        [10, 11, 12]
                    ];
                    draft.lotterySort(teams);
                    draft.updateChances(chances, teams, false);
                    for (i = 0; i < sameRec.length; i++) {
                        tids = sameRec[i];
                        value = 0;
                        for (j = 0; j < tids.length; j++) {
                            if (value === 0) {
                                value = chances[tids[j]];
                            } else {
                                assert.equal(value, chances[tids[j]]);
                            }
                        }
                    }

                    // test if isFinal is true
                    draft.updateChances(chances, teams, true);
                    for (i = 0; i < sameRec.length; i++) {
                        tids = sameRec[i];
                        value = 0;
                        maxIdx = -1;
                        for (j = tids.length - 1; j >= 0; j--) {
                            if (value <= chances[tids[j]]) {
                                value = chances[tids[j]];
                                maxIdx = j;
                            }
                        }
                        assert.equal(maxIdx, 0);
                    }
                });
            });
        });
    });

    describe("#selectPlayer() and #untilUserOrEnd()", function () {
        it("should draft players before the user's team first round pick", function () {
            return testDraftUntilUserOrEnd(userPick1 - 1, userPick1 - 1);
        });
        it("should then allow the user to draft in the first round", function () {
            return testDraftUser(1);
        });
        it("when called again after the user drafts, should draft players before the user's second round pick comes up", function () {
            return testDraftUntilUserOrEnd(userPick2 - userPick1 - 1, userPick2 - 1);
        });
        it("should then allow the user to draft in the second round", function () {
            return testDraftUser(2);
        });
        it("when called again after the user drafts, should draft more players to finish the draft", function () {
            var after = 60 - userPick2;
            return testDraftUntilUserOrEnd(after, userPick2 + after);
        });
    });
});

