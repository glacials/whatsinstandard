declare class Cache {
    private ttl;
    private maxByteSize;
    private cache;
    constructor(ttl?: number, maxByteSize?: number);
    add(query: string, data: any): void;
    get(query: string): any;
    has(query: string): boolean;
    private clearSpace;
}
export default Cache;
