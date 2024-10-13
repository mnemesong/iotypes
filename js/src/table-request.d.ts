import { FilterReq } from "./filter";
import { OrderReq } from "./order";
import { PaginationReq } from "./pagination";
import { SelectReq, SelectResult } from "./select";
import { SummarizeReq, SummarizeResult } from "./summarize";
export type TableRequestIO<T extends {}> = (req1: OrderReq<T> & FilterReq<T> & SelectReq<T>) => {
    paginated: (req2: PaginationReq) => Promise<SelectResult<T, typeof req1>>;
    summary: (req2: SummarizeReq<T, keyof T & string, string>) => Promise<SummarizeResult<T, keyof T & string, string, typeof req2>>;
};
export declare function makeTableRequestIOArray<T extends {}>(arr: T[]): TableRequestIO<T>;
