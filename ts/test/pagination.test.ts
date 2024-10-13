import { describe, it } from "mocha";
import { paginationArray } from "../src/pagination";
import assert from "assert";

it("test pagination", () => {
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
    const result = paginationArray(data, {limit: 2, offset: 1})
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
    ])
})