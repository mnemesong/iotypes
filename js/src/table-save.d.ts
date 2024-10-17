import { Key, Scalar } from "./utils";
export type TableSaveRequest<T extends {}> = {
    records: T[];
    ids: (keyof T)[];
};
export type TableSaveIO<T extends Record<Key, Scalar>> = (req: TableSaveRequest<T>) => Promise<void>;
export declare function makeTableSaveIOArray<T extends Record<Key, Scalar>>(arr: T[]): TableSaveIO<T>;
