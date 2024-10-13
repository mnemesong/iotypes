"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterArray = exports.isObjectMatchs = exports.allFilterUnaryOperators = exports.allArrayOperators = void 0;
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
var filter = ["and", ["=", { a: 12 }], [">=", { b: 32 }]];
/**
 * Function checking is object matching filter DSL
 */
function isObjectMatchs(obj, filter) {
    switch (filter[0]) {
        case "and":
            return filter.reduce(function (acc, el, i) { return (i === 0)
                ? true
                : (acc && isObjectMatchs(obj, el)); }, true);
        case "or":
            return filter.reduce(function (acc, el, i) { return (i === 0)
                ? false
                : (acc && isObjectMatchs(obj, el)); }, false);
        case "not":
            return !isObjectMatchs(obj, filter[1]);
        case "null":
            return (obj[filter[1]] === undefined) || (obj[filter[1]] === null);
        case "trueable":
            return (!!obj[filter[1]]);
        case "falsable":
            return (!obj[filter[1]]);
        case "in":
            return Object.keys(filter[1]).reduce(function (acc, el) {
                return acc && filter[1][el].includes(obj[filter[1][el]]);
            }, true);
        case "=":
            return Array.isArray(filter[1])
                ? (filter[1][0] === filter[1][1])
                : Object.keys(filter[1]).reduce(function (acc, el) {
                    return (obj[filter[el]] === filter[1][el]);
                }, true);
        case "<":
            return Array.isArray(filter[1])
                ? (filter[1][0] < filter[1][1])
                : Object.keys(filter[1]).reduce(function (acc, el) {
                    return (obj[filter[el]] < filter[1][el]);
                }, true);
        case "<=":
            return Array.isArray(filter[1])
                ? (filter[1][0] <= filter[1][1])
                : Object.keys(filter[1]).reduce(function (acc, el) {
                    return (obj[filter[el]] <= filter[1][el]);
                }, true);
        case ">":
            return Array.isArray(filter[1])
                ? (filter[1][0] > filter[1][1])
                : Object.keys(filter[1]).reduce(function (acc, el) {
                    return (obj[filter[el]] > filter[1][el]);
                }, true);
        case ">=":
            return Array.isArray(filter[1])
                ? (filter[1][0] >= filter[1][1])
                : Object.keys(filter[1]).reduce(function (acc, el) {
                    return (obj[filter[el]] >= filter[1][el]);
                }, true);
    }
}
exports.isObjectMatchs = isObjectMatchs;
/**
 * Filters array by FilterDSL
 */
function filterArray(arr, filter) {
    return arr.filter(function (v) { return isObjectMatchs(v, filter); });
}
exports.filterArray = filterArray;
