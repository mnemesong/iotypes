"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var pagination_1 = require("../src/pagination");
var assert_1 = __importDefault(require("assert"));
(0, mocha_1.it)("test pagination", function () {
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
    var result = (0, pagination_1.paginationArray)(data, { limit: 2, offset: 1 });
    assert_1.default.deepStrictEqual(result, [
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
});
(0, mocha_1.it)("test pagination 2", function () {
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
    var result = (0, pagination_1.paginationArray)(data, {});
    assert_1.default.deepStrictEqual(result, data);
});
