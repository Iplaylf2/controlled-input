import { InputChange } from "./input-change";
import { InputNumber } from "./input-number";
export declare type InputNumberContext = {
    change: InputChange;
    config: InputNumberConfig;
    adjust: InputNumberAdjustType;
    inputFrom: RegularInputNumber;
    inputTo: RegularInputNumber;
};
export declare type InputNumberConfig = {
    max: number;
    min: number;
    step: number;
    precision: number;
};
export declare enum InputNumberAdjustType {
    Native = 0,
    Block = 1,
    Trim = 2,
    Complete = 3,
    Mutate = 4
}
export declare type RegularInputNumber = {
    input: InputNumber;
    valid: boolean;
};
