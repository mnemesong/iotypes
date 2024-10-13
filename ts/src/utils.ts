export type Scalar =
    | number
    | undefined
    | null
    | string
    | bigint
    | boolean

export const allScalarTypes = [
    "number",
    "undefined",
    "null",
    "string",
    "bigint",
    "boolean",
]

export type ScalarType = typeof allScalarTypes[number]

export type TimeFormatter = (time: Date) => string

export const TimeFormatterUTC: TimeFormatter = (date) => date.toUTCString()

export const TimeFormatterTimestamp: TimeFormatter = (date) => date.valueOf().toString()

export const TimeFormatterISO: TimeFormatter = (date) => date.toISOString()

export const TimeFormatterDateString: TimeFormatter = (date) => date.toDateString()

export const TimeFormatterYMD: TimeFormatter = (date) => {
    const month   = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // months from 1-12
    const day     = date.getUTCDate().toString().padStart(2, "0");
    const year    = date.getUTCFullYear();
    return `${year}-${month}-${day}`
}

export const TimeFormatterHIS: TimeFormatter = (date) => {
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}-${seconds}`
}

export const TimeFormatterYMDHIS: TimeFormatter = (date) => {
    return `${TimeFormatterYMD(date)} ${TimeFormatterHIS(date)}`
}