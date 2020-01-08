export declare class ModifyBuilder<T> {
    static create<T>(): ModifyBuilder<T>;
    use(middleware: ModifyMiddleware<T>): ModifyBuilder<T>;
    build(): (source: T) => T;
    private static createModfiyRunSlot;
    private static cloneContext;
    private constructor();
    private modifyRunSlot;
}
export declare type ModifyNext<T> = (context: T) => void;
export declare type ModifyMiddleware<T> = (next: ModifyNext<T>) => ModifyNext<T>;
