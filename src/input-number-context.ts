import { InputChange } from "./input-change";
import { InputNumber } from "./input-number";

export type InputNumberContext = {
  change: InputChange;
  config: InputNumberConfig;
  adjust: InputNumberAdjustType;
  inputFrom: RegularInputNumber;
  inputTo: RegularInputNumber;
};

export type InputNumberConfig = {
  max: number;
  min: number;
  step: number;
  precision: number;
};

export enum InputNumberAdjustType {
  Native,
  Block,
  Trim,
  Complete,
  Mutate
}

export type RegularInputNumber = {
  input: InputNumber;
  valid: boolean;
};
