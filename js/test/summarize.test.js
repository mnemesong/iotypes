"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var summarize_1 = require("../src/summarize");
var assert_1 = __importDefault(require("assert"));
(0, mocha_1.it)("test max", function () {
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
    var max = (0, summarize_1.summarizeArray)(data, { maxA: ["max", "a"], maxB: ["max", "b"] });
    assert_1.default.deepStrictEqual(max, {
        maxA: 325,
        maxB: "c4124",
    });
});
(0, mocha_1.it)("test min", function () {
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
    var max = (0, summarize_1.summarizeArray)(data, { maxA: ["min", "a"], maxB: ["min", "b"] });
    assert_1.default.deepStrictEqual(max, {
        maxA: 12,
        maxB: "",
    });
});
(0, mocha_1.it)("test count", function () {
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
            b: null,
            c: false
        }
    ];
    var max = (0, summarize_1.summarizeArray)(data, { cnt: ["count", "b"] });
    assert_1.default.deepStrictEqual(max, {
        cnt: 3
    });
});
(0, mocha_1.it)("test sum avg", function () {
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
    var max = (0, summarize_1.summarizeArray)(data, { sum: ["sum", "a"], avg: ["avg", "c"] });
    assert_1.default.deepStrictEqual(max, {
        sum: 698,
        ang: 0.5,
    });
});
