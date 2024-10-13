export type PaginationReq = {
    limit?: number;
    offset?: number;
};
export declare function paginationArray<T extends {}>(arr: T[], req: PaginationReq): T[];
export type PaginationIO<T> = (req: PaginationReq) => Promise<T[]>;
export declare function makePaginationIOArray<T>(arr: T[]): PaginationIO<T>;
