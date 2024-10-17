export type Key = number | string;
export declare const allKeyTypes: string[];
export type Transaction<T, V> = (f: ((api: T) => Promise<V>)) => Promise<V>;
export type Scalar = number | undefined | null | string | bigint | boolean;
export declare const allScalarTypes: string[];
export type TimeFormatter = (time: Date) => string;
export declare const TimeFormatterUTC: TimeFormatter;
export declare const TimeFormatterTimestamp: TimeFormatter;
export declare const TimeFormatterISO: TimeFormatter;
export declare const TimeFormatterDateString: TimeFormatter;
export declare const TimeFormatterYMD: TimeFormatter;
export declare const TimeFormatterHIS: TimeFormatter;
export declare const TimeFormatterYMDHIS: TimeFormatter;
