import { Scalar } from "./utils";
export declare const allOrderTypes: string[];
export type OrderType = typeof allOrderTypes[number];
export type OrderDSL<T extends {}> = [keyof T, OrderType][] | "random";
export type OrderReq<T extends {}> = {
    orderBy?: OrderDSL<T>;
};
export declare function orderArray<T extends {}>(arr: (T & Record<string, Scalar>)[], order: OrderReq<T>): (T & Record<string, Scalar>)[];
export type OrderIO<T extends {}> = (req: OrderReq<T>) => Promise<T[]>;
export declare function makeOrderIOArray<T extends {}>(arr: T[]): OrderIO<T>;
