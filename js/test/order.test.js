"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var order_1 = require("../src/order");
var assert_1 = __importDefault(require("assert"));
(0, mocha_1.it)("test order asc", function () {
    var data = [
        { a: 12, b: "dsa3c1" },
        { a: 5, b: "1c124" },
        { a: 20, b: "" },
    ];
    var result = (0, order_1.orderArray)(data, { orderBy: [["a", "asc"]] });
    assert_1.default.deepStrictEqual(result, [
        { a: 5, b: "1c124" },
        { a: 12, b: "dsa3c1" },
        { a: 20, b: "" },
    ]);
    assert_1.default.deepStrictEqual(data, [
        { a: 12, b: "dsa3c1" },
        { a: 5, b: "1c124" },
        { a: 20, b: "" },
    ]);
});
(0, mocha_1.it)("test order desc", function () {
    var data = [
        { a: 12, b: "dsa3c1" },
        { a: 5, b: "1c124" },
        { a: 20, b: "" },
    ];
    var result = (0, order_1.orderArray)(data, { orderBy: [["a", "desc"]] });
    assert_1.default.deepStrictEqual(result, [
        { a: 20, b: "" },
        { a: 12, b: "dsa3c1" },
        { a: 5, b: "1c124" },
    ]);
    assert_1.default.deepStrictEqual(data, [
        { a: 12, b: "dsa3c1" },
        { a: 5, b: "1c124" },
        { a: 20, b: "" },
    ]);
});
(0, mocha_1.it)("test no order", function () {
    var data = [
        { a: 12, b: "dsa3c1" },
        { a: 5, b: "1c124" },
        { a: 20, b: "" },
    ];
    var result = (0, order_1.orderArray)(data, { orderBy: [] });
    assert_1.default.deepStrictEqual(result, data);
});
