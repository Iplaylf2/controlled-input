export const inputSymbol = Symbol("input");

export type InputNode = {
  [inputSymbol]: {
    lastInput: string;
    input: string;
    selection: number;
  };
};
