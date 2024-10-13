import { describe, it } from "mocha";
import { filterArray } from "../src/filter";
import assert from "assert";

it("test filter simple", () => {
    const data = [
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
    const result = filterArray(data, {
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
    assert.deepStrictEqual(data, [
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
    ])
})

it("test filter array", () => {
    const data = [
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
    const result = filterArray(data, {
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
    assert.deepStrictEqual(data, [
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
    ])
})

it("test array operator", () => {
    const data = [
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
    const result = filterArray(data, {
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
    assert.deepStrictEqual(data, [
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
    ])
})

it("test trueable, falsable", () => {
    const data = [
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
    const result = filterArray(data, {
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
    assert.deepStrictEqual(data, [
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
    ])
})

it("test no filter", () => {
    const data = [
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
    const result = filterArray(data, {})
    assert.deepStrictEqual(result, data)
})
