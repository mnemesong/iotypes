"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogToArray = exports.makeLogIOConsole = void 0;
var safeJson = __importStar(require("safe-json-stringify"));
/**
 * Making console-only logger with category mark
 */
function makeLogIOConsole(timeFormatter, logCategory) {
    if (timeFormatter === void 0) { timeFormatter = null; }
    if (logCategory === void 0) { logCategory = ""; }
    return function () {
        var inp = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inp[_i] = arguments[_i];
        }
        var dateStr = timeFormatter ? " [".concat(timeFormatter(new Date()), "]") : '';
        console.log("".concat(logCategory).concat(dateStr));
        inp.forEach(function (i) {
            console.log(safeJson.stringify(i));
        });
        console.log("");
        return Promise.resolve();
    };
}
exports.makeLogIOConsole = makeLogIOConsole;
/**
 * Making logger mock for testing
 */
function makeLogToArray(timeFormatter, logCategory, arr) {
    if (timeFormatter === void 0) { timeFormatter = null; }
    if (logCategory === void 0) { logCategory = ""; }
    return function () {
        var inp = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inp[_i] = arguments[_i];
        }
        var dateStr = timeFormatter ? " [".concat(timeFormatter(new Date()), "]") : '';
        arr.push({
            category: logCategory,
            time: timeFormatter(new Date),
            log: inp.map(function (v) { return safeJson.stringify(v); }),
        });
        return Promise.resolve();
    };
}
exports.makeLogToArray = makeLogToArray;
