"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGroupIOArray = exports.groupArray = void 0;
function groupArray(arr, req) {
    if (!req.groupBy) {
        return arr;
    }
    var keys = [];
    var result = {};
    arr.forEach(function (a) {
        var v = a[req.groupBy];
        if (!["string", "number"].includes(typeof v)) {
            throw new Error("Try to group by invalid type value: " + (typeof v));
        }
        if (keys.includes(v)) {
            result[v].push(a);
        }
        else {
            keys.push(v);
            result[v] = [a];
        }
    });
    return result;
}
exports.groupArray = groupArray;
function makeGroupIOArray(arr) {
    return function (req) {
        try {
            var result = groupArray(arr, req);
            return Promise.resolve(result);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
}
exports.makeGroupIOArray = makeGroupIOArray;
