"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTableRequestIOArray = void 0;
var filter_1 = require("./filter");
var order_1 = require("./order");
var pagination_1 = require("./pagination");
var select_1 = require("./select");
var summarize_1 = require("./summarize");
function makeTableRequestIOArray(arr) {
    return function (req1) {
        var prepared = (0, select_1.selectArray)((0, filter_1.filterArray)((0, order_1.orderArray)(arr, { orderBy: req1.orderBy }), { filterBy: req1.filterBy }), { select: req1.select });
        return {
            paginated: (0, pagination_1.makePaginationIOArray)(prepared),
            summary: (0, summarize_1.makeSummarizeIOArray)(prepared),
            count: function () { return Promise.resolve(arr.length); },
        };
    };
}
exports.makeTableRequestIOArray = makeTableRequestIOArray;
