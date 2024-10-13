"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSummarizeIOArray = exports.summarizeArray = exports.summarizeVals = exports.summarizeAvg = exports.summarizeSum = exports.summarizeCount = exports.summarizeMinMax = exports.allSummarizeNames = void 0;
exports.allSummarizeNames = [
    "min",
    "max",
    "count",
    "sum",
    "avg",
];
function summarizeMinMax(vals, fn) {
    var defVals = vals.filter(function (v) { return ((v !== null) && (v !== undefined)); });
    if (defVals.length === 0) {
        return null;
    }
    return (fn === "max")
        ? defVals.reduce(function (acc, el) { return (acc > el) ? acc : el; }, defVals[0])
        : defVals.reduce(function (acc, el) { return (acc < el) ? acc : el; }, defVals[0]);
}
exports.summarizeMinMax = summarizeMinMax;
function summarizeCount(vals) {
    var defVals = vals.filter(function (v) { return ((v !== null) && (v !== undefined)); });
    return defVals.length;
}
exports.summarizeCount = summarizeCount;
function summarizeSum(vals) {
    var defVals = vals.filter(function (v) { return ((v !== null) && (v !== undefined)); });
    var trues = defVals.filter(function (v) { return v === true; }).length;
    return defVals
        .filter(function (v) { return (typeof v === "number") || (typeof v === "bigint"); })
        .reduce(function (acc, el) { return (typeof el === "bigint") ? (acc + parseInt(el.toString())) : (acc + el); }, 0) + trues;
}
exports.summarizeSum = summarizeSum;
function summarizeAvg(vals) {
    if (vals.length === 0) {
        return 0;
    }
    var defVals = vals.filter(function (v) { return ((v !== null) && (v !== undefined)); });
    var trues = defVals.filter(function (v) { return v === true; }).length;
    return (defVals
        .filter(function (v) { return (typeof v === "number") || (typeof v === "bigint"); })
        .reduce(function (acc, el) { return (typeof el === "bigint") ? (acc + parseInt(el.toString())) : (acc + el); }, 0) + trues) / vals.length;
}
exports.summarizeAvg = summarizeAvg;
function summarizeVals(vals, fn) {
    switch (fn) {
        case "sum":
            if (vals.filter(function (v) { return (typeof v) === "string"; }).length > 0) {
                throw new Error("Can not calculate sum of array, contains string");
            }
            return summarizeSum(vals);
        case "avg":
            if (vals.filter(function (v) { return (typeof v) === "string"; }).length > 0) {
                throw new Error("Can not calculate sum of array, contains string");
            }
            return summarizeAvg(vals);
        case "count":
            return summarizeCount(vals);
        default:
            return summarizeMinMax(vals, fn);
    }
}
exports.summarizeVals = summarizeVals;
function summarizeArray(arr, dsl) {
    var result = {};
    Object.keys(dsl).forEach(function (n) {
        result[n] = summarizeVals(arr.map(function (v) { return v[dsl[n][1]]; }), dsl[n][0]);
    });
    return result;
}
exports.summarizeArray = summarizeArray;
function makeSummarizeIOArray(arr) {
    return function (req) {
        try {
            var result_1 = {};
            Object.keys(req).forEach(function (n) {
                result_1[n] = summarizeVals(arr.map(function (v) { return v[req[n][1]]; }), req[n][0]);
            });
            return Promise.resolve(result_1);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
}
exports.makeSummarizeIOArray = makeSummarizeIOArray;
