import { Scalar } from "./filter";
export declare const allOrderTypes: string[];
export type OrderType = typeof allOrderTypes[number];
export type OrderDSL<T extends {}> = [[keyof T, OrderType], ...[keyof T, OrderType][]] | [keyof T, OrderType] | "random";
export declare function orderArray<T extends {}>(arr: (T & Record<string, Scalar>)[], order: OrderDSL<T>): (T & Record<string, Scalar>)[];
