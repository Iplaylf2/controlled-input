export class SyncMapBuilder<T, Context> {
  static create<T, Context>(): SyncMapBuilder<T, Context> {
    return new SyncMapBuilder(next => next, SyncMapBuilder.start);
  }

  static start: SyncMapBuilder<any, any> = null as any;

  constructor(
    handle: SyncHandle<T, Context>,
    lastBuilder: SyncMapBuilder<T, Context>
  ) {
    this.handle = handle;
    this.lastBuilder = lastBuilder;
  }

  use(handle: SyncHandle<T, Context>): SyncMapBuilder<T, Context> {
    return new SyncMapBuilder(handle, this);
  }

  build(context: Context): SyncMap<T> {
    return this.buildWithNext(context, v => v);
  }

  buildWithNext(context: Context, next: SyncMap<T>): SyncMap<T> {
    const _next = this.handle(next, context);
    return this.lastBuilder === SyncMapBuilder.start
      ? _next
      : this.lastBuilder.buildWithNext(context, _next);
  }

  private handle: SyncHandle<T, Context>;
  private lastBuilder: SyncMapBuilder<T, Context>;
}

export type SyncMap<T> = (value: T) => T;
export type SyncHandle<T, Context> = (
  next: SyncMap<T>,
  context: Context
) => SyncMap<T>;
