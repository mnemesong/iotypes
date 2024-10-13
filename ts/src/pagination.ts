export type PaginationReq = {
    limit?: number,
    offset?: number, 
}

export function paginationArray<T extends {}>(
    arr: T[], 
    req: PaginationReq
): T[] {
    return arr.filter((v, i) => 
        (req.offset ? (i >= req.offset) : true)
            && (req.limit ? i < req.offset + req.limit : true))
}

export type PaginationIO<T> = (req: PaginationReq) => Promise<T[]>

export function makePaginationIOArray<T>(arr: T[]): PaginationIO<T> {
    return (req) => {
        try {
            const result = paginationArray(arr, req)
            return Promise.resolve(result)
        } catch (e) {
            return Promise.reject()
        }
    }
}