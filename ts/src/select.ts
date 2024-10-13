export type SelectReq<T extends {}> = {select?: ((keyof T) & string)[]}

export type SelectResult<T extends {}, Req extends SelectReq<T>> = Pick<T, Req["select"][number]>

export function selectObj<T extends {}>(
    obj: T,
    req: SelectReq<T>
): SelectResult<T, typeof req> {
    const result: any = {}
    if(!req.select) {
        return {...obj}
    }
    req.select.forEach(r => {
        result[r] = obj[r]
    })
    return result
}

export function selectArray<T extends {}>(
    arr: T[], 
    req: SelectReq<T>
): SelectResult<T, typeof req>[] {
    if(!req) {
        return arr
    }
    return arr.map(v => selectObj(v, req))
}

export type SelectIO<T extends {}> = (req: SelectReq<T>) => Promise<SelectResult<T, typeof req>[]>

export function makeSelectIOArray<T extends {}>(arr: T[]): SelectIO<T> {
    return (req) => {
        try {
            const result = selectArray(arr, req)
            return Promise.resolve(result)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}