# iotypes
Input/output function abstractions and types with mocks

Package of abstractions for typical data-processing and requesting.

May be used for creating your own IO function types and implementations/


## Filtering
```typescript
//filter.ts

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
    | [FilterUnaryOperator, FieldOrVal<T>]
    | ["and", ...FilterDSL<T>[]]
    | ["or", ...FilterDSL<T>[]]
    | ["not", FilterDSL<T>]

export type FilterReq<T extends {}> = {filterBy?: FilterDSL<T>}
//Example: {filterBy: ["=", ["mField"], "myVal"]}

export type FilterIO<T extends {}> = (req: FilterReq<T>) => Promise<T[]>

export function makeFilterIOArray<T extends {}>(arr: T[]): FilterIO<T>
```


## Logging
```typescript
// log.ts

export type LogIO = (...inp: any[]) => Promise<void>

export type MakeLogIOConfig = {
    timeFormatter?: TimeFormatter,
    logCategory?: string,
    
}

export function makeLogIOConsole(
    timeFormatter: TimeFormatter|null = null,
    logCategory: string = "",
): LogIO

 export function makeLogToArray(
    timeFormatter: TimeFormatter|null = null,
    logCategory: string = "",
    arr: {category: string, time: string, log: string[]}[]
): LogIO
```


## Order
```typescript
///order.ts

export const allOrderTypes = [
    "desc",
    "asc",
] as const

export type OrderType = typeof allOrderTypes[number]

export type OrderDSL<T extends {}> =
    | [keyof T, OrderType][]
    | "random"

export type OrderReq<T extends {}> = {orderBy?: OrderDSL<T>}
//Example: {orderBy: ["myField", "asc"]}

export type OrderIO<T extends {}> = (req: OrderReq<T>) => Promise<T[]>

export function makeOrderIOArray<T extends {}>(arr: T[]): OrderIO<T>
```


## Pagination
```typescript
/// pagination.ts

export type PaginationReq = {
    limit?: number,
    offset?: number, 
}

export type PaginationIO<T> = (req: PaginationReq) => Promise<T[]>

export function makePaginationIOArray<T>(arr: T[]): PaginationIO<T>
```


## Select
```typescript
///select.ts

export type SelectReq<T extends {}> = {select?: ((keyof T) & string)[]}
//Example: {select? ["myField1", "myField2", "myField5"]}

export type SelectResult<T extends {}, Req extends SelectReq<T>> = Pick<T, Req["select"][number]>

export type SelectIO<T extends {}> = (req: SelectReq<T>) => Promise<SelectResult<T, typeof req>[]>

export function makeSelectIOArray<T extends {}>(arr: T[]): SelectIO<T>
```


## Summarize
```typescript
//summarize.ts

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
//Example: {incomeSum: ["sum", "income"], shortestName: ["min", "name"]}

type MbString = string|undefined|null
type MbNumber = number|undefined|null
type MbBigint = bigint|undefined|null
type MbBoolean = boolean|undefined|null

export type SummarizeValsResult<Fn> = Fn extends "count"
? number
: (Fn extends ("sum"|"avg")
    ? number
    : string|boolean|number|null)

    export type SummarizeResult<
    T extends {}, 
    K extends (keyof T & string), 
    N extends string, 
    Req extends SummarizeReq<T, K, N>
> = Record<N, SummarizeValsResult<Req[N][0]>>

export type SummarizeIO<T extends {}, K extends (keyof T & string), N extends string> = 
    (req: SummarizeReq<T, K, N>) => Promise<SummarizeResult<T, K, N, typeof req>>

export function makeSummarizeIOArray<
    T extends {}, 
    K extends (keyof T & string), 
    N extends string
>(arr: T[]): SummarizeIO<T, K, N>
```


## Table request
```typescript
///table-request.ts

export type TableRequestIO<T extends {}> =
    (req1: OrderReq<T> & FilterReq<T> & SelectReq<T>) => {
        paginated: PaginationIO<SelectResult<T, typeof req1>>,
        summary: SummarizeIO<SelectResult<T, typeof req1>, keyof SelectResult<T, typeof req1>, string>,
        count: () => Promise<number>,
    }

export function makeTableRequestIOArray<T extends {}>(arr: T[]): TableRequestIO<T> 
```


## License
MIT


## Author
Anatoly Starodubtsev