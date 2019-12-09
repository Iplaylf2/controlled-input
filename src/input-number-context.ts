import { InputChange } from "./input-change";
import { InputNumber } from "./input-number";
import { InputNumberConfig } from "./input-number-config";

export type InputNumberContext = {
  change: InputChange;
  inputFrom: { input: InputNumber; valid: boolean };
  inputTo: { input: InputNumber; valid: boolean };
  config: InputNumberConfig;
};
