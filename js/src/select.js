"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSelectIOArray = exports.selectArray = exports.selectObj = void 0;
function selectObj(obj, req) {
    var result = {};
    req.select.forEach(function (r) {
        result[r] = obj[r];
    });
    return result;
}
exports.selectObj = selectObj;
function selectArray(arr, req) {
    if (!req) {
        return arr;
    }
    return arr.map(function (v) { return selectObj(v, req); });
}
exports.selectArray = selectArray;
function makeSelectIOArray(arr) {
    return function (req) {
        try {
            var result = selectArray(arr, req);
            return Promise.resolve(result);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
}
exports.makeSelectIOArray = makeSelectIOArray;
