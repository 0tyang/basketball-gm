define(["db", "lib/bluebird"], function (db, Promise) {
    "use strict";

    function get(options) {
        options = options !== undefined ? options : {};
        options.ot = options.ot !== undefined ? options.ot : null;
        options.key = options.key !== undefined ? options.key : null;

        return new Promise(function (resolve, reject) {
            db.getObjectStore(options.ot, "awards", "awards").get(options.key).onsuccess = function (event) {
                resolve(event.target.result);
            };
        });
    }

    return {
        get: get
    };
});