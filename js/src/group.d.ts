export type GroupReq<T extends ({} & Record<string, any>)> = {
    groupBy?: ((keyof T) & string);
};
export type GroupResult<T extends ({} & Record<string, any>), Req extends GroupReq<T>> = Record<T[Req["groupBy"]], T[]> | T[];
export declare function groupArray<T extends {}, Req extends GroupReq<T>>(arr: T[], req: Req): GroupResult<T, Req>;
export type GroupIO<T extends {}> = (req: GroupReq<T>) => Promise<GroupResult<T, typeof req>>;
export declare function makeGroupIOArray<T extends {}>(arr: T[]): GroupIO<T>;
