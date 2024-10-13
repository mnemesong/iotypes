import { Scalar } from "./utils"

export const allSummarizeNames = [
    "min",
    "max",
    "count",
    "sum",
    "avg",
] as const

export type SummarizeName = typeof allSummarizeNames[number]

export type SummarizeReq<T extends {}, K extends (keyof T & string), N extends string> = 
    Record<N, [SummarizeName, K]>

type MbString = string|undefined|null
type MbNumber = number|undefined|null
type MbBigint = bigint|undefined|null
type MbBoolean = boolean|undefined|null

export function summarizeMinMax<Vals extends MbString[]|MbNumber[]|MbBigint[]|MbBoolean[]>(
    vals: Vals,
    fn: "min"|"max"
): Vals[number]|number|null {
    const defVals = (vals as Scalar[]).filter(v => ((v !== null) && (v !== undefined)))
    if(defVals.length === 0) {
        return null
    }
    return (fn === "max")
        ? defVals.reduce((acc: string, el: string) => (acc > el) ? acc: el, defVals[0])
        : defVals.reduce((acc: string, el: string) => (acc < el) ? acc: el, defVals[0])
}

export function summarizeCount<Vals extends MbNumber[]|MbBigint[]|MbBoolean[]>(
    vals: Vals,
): number {
    const defVals = (vals as Scalar[]).filter(v => ((v !== null) && (v !== undefined)))
    return defVals.length
}

export function summarizeSum<Vals extends MbNumber[]|MbBigint[]|MbBoolean[]>(
    vals: Vals,
): number {
    const defVals = (vals as Scalar[]).filter(v => ((v !== null) && (v !== undefined)))
    const trues = defVals.filter(v => v === true).length
    return defVals
        .filter(v => (typeof v === "number") || (typeof v === "bigint"))
        .reduce(
            (acc: number, el) => (typeof el === "bigint") ? (acc + parseInt(el.toString())) : (acc + (el as number)), 
            0
        ) as number + trues
}

export function summarizeAvg<Vals extends MbNumber[]|MbBigint[]|MbBoolean[]>(
    vals: Vals,
): number {
    if(vals.length === 0) {
        return 0
    }
    const defVals = (vals as Scalar[]).filter(v => ((v !== null) && (v !== undefined)))
    const trues = defVals.filter(v => v === true).length
    return (defVals
        .filter(v => (typeof v === "number") || (typeof v === "bigint"))
        .reduce(
            (acc: number, el) => (typeof el === "bigint") ? (acc + parseInt(el.toString())) : (acc + (el as number)), 
            0
        ) as number + trues) / vals.length
}

export type SummarizeValsResult<Fn> = Fn extends "count"
? number
: (Fn extends ("sum"|"avg")
    ? number
    : string|boolean|number|null)

export function summarizeVals<
    Vals extends MbNumber[]|MbBigint[]|MbBoolean[]|MbString[], 
    Fn extends SummarizeName
>(
    vals: Vals,
    fn: Fn
): SummarizeValsResult<Fn> {
    switch(fn) {
        case "sum":
            if((vals as Scalar[]).filter(v => (typeof v) === "string").length > 0) {
                throw new Error("Can not calculate sum of array, contains string")
            }
            return summarizeSum(vals as MbNumber[]|MbBigint[]|MbBoolean[]) as any
        case "avg":
            if((vals as Scalar[]).filter(v => (typeof v) === "string").length > 0) {
                throw new Error("Can not calculate sum of array, contains string")
            }
            return summarizeAvg(vals as MbNumber[]|MbBigint[]|MbBoolean[]) as any
        case "count":
            return summarizeCount(vals as MbNumber[]|MbBigint[]|MbBoolean[]) as any
        default:
            return summarizeMinMax(vals, fn) as any
    }
}

export type SummarizeResult<
    T extends {}, 
    K extends (keyof T & string), 
    N extends string, 
    Req extends SummarizeReq<T, K, N>
> = Record<N, SummarizeValsResult<Req[N][0]>>

export type SummarizeIO<T extends {}, K extends (keyof T & string), N extends string> = 
    (req: SummarizeReq<T, K, N>) => Promise<SummarizeResult<T, K, N, typeof req>>

export function summarizeArray<T extends {}, K extends (keyof T & string), N extends string>(
    arr: T[], 
    dsl: SummarizeReq<T, K, N>
): Record<N, SummarizeValsResult<typeof dsl[N][0]>> {
    const result = {}
    Object.keys(dsl).forEach(n => {
        result[n] = summarizeVals(arr.map(v => v[dsl[n][1]]), dsl[n][0])
    })
    return result as any
}

export function makeSummarizeIOArray<
    T extends {}, 
    K extends (keyof T & string), 
    N extends string
>(arr: T[]): SummarizeIO<T, K, N> {
    return (req) => {
        try {
            const result = {}
            Object.keys(req).forEach(n => {
                result[n] = summarizeVals(arr.map(v => v[req[n][1]]), req[n][0])
            })
            return Promise.resolve(result as SummarizeResult<T, K, N, typeof req>)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
    