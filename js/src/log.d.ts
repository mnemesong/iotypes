import { TimeFormatter } from "./utils";
export type LogIO = (...inp: any[]) => Promise<void>;
export type MakeLogIOConfig = {
    timeFormatter?: TimeFormatter;
    logCategory?: string;
};
/**
 * Making console-only logger with category mark
 */
export declare function makeLogIOConsole(timeFormatter?: TimeFormatter | null, logCategory?: string): LogIO;
/**
 * Making logger mock for testing
 */
export declare function makeLogToArray(timeFormatter: TimeFormatter | null, logCategory: string, arr: {
    category: string;
    time: string;
    log: string[];
}[]): LogIO;
