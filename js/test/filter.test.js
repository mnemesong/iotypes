"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var filter_1 = require("../src/filter");
var assert_1 = __importDefault(require("assert"));
(0, mocha_1.it)("test filter simple", function () {
    var array = [
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
    var result = (0, filter_1.filterArray)(array, {
        filterBy: ['>', ["a"], 100]
    });
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
        {
            a: 110,
            b: "",
            c: false
        },
    ]);
});
(0, mocha_1.it)("test filter array", function () {
    var array = [
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
    var result = (0, filter_1.filterArray)(array, {
        filterBy: ['and', ['>', ["a"], 100], ['=', ["c"], false]]
    });
    assert_1.default.deepStrictEqual(result, [
        {
            a: 325,
            b: "c4124",
            c: false
        },
        {
            a: 110,
            b: "",
            c: false
        }
    ]);
});
(0, mocha_1.it)("test array operator", function () {
    var array = [
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
    var result = (0, filter_1.filterArray)(array, {
        filterBy: ['or', ['in', ["a"], [110, 251]], ['=', ["c"], true]]
    });
    assert_1.default.deepStrictEqual(result, [
        {
            a: 12,
            b: "12x",
            c: true
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
(0, mocha_1.it)("test trueable, falsable", function () {
    var array = [
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
    var result = (0, filter_1.filterArray)(array, {
        filterBy: ['not', ['falsable', ["b"]]]
    });
    assert_1.default.deepStrictEqual(result, [
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
    ]);
});
