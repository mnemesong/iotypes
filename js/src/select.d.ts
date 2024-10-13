export type SelectReq<T extends {}> = {
    select?: ((keyof T) & string)[];
};
export type SelectResult<T extends {}, Req extends SelectReq<T>> = Pick<T, Req["select"][number]>;
export declare function selectObj<T extends {}>(obj: T, req: SelectReq<T>): SelectResult<T, typeof req>;
export declare function selectArray<T extends {}>(arr: T[], req: SelectReq<T>): SelectResult<T, typeof req>[];
export type SelectIO<T extends {}> = (req: SelectReq<T>) => Promise<SelectResult<T, typeof req>[]>;
export declare function makeSelectIOArray<T extends {}>(arr: T[]): SelectIO<T>;
