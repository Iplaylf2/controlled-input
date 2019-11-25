class SyncMiddleware<T, Context> {
  constructor(handleList: SyncHandle<T, Context>[] = []) {
    this.handleList = handleList;
  }

  use(handle: SyncHandle<T, Context>): SyncMiddleware<T, Context> {
    this.handleList.push(handle);
    return this;
  }

  build(context: Context): SyncMap<T> {
    return this.handleList.reduce<SyncMap<T>>(
      (next, handle) => handle(next, context),
      v => v
    );
  }

  branch(): SyncMiddleware<T, Context> {
    return new SyncMiddleware(this.handleList.slice(0));
  }

  private handleList: SyncHandle<T, Context>[];
}

type SyncMap<T> = (value: T) => T;
type SyncHandle<T, Context> = (
  next: SyncMap<T>,
  context: Context
) => SyncMap<T>;
