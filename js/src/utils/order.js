"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderArray = exports.allOrderTypes = void 0;
exports.allOrderTypes = [
    "desc",
    "asc",
];
function shuffle(array) {
    var _a;
    var currentIndex = array.length;
    while (currentIndex != 0) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
}
function orderArray(arr, order) {
    if (order === "random") {
        var copy_1 = __spreadArray([], arr, true);
        shuffle(copy_1);
        return copy_1;
    }
    if (!Array.isArray(order[0])) {
        return orderArray(arr, [order]);
    }
    var copy = __spreadArray([], arr, true);
    var _loop_1 = function (i) {
        copy.sort(function (a, b) { return (a[order[i][0]] === b[order[i][0]])
            ? 0
            : (((a[order[i][0]] < b[order[i][0]]) && (order[i][1] === "asc"))
                ? 1
                : -1); });
    };
    for (var i = order.length - 1; i >= 0; i--) {
        _loop_1(i);
    }
    return copy;
}
exports.orderArray = orderArray;
