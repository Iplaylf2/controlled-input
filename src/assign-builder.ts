export class AssignBuilder<T extends Head, Head> {
  use<K>(
    middleware: AssignMiddleware<T, K>
  ): K extends object ? AssignBuilder<T & K, Head> : AssignBuilder<T, Head> {
    throw "";
  }
  builder(): (source: Head) => T {
    throw "";
  }
}

export type AssignMiddleware<T, K = undefined> = (
  next: AssignNext<K>
) => (context: T) => void;

export type AssignNext<T = undefined> = (assign: T) => void;
