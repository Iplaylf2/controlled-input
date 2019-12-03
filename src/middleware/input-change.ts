import { AssignNext } from "../assign-builder";
import { InputNode, inputSymbol } from "./input";

export const inputChangeSymbol = Symbol("input-change");

export enum InputChangeType {
  None,
  Append,
  Remove,
  Replace,
  Clear
}

export type InputChangeNode = {
  [inputChangeSymbol]: {
    type: InputChangeType;
    selectionFrom: number;
    selectionTo: number;
    changeFrom: string;
    changeTo: string;
  };
};

export const create = function(next: AssignNext<InputChangeNode>) {
  return (context: InputNode) => {
    const inputNode = context[inputSymbol];
  };
};
