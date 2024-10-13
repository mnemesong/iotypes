import { describe, it } from "mocha";
import { orderArray } from "../src/order";
import assert from "assert";

it("test order asc", () => {
    const data = [
        {a: 12, b: "dsa3c1"},
        {a: 5, b: "1c124"},
        {a: 20, b: ""},
    ]
    const result = orderArray(data, {orderBy: [["a", "asc"]]})
    assert.deepStrictEqual(result, [
        {a: 5, b: "1c124"},
        {a: 12, b: "dsa3c1"},
        {a: 20, b: ""},
    ])
    assert.deepStrictEqual(data, [
        {a: 12, b: "dsa3c1"},
        {a: 5, b: "1c124"},
        {a: 20, b: ""},
    ])
})

it("test order desc", () => {
    const data = [
        {a: 12, b: "dsa3c1"},
        {a: 5, b: "1c124"},
        {a: 20, b: ""},
    ]
    const result = orderArray(data, {orderBy: [["a", "desc"]]})
    assert.deepStrictEqual(result, [
        {a: 20, b: ""},
        {a: 12, b: "dsa3c1"},
        {a: 5, b: "1c124"},
    ])
    assert.deepStrictEqual(data, [
        {a: 12, b: "dsa3c1"},
        {a: 5, b: "1c124"},
        {a: 20, b: ""},
    ])
})

it("test no order", () => {
    const data = [
        {a: 12, b: "dsa3c1"},
        {a: 5, b: "1c124"},
        {a: 20, b: ""},
    ]
    const result = orderArray(data, {orderBy: []})
    assert.deepStrictEqual(result, data)
})