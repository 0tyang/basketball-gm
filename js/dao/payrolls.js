define(["db", "lib/bluebird"], function (db, Promise) {
    "use strict";

    /**
     * Get the total current payroll for a team.
     * 
     * This includes players who have been released but are still owed money from their old contracts.
     * 
     * @memberOf db
     * @param {IDBTransaction|null} ot An IndexedDB transaction on players and releasedPlayers; if null is passed, then a new transaction will be used.
     * @param {number} tid Team ID.
     * @param {Promise.<number, Array=>} cb Array; first argument is the payroll in thousands of dollars, second argument is the array of contract objects from dao.contracts.getAll.
     */
    function get(options) {
        options = options !== undefined ? options : {};
        options.ot = options.ot !== undefined ? options.ot : null;
        options.tid = options.tid !== undefined ? options.tid : null;

        return new Promise(function (resolve, reject) {
            if (options.tid === null) {
                reject("Need to supply a tid to dao.payrolls.getAll");
            }

            require("dao/contracts").getAll({ot: options.ot, tid: options.tid}).then(function (contracts) {
                var i, payroll;

                payroll = 0;
                for (i = 0; i < contracts.length; i++) {
                    payroll += contracts[i].amount;  // No need to check exp, since anyone without a contract for the current season will not have an entry
                }

                resolve(payroll, contracts);
            });
        });
    }

    return {
        get: get
    };
});