"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePaginationIOArray = exports.paginationArray = void 0;
function paginationArray(arr, req) {
    return arr.filter(function (v, i) {
        return (req.offset ? (i >= req.offset) : true)
            && (req.limit ? i < req.offset + req.limit : true);
    });
}
exports.paginationArray = paginationArray;
function makePaginationIOArray(arr) {
    return function (req) {
        try {
            var result = paginationArray(arr, req);
            return Promise.resolve(result);
        }
        catch (e) {
            return Promise.reject();
        }
    };
}
exports.makePaginationIOArray = makePaginationIOArray;
