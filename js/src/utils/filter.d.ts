declare const allFilterBinaryOperators: readonly ["=", "<", "<=", ">", ">="];
export type FilterBinaryOperator = typeof allFilterBinaryOperators[number];
export type Scalar = number | undefined | null | string | bigint | boolean;
export declare const allArrayOperators: readonly ["in"];
export type ArrayOperator = typeof allArrayOperators[number];
export declare const allFilterUnaryOperators: readonly ["null", "trueable", "falsable"];
export type FilterUnaryOperator = typeof allFilterUnaryOperators[number];
export type FilterDSL<T extends {}> = [FilterBinaryOperator, Partial<Record<keyof T, Scalar>> | [Scalar, Scalar]] | [ArrayOperator, Partial<Record<keyof T, Scalar[]>>] | [FilterUnaryOperator, keyof T] | ["and", ...FilterDSL<T>[]] | ["or", ...FilterDSL<T>[]] | ["not", FilterDSL<T>];
/**
 * Function checking is object matching filter DSL
 */
export declare function isObjectMatchs<T extends {}>(obj: T, filter: FilterDSL<T>): boolean;
/**
 * Filters array by FilterDSL
 */
export declare function filterArray<T extends {}>(arr: T[], filter: FilterDSL<T>): T[];
export {};
