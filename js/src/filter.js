"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFilterIOArray = exports.filterArray = exports.isObjectMatchs = exports.allFilterUnaryOperators = exports.allArrayOperators = void 0;
var allFilterBinaryOperators = [
    "=",
    "<",
    "<=",
    ">",
    ">=",
];
exports.allArrayOperators = [
    "in",
];
exports.allFilterUnaryOperators = [
    "null",
    "trueable",
    "falsable",
];
function getValBySpec(obj, spec) {
    if (Array.isArray(spec)) {
        return obj[spec[0]];
    }
    return spec;
}
/**
 * Function checking is object matching filter DSL
 */
function isObjectMatchs(obj, filter) {
    switch (filter[0]) {
        case "and":
            return filter.reduce(function (acc, el, i) { return (i === 0)
                ? acc
                : (acc && isObjectMatchs(obj, el)); }, true);
        case "or":
            return filter.reduce(function (acc, el, i) { return (i === 0)
                ? acc
                : (acc || isObjectMatchs(obj, el)); }, false);
        case "not":
            return !isObjectMatchs(obj, filter[1]);
        case "null":
            return (obj[filter[1]] === undefined) || (obj[filter[1]] === null);
        case "trueable":
            return (!!obj[filter[1]]);
        case "falsable":
            return (!obj[filter[1]]);
        case "in":
            var comparableVals = filter[2].map(function (f) { return getValBySpec(obj, f); });
            return comparableVals.includes(getValBySpec(obj, filter[1]));
        case "=":
            return getValBySpec(obj, filter[1]) === getValBySpec(obj, filter[2]);
        case "<":
            return getValBySpec(obj, filter[1]) < getValBySpec(obj, filter[2]);
        case "<=":
            return getValBySpec(obj, filter[1]) <= getValBySpec(obj, filter[2]);
        case ">":
            return getValBySpec(obj, filter[1]) > getValBySpec(obj, filter[2]);
        case ">=":
            return getValBySpec(obj, filter[1]) >= getValBySpec(obj, filter[2]);
    }
}
exports.isObjectMatchs = isObjectMatchs;
function filterArray(arr, req) {
    return (req.filterBy)
        ? arr.filter(function (v) { return isObjectMatchs(v, req.filterBy); })
        : arr;
}
exports.filterArray = filterArray;
function makeFilterIOArray(arr) {
    return function (req) {
        try {
            var result = filterArray(arr, req);
            return Promise.resolve(result);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
}
exports.makeFilterIOArray = makeFilterIOArray;
