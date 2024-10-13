import { order } from ".";
import { Scalar } from "./utils";

export const allOrderTypes = [
    "desc",
    "asc",
] as const

export type OrderType = typeof allOrderTypes[number]

export type OrderDSL<T extends {}> =
    | [keyof T, OrderType][]
    | "random"

export type OrderReq<T extends {}> = {orderBy?: OrderDSL<T>}

function shuffle(array: any[]) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

export function orderArray<T extends {}>(
    arr: (T & Record<string, Scalar>)[], 
    order: OrderReq<T>
): (T & Record<string, Scalar>)[] {
    if(!order.orderBy) {
        return arr
    }
    let copy = [...arr]
    if(order.orderBy === "random") {
        shuffle(copy)
        return copy
    }
    if(order.orderBy.length === 0) {
        return copy
    }
    for(let i = order.orderBy.length - 1; i >= 0; i--) {
        let key = order.orderBy[i][0]
        let sort = order.orderBy[i][1]
        copy = copy.sort((a, b) => {
            const val = (a[key] === b[key]) 
                ? 0 
                : ((sort === "asc") 
                    ? ((a[key] < b[key]) ? -1 : 1)
                    : ((a[key] < b[key]) ? 1 : -1))
            console.log("Compare: ", a, " : ", b, " = ", val)
            return val
        })
    }
    return copy
}

export type OrderIO<T extends {}> = (req: OrderReq<T>) => Promise<T[]>

export function makeOrderIOArray<T extends {}>(arr: T[]): OrderIO<T> {
    return (req) => {
        try {
            const result = orderArray(arr, req)
            return Promise.resolve(result)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}