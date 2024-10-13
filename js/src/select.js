"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSelectIOArray = exports.selectArray = exports.selectObj = void 0;
function selectObj(obj, req) {
    var result = {};
    if (!req.select) {
        return __assign({}, obj);
    }
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
