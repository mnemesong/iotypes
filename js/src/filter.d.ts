import { Scalar } from "./utils";
declare const allFilterBinaryOperators: readonly ["=", "<", "<=", ">", ">="];
export type FilterBinaryOperator = typeof allFilterBinaryOperators[number];
export declare const allArrayOperators: readonly ["in"];
export type ArrayOperator = typeof allArrayOperators[number];
export declare const allFilterUnaryOperators: readonly ["null", "trueable", "falsable"];
export type FilterUnaryOperator = typeof allFilterUnaryOperators[number];
export type FieldOrVal<T extends {}> = Scalar | [keyof T];
export type FilterDSL<T extends {}> = [FilterBinaryOperator, FieldOrVal<T>, FieldOrVal<T>] | [ArrayOperator, FieldOrVal<T>, FieldOrVal<T>[]] | [FilterUnaryOperator, FieldOrVal<T>] | ["and", ...FilterDSL<T>[]] | ["or", ...FilterDSL<T>[]] | ["not", FilterDSL<T>];
export type FilterReq<T extends {}> = {
    filterBy?: FilterDSL<T>;
};
/**
 * Function checking is object matching filter DSL
 */
export declare function isObjectMatchs<T extends {}>(obj: T, filter: FilterDSL<T>): boolean;
export declare function filterArray<T extends {}>(arr: T[], req: FilterReq<T>): T[];
export type FilterIO<T extends {}> = (req: FilterReq<T>) => Promise<T[]>;
export declare function makeFilterIOArray<T extends {}>(arr: T[]): FilterIO<T>;
export {};
