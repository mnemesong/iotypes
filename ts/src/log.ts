import * as safeJson from "safe-json-stringify"
import { TimeFormatter } from "./utils"

export type LogIO = (...inp: any[]) => Promise<void>

export type MakeLogIOConfig = {
    timeFormatter?: TimeFormatter,
    logCategory?: string,
    
}

/**
 * Making console-only logger with category mark
 */
export function makeLogIOConsole(
    timeFormatter: TimeFormatter|null = null,
    logCategory: string = "",
): LogIO {
    return (...inp) => {
        const dateStr = timeFormatter ? ` [${timeFormatter(new Date())}]` : ''
        console.log(`${logCategory}${dateStr}`)
        inp.forEach(i => {
            console.log(safeJson.stringify(i))
        })
        console.log("")
        return Promise.resolve()
    }
}

/**
 * Making logger mock for testing
 */
 export function makeLogToArray(
    timeFormatter: TimeFormatter|null = null,
    logCategory: string = "",
    arr: {category: string, time: string, log: string[]}[]
): LogIO {
    return (...inp) => {
        const dateStr = timeFormatter ? ` [${timeFormatter(new Date())}]` : ''
        arr.push({
            category: logCategory,
            time: timeFormatter(new Date),
            log: inp.map(v => safeJson.stringify(v)),
        })
        return Promise.resolve()
    }
}