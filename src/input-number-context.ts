import { InputChange } from "./input-change";
import { InputNumber } from "./input-number";

export type InputNumberContext = {
  change: InputChange;
  config: InputNumberConfig;
  changeType: InputNumberChangeType;
  inputFrom: { input: InputNumber; valid: boolean };
  inputTo: { input: InputNumber; valid: boolean };
};

export type InputNumberConfig = {
  max: number;
  min: number;
  step: number;
  precision: number;
};

export enum InputNumberChangeType {
  Native,
  Block,
  Complete,
  Mutate
}
