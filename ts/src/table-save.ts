import { Key, Scalar } from "./utils";

export type TableSaveRequest<T extends {}> = {
    records: T[],
    ids: (keyof T)[]
}

export type TableSaveIO<T extends Record<Key, Scalar>> = 
    (req: TableSaveRequest<T>) => Promise<void>

function makeid(length: number): string {
    let result = '';
    const characters = '!@#$%^&*(){}:"|>?[];№-_=+';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function makeTableSaveIOArray<T extends Record<Key, Scalar>>(arr: T[]): TableSaveIO<T> {
    return (req) => {
        const hash = makeid(7)
        const arr2 = arr.map(v => [req.ids.map(k => v[k]).join(hash), v])
        req.records.forEach(rv => {
            const recHash = req.ids.map(k => rv[k]).join(hash)
            let itFound = false
            arr2.forEach((av, i) => {
                if(av[0] === recHash) {
                    itFound = true
                    arr2[i][1] = rv
                }
            })
            if(!itFound) {
                arr2.push([recHash, rv])
            }
        })
        arr2.forEach((v, i) => {
            arr[i] = v[1] as T
        })
        return Promise.resolve()
    }
}