export type GroupReq<T extends ({} & Record<string, any>)>= {groupBy?: ((keyof T) & string)}

export type GroupResult<T extends ({} & Record<string, any>), Req extends GroupReq<T>> = 
    Record<T[Req["groupBy"]], T[]>|T[]

export function groupArray<T extends {}, Req extends GroupReq<T>>(
    arr: T[], 
    req: Req
): GroupResult<T, Req> {
    if(!req.groupBy) {
        return arr
    }
    const keys = []
    const result: any = {}
    arr.forEach(a => {
        const v = a[req.groupBy]
        if(!["string", "number"].includes(typeof v)) {
            throw new Error("Try to group by invalid type value: " + (typeof v))
        }
        if(keys.includes(v)) {
            result[v].push(a)
        } else {
            keys.push(v)
            result[v] = [a]
        }
    })
    return result
}

export type GroupIO<T extends {}> = (req: GroupReq<T>) => Promise<GroupResult<T, typeof req>>

export function makeGroupIOArray<T extends {}>(arr: T[]): GroupIO<T> {
    return (req) => {
        try {
            const result = groupArray(arr, req)
            return Promise.resolve(result)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}