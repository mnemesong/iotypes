import { describe, it } from "mocha";
import { filterArray } from "../src/filter";
import assert from "assert";

it("test filter simple", () => {
    const array = [
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
    ]
    const result = filterArray(array, {
        filterBy: ['>', ["a"], 100]
    })
    assert.deepStrictEqual(result, [
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
    ])
})

it("test filter array", () => {
    const array = [
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
    ]
    const result = filterArray(array, {
        filterBy: ['and', ['>', ["a"], 100], ['=', ["c"], false]]
    })
    assert.deepStrictEqual(result, [
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
    ])
})

it("test array operator", () => {
    const array = [
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
    ]
    const result = filterArray(array, {
        filterBy: ['or', ['in', ["a"], [110, 251]], ['=', ["c"], true]]
    })
    assert.deepStrictEqual(result, [
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
    ])
})

it("test trueable, falsable", () => {
    const array = [
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
    ]
    const result = filterArray(array, {
        filterBy: ['not', ['falsable', ["b"]]]
    })
    assert.deepStrictEqual(result, [
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
    ])
})