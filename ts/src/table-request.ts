import { filterArray, FilterReq } from "./filter"
import { orderArray, OrderReq } from "./order"
import { makePaginationIOArray, PaginationIO, PaginationReq } from "./pagination"
import { selectArray, SelectReq, SelectResult } from "./select"
import { makeSummarizeIOArray, SummarizeIO, SummarizeReq, SummarizeResult } from "./summarize"
import { Key, Scalar } from "./utils"

export type TableRequestIO<T extends Record<Key, Scalar>> =
    (req1: OrderReq<T> & FilterReq<T> & SelectReq<T>) => {
        paginated: PaginationIO<SelectResult<T, typeof req1>>,
        summary: SummarizeIO<SelectResult<T, typeof req1>, keyof SelectResult<T, typeof req1>, string>,
        count: () => Promise<number>,
    }

export function makeTableRequestIOArray<T extends Record<Key, Scalar>>(arr: T[]): TableRequestIO<T> {
    return (req1) => {
        const prepared = selectArray(
            filterArray(
                orderArray(arr, {orderBy: req1.orderBy}), 
                {filterBy: req1.filterBy}
            ),
            {select: req1.select}
        )
        return {
            paginated: makePaginationIOArray(prepared),
            summary: makeSummarizeIOArray(prepared),
            count: () => Promise.resolve(arr.length),
        } as any
    }
}