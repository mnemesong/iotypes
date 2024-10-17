import { FilterReq } from "./filter";
import { OrderReq } from "./order";
import { PaginationIO } from "./pagination";
import { SelectReq, SelectResult } from "./select";
import { SummarizeIO } from "./summarize";
import { Key, Scalar } from "./utils";
export type TableRequestIO<T extends Record<Key, Scalar>> = (req1: OrderReq<T> & FilterReq<T> & SelectReq<T>) => {
    paginated: PaginationIO<SelectResult<T, typeof req1>>;
    summary: SummarizeIO<SelectResult<T, typeof req1>, keyof SelectResult<T, typeof req1>, string>;
    count: () => Promise<number>;
};
export declare function makeTableRequestIOArray<T extends Record<Key, Scalar>>(arr: T[]): TableRequestIO<T>;
