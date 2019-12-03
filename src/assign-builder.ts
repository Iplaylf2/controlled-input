export class AssignBuilder<T extends Head, Head extends object> {
  static create<T extends object>(): AssignBuilder<T, T> {
    return new AssignBuilder<T, T>(assignNextSlot => context =>
      (assignNextSlot(context) as any)()
    );
  }

  use<K>(
    middleware: AssignMiddleware<T, K>
  ): K extends object ? AssignBuilder<T & K, Head> : AssignBuilder<T, Head> {
    return new AssignBuilder<any, any>(
      AssignBuilder.createAssignRunSlot(this.assignRunSlot, middleware)
    ) as any;
  }

  build(): (source: Head) => Head & Partial<T> {
    const assignRun = this.assignRunSlot(context => side =>
      Object.assign(context, side)
    );

    return source => {
      const conetxt = Object.assign({}, source) as any;
      assignRun(conetxt);
      return conetxt;
    };
  }

  private static createAssignNextSlot(next: AssignRun): AssignNextSlot {
    return context => side => {
      Object.assign(context, side);
      next(context);
    };
  }

  private static createAssignRunSlot(
    nextAssignRunSlot: AssignRunSlot,
    middleware: AssignMiddleware<any, any>
  ): AssignRunSlot {
    return assignNextSlot => context =>
      nextAssignRunSlot(
        AssignBuilder.createAssignNextSlot(middleware(assignNextSlot(context)))
      )(context);
  }

  private constructor(assignRunSlot: AssignRunSlot) {
    this.assignRunSlot = assignRunSlot;
  }

  private assignRunSlot: AssignRunSlot;
}

export type AssignNext<T = undefined> = (side: T) => void;

export type AssignMiddleware<T, K = undefined> = (
  assignNext: AssignNext<K>
) => (context: T) => void;

type AssignRun = (source: any) => void;

type AssignNextSlot = (context: any) => AssignNext;

type AssignRunSlot = (assignNextSlot: AssignNextSlot) => AssignRun;
