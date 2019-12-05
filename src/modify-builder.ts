export class ModifyBuilder<T> {
  static create<T>(): ModifyBuilder<T> {
    return new ModifyBuilder(next => next);
  }

  use(middleware: ModifyMiddleware<T>): ModifyBuilder<T> {
    return new ModifyBuilder(
      ModifyBuilder.createModfiyRunSlot(this.modifyRunSlot, middleware)
    );
  }

  build(): (source: T) => T {
    const modifyRun = this.modifyRunSlot(() => {});
    return source => {
      const context = ModifyBuilder.cloneContext(source);
      modifyRun(context);
      return context;
    };
  }

  private static createModfiyRunSlot<T>(
    modifyRunSlot: ModifyRunSlot<T>,
    middleware: ModifyMiddleware<T>
  ): ModifyRunSlot<T> {
    return next => modifyRunSlot(middleware(next));
  }

  private static cloneContext<T>(context: T): T {
    if (Array.isArray(context)) {
      return context.slice(0) as any;
    }
    if (typeof context === "object") {
      return Object.assign(
        Object.create(Object.getPrototypeOf(context)),
        context
      );
    }
    return context;
  }

  private constructor(modifyRunSlot: ModifyRunSlot<T>) {
    this.modifyRunSlot = modifyRunSlot;
  }
  private modifyRunSlot: ModifyRunSlot<T>;
}

export type ModifyNext<T> = (context: T) => void;
export type ModifyMiddleware<T> = (next: ModifyNext<T>) => ModifyNext<T>;

type ModifyRun<T> = (source: T) => void;
type ModifyRunSlot<T> = (next: ModifyNext<T>) => ModifyRun<T>;
