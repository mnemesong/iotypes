import { describe, it } from "mocha";
import { summarizeArray } from "../src/summarize";
import assert from "assert";

it("test max", () => {
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
    const max = summarizeArray(data, {maxA: ["max", "a"], maxB: ["max", "b"]})
    assert.deepStrictEqual(max, {
        maxA: 325,
        maxB: "c4124",
    })
})

it("test min", () => {
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
    const max = summarizeArray(data, {maxA: ["min", "a"], maxB: ["min", "b"]})
    assert.deepStrictEqual(max, {
        maxA: 12,
        maxB: "",
    })
})

it("test count", () => {
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
            b: null,
            c: false
        }
    ]
    const max = summarizeArray(data, {cnt: ["count", "b"]})
    assert.deepStrictEqual(max, {
        cnt: 3
    })
})

it("test sum avg", () => {
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
    const max = summarizeArray(data, {sum: ["sum", "a"], avg: ["avg", "c"]})
    assert.deepStrictEqual(max, {
        sum: 698,
        avg: 0.5,
    })
})