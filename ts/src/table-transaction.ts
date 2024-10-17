import { makeTableRequestIOArray, TableRequestIO } from "./table-request";
import { makeTableSaveIOArray, TableSaveIO } from "./table-save";
import { Key, Scalar, Transaction } from "./utils";

export type TableAPI<T extends Record<Key, Scalar>> = {
    request: TableRequestIO<T>,
    save: TableSaveIO<T>,
}

export type TableTransaction<T extends Record<Key, Scalar>> = 
    Promise<Transaction<TableAPI<T>, any>>

export function makeTransactionTableIOArray<T extends Record<Key, Scalar>>(
    arr: T[]
): TableTransaction<T> {
    const api: TableAPI<T>  = {
        request: makeTableRequestIOArray(arr),
        save: makeTableSaveIOArray(arr),
    }
    return Promise.resolve(async (f) => {
        try {
            return Promise.resolve(await f(api))
        } catch (e) {
            return Promise.reject(e)
        }
    })
}