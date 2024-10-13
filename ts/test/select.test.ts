import { describe, it } from "mocha";
import { selectArray } from "../src/select";
import assert from "assert";

it("test select", () => {
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
    const result = selectArray(data, {select: ["a", "b"]})
    assert.deepStrictEqual(result, [
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
    assert.deepStrictEqual(data, selectArray(data, {}))
})