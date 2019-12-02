export class AssignBuilder<T extends Head, Head extends object> {
  static create<T extends object>(): AssignBuilder<T, T> {
    return new AssignBuilder<T, T>(assignNextSlot => source => {
      const context = Object.assign({}, source);
      assignNextSlot(context)({} as any);
      return context;
    });
  }

  private constructor(mapSlot: MapSlot<any, T>) {
    this.mapSlot = mapSlot;
  }

  use<K>(
    middleware: AssignMiddleware<T, K>
  ): K extends object ? AssignBuilder<T & K, Head> : AssignBuilder<T, Head> {
    return new AssignBuilder<any, any>(
      AssignBuilder.createMapSlot(this.mapSlot, middleware)
    ) as any;
  }

  build(): (source: Head) => T {
    return this.mapSlot(context => side => Object.assign(context, side));
  }

  private static createAssignNextSlot(next: Next): AssignNextSlot<any, any> {
    return context => side => {
      Object.assign(context, side);
      next(context);
    };
  }

  private static createMapSlot(
    nextMapSlot: MapSlot<any, any>,
    middleware: AssignMiddleware<any, any>
  ): MapSlot<any, any> {
    return assignNextSlot => context =>
      nextMapSlot(
        AssignBuilder.createAssignNextSlot(middleware(assignNextSlot(context)))
      )(context);
  }

  private mapSlot: MapSlot<any, T>;
}

export type AssignNext<T = undefined> = (side: T) => void;

export type AssignMiddleware<T, K = undefined> = (
  assignNext: AssignNext<K>
) => (context: T) => void;

type Next = (context: any) => void;

type AssignNextSlot<T, K> = (context: T) => AssignNext<K>;

type Map<T, K> = (source: T) => K;

type MapSlot<T, K> = (assignNextSlot: AssignNextSlot<T, K>) => Map<T, T & K>;
