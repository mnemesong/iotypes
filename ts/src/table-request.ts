import { filterArray, FilterReq } from "./filter"
import { orderArray, OrderReq } from "./order"
import { makePaginationIOArray, PaginationReq } from "./pagination"
import { selectArray, SelectReq, SelectResult } from "./select"
import { makeSummarizeIOArray, SummarizeReq, SummarizeResult } from "./summarize"

export type TableRequestIO<T extends {}> =
    (req1: OrderReq<T> & FilterReq<T> & SelectReq<T>) => {
        paginated: (req2: PaginationReq) => Promise<SelectResult<T, typeof req1>>,
        summary: (req2: SummarizeReq<T, keyof T & string, string>) => 
            Promise<SummarizeResult<T, keyof T & string, string, typeof req2>>
    }

export function makeTableRequestIOArray<T extends {}>(arr: T[]): TableRequestIO<T> {
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
        } as any
    }
}