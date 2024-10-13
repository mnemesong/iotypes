"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var select_1 = require("../src/select");
var assert_1 = __importDefault(require("assert"));
(0, mocha_1.it)("test select", function () {
    var data = [
        {
            a: 12,
            b: "12x",
            c: true
        },
        {
            a: 325,
            b: "c4124",
            c: false
        },
        {
            a: 251,
            b: "",
            c: true
        },
        {
            a: 110,
            b: "",
            c: false
        }
    ];
    var result = (0, select_1.selectArray)(data, { select: ["a", "b"] });
    assert_1.default.deepStrictEqual(result, [
        {
            a: 12,
            b: "12x",
        },
        {
            a: 325,
            b: "c4124",
        },
        {
            a: 251,
            b: "",
        },
        {
            a: 110,
            b: "",
        }
    ]);
    assert_1.default.deepStrictEqual(data, [
        {
            a: 12,
            b: "12x",
            c: true
        },
        {
            a: 325,
            b: "c4124",
            c: false
        },
        {
            a: 251,
            b: "",
            c: true
        },
        {
            a: 110,
            b: "",
            c: false
        }
    ]);
    assert_1.default.deepStrictEqual(data, (0, select_1.selectArray)(data, {}));
});
