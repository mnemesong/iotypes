import { Scalar } from "./utils"

const allFilterBinaryOperators = [
    "=",
    "<",
    "<=",
    ">",
    ">=",
] as const

export type FilterBinaryOperator = typeof allFilterBinaryOperators[number]

export const allArrayOperators = [
    "in",
] as const

export type ArrayOperator = typeof allArrayOperators[number]

export const allFilterUnaryOperators = [
    "null",
    "trueable",
    "falsable",
] as const

export type FilterUnaryOperator = typeof allFilterUnaryOperators[number]

export type FieldOrVal<T extends {}> = Scalar|[keyof T]

export type FilterDSL<T extends {}> = 
    | [FilterBinaryOperator, FieldOrVal<T>, FieldOrVal<T>]
    | [ArrayOperator, FieldOrVal<T>, FieldOrVal<T>[]]
    | [FilterUnaryOperator, keyof T]
    | ["and", ...FilterDSL<T>[]]
    | ["or", ...FilterDSL<T>[]]
    | ["not", FilterDSL<T>]

export type FilterReq<T extends {}> = {filterBy?: FilterDSL<T>}

function getValBySpec<T>(obj: T, spec: Scalar|[keyof T]) {
    if(Array.isArray(spec)) {
        return obj[spec[0]]
    }
    return spec
}

/**
 * Function checking is object matching filter DSL
 */
export function isObjectMatchs<T extends {}>(obj: T, filter: FilterDSL<T>): boolean {
    switch (filter[0]) {
        case "and":
            return filter.reduce(
                (acc: boolean, el, i) => (i === 0) 
                    ? acc 
                    : (acc && isObjectMatchs(obj, el as FilterDSL<T>)), 
                true
            )
        case "or":
            return filter.reduce(
                (acc: boolean, el, i) => (i === 0) 
                    ? acc
                    : (acc || isObjectMatchs(obj, el as FilterDSL<T>)), 
                false
            )
        case "not":
            return !isObjectMatchs(obj, filter[1])
        case "null":
            return (obj[filter[1]] === undefined) || (obj[filter[1]] === null)
        case "trueable":
            return (!!obj[filter[1]])
        case "falsable":
            return (!obj[filter[1]])
        case "in":
            const comparableVals = filter[2].map(f => getValBySpec(obj, f))
            return comparableVals.includes(getValBySpec(obj, filter[1]))
        case "=":
            return getValBySpec(obj, filter[1]) === getValBySpec(obj, filter[2])
        case "<":
            return getValBySpec(obj, filter[1]) < getValBySpec(obj, filter[2])
        case "<=":
            return getValBySpec(obj, filter[1]) <= getValBySpec(obj, filter[2])
        case ">":
            return getValBySpec(obj, filter[1]) > getValBySpec(obj, filter[2])
        case ">=":
            return getValBySpec(obj, filter[1]) >= getValBySpec(obj, filter[2])
        
    }
}

export function filterArray<T extends {}>(arr: T[], req: FilterReq<T>): T[] {
    return (req.filterBy) 
        ? arr.filter(v => isObjectMatchs(v, req.filterBy)) 
        : arr
}

export type FilterIO<T extends {}> = (req: FilterReq<T>) => Promise<T[]>

export function makeFilterIOArray<T extends {}>(arr: T[]): FilterIO<T> {
    return (req) => {
        try {
            const result = filterArray(arr, req)
            return Promise.resolve(result)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}