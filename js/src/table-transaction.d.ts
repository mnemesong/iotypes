import { TableRequestIO } from "./table-request";
import { TableSaveIO } from "./table-save";
import { Key, Scalar, Transaction } from "./utils";
export type TableAPI<T extends Record<Key, Scalar>> = {
    request: TableRequestIO<T>;
    save: TableSaveIO<T>;
};
export type TableTransaction<T extends Record<Key, Scalar>> = Promise<Transaction<TableAPI<T>, any>>;
export declare function makeTransactionTableIOArray<T extends Record<Key, Scalar>>(arr: T[]): TableTransaction<T>;
