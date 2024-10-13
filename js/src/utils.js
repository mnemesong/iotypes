"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeFormatterYMDHIS = exports.TimeFormatterHIS = exports.TimeFormatterYMD = exports.TimeFormatterDateString = exports.TimeFormatterISO = exports.TimeFormatterTimestamp = exports.TimeFormatterUTC = exports.allScalarTypes = void 0;
exports.allScalarTypes = [
    "number",
    "undefined",
    "null",
    "string",
    "bigint",
    "boolean",
];
var TimeFormatterUTC = function (date) { return date.toUTCString(); };
exports.TimeFormatterUTC = TimeFormatterUTC;
var TimeFormatterTimestamp = function (date) { return date.valueOf().toString(); };
exports.TimeFormatterTimestamp = TimeFormatterTimestamp;
var TimeFormatterISO = function (date) { return date.toISOString(); };
exports.TimeFormatterISO = TimeFormatterISO;
var TimeFormatterDateString = function (date) { return date.toDateString(); };
exports.TimeFormatterDateString = TimeFormatterDateString;
var TimeFormatterYMD = function (date) {
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // months from 1-12
    var day = date.getUTCDate().toString().padStart(2, "0");
    var year = date.getUTCFullYear();
    return "".concat(year, "-").concat(month, "-").concat(day);
};
exports.TimeFormatterYMD = TimeFormatterYMD;
var TimeFormatterHIS = function (date) {
    var hours = date.getUTCHours().toString().padStart(2, "0");
    var minutes = date.getUTCMinutes().toString().padStart(2, "0");
    var seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return "".concat(hours, ":").concat(minutes, "-").concat(seconds);
};
exports.TimeFormatterHIS = TimeFormatterHIS;
var TimeFormatterYMDHIS = function (date) {
    return "".concat((0, exports.TimeFormatterYMD)(date), " ").concat((0, exports.TimeFormatterHIS)(date));
};
exports.TimeFormatterYMDHIS = TimeFormatterYMDHIS;
