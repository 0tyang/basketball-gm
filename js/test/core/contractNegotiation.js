/**
 * @name test.core.contractNegotiation
 * @namespace Tests for core.contractNegotiation.
 */
define(["db", "core/contractNegotiation", "core/league"], function (db, contractNegotiation, league) {
    "use strict";

    describe("core/contractNegotiation", function () {
        before(function (done) {
            db.connectMeta(function () {
                league.create("Test", 14, "random", function () {
                    done();
                });
            });
        });
        after(function (done) {
            league.remove(g.lid, done);
        });
        afterEach(function (done) {
            // Set to a trade with team 1 and no players;
            contractNegotiation.cancelAll(done);
        });

        describe("#create()", function () {
            it("should start a negotiation with a free agent", function (done) {
                var transaction;

                transaction = g.dbl.transaction(["gameAttributes", "negotiations", "players"], "readwrite");

                contractNegotiation.create(transaction, 7, false, function (error) {
                    (typeof error).should.equal("undefined");

                    transaction.objectStore("negotiations").getAll().onsuccess = function (event) {
                        var negotiations;

                        negotiations = event.target.result;
                        negotiations.length.should.equal(1);
                        negotiations[0].pid.should.equal(7);

                        done();
                    };
                });
            });
            it("should fail to start a negotiation with anyone but a free agent", function (done) {
                var transaction;

                transaction = g.dbl.transaction(["gameAttributes", "negotiations", "players"], "readwrite");

                contractNegotiation.create(transaction, 70, false, function (error) {
                    error.should.equal("Player 70 is not a free agent.");

                    transaction.objectStore("negotiations").getAll().onsuccess = function (event) {
                        var negotiations;

                        negotiations = event.target.result;
                        negotiations.length.should.equal(0);

                        done();
                    };
                });
            });
            it("should only allow one concurrent negotiation if resigning is false", function (done) {
                var transaction;

                transaction = g.dbl.transaction(["gameAttributes", "negotiations", "players"], "readwrite");

                contractNegotiation.create(transaction, 7, false, function (error) {
                    (typeof error).should.equal("undefined");

                    transaction.objectStore("negotiations").getAll().onsuccess = function (event) {
                        var negotiations;

                        negotiations = event.target.result;
                        negotiations.length.should.equal(1);
                        negotiations[0].pid.should.equal(7);

                        contractNegotiation.create(transaction, 8, false, function (error) {
                            error.should.equal("You cannot initiate a new negotiaion while game simulation is in progress or a previous contract negotiation is in process.");

                            transaction.objectStore("negotiations").getAll().onsuccess = function (event) {
                                var negotiations;

                                negotiations = event.target.result;
                                negotiations.length.should.equal(1);
                                negotiations[0].pid.should.equal(7);

                                done();
                            };
                        });
                    };
                });
            });
            it("should allow multiple concurrent negotiations if resigning is true", function (done) {
                var transaction;

                transaction = g.dbl.transaction(["gameAttributes", "negotiations", "players"], "readwrite");

                contractNegotiation.create(transaction, 7, true, function (error) {
                    (typeof error).should.equal("undefined");

                    transaction.objectStore("negotiations").getAll().onsuccess = function (event) {
                        var negotiations;

                        negotiations = event.target.result;
                        negotiations.length.should.equal(1);
                        negotiations[0].pid.should.equal(7);

                        contractNegotiation.create(transaction, 8, true, function (error) {
                            (typeof error).should.equal("undefined");

                            transaction.objectStore("negotiations").getAll().onsuccess = function (event) {
                                var negotiations;

                                negotiations = event.target.result;
                                negotiations.length.should.equal(2);
                                negotiations[0].pid.should.equal(7);
                                negotiations[1].pid.should.equal(8);

                                done();
                            };
                        });
                    };
                });
            });
            // The use of transactions here might cause race conditions
            it("should not allow a negotiation to start if there are already 15 players on the user's roster, unless resigning is true", function (done) {
                var tx;

                tx = g.dbl.transaction(["gameAttributes", "negotiations", "players"], "readwrite");

                tx.objectStore("players").openCursor(7).onsuccess = function (event) {
                    var cursor, p;

                    cursor = event.target.result;
                    p = cursor.value;
                    p.tid = g.userTid;

                    cursor.update(p);

                    contractNegotiation.create(tx, 8, false, function (error) {
                        error.should.equal("Your roster is full. Before you can sign a free agent, you'll have to buy out or release one of your current players.");

                        tx.objectStore("negotiations").getAll().onsuccess = function (event) {
                            var negotiations;

                            negotiations = event.target.result;
                            negotiations.length.should.equal(0);

                            contractNegotiation.create(tx, 8, true, function (error) {
                                (typeof error).should.equal("undefined");

                                tx.objectStore("negotiations").getAll().onsuccess = function (event) {
                                    var negotiations;

                                    negotiations = event.target.result;
                                    negotiations.length.should.equal(1);
                                    negotiations[0].pid.should.equal(8);

                                    tx.objectStore("players").openCursor(7).onsuccess = function (event) {
                                        var cursor, p;

                                        cursor = event.target.result;
                                        p = cursor.value;
                                        p.tid = c.PLAYER_FREE_AGENT;

                                        cursor.update(p);

                                        done();
                                    };
                                };
                            });
                        };
                    });
                };
            });
        });
    });
});