export declare class InputNumber {
    static createWhite(): InputNumber;
    static create(text: string): InputNumber;
    static toString(value: number): string;
    constructor(text: string, value: number, sign: -1 | 1, integer: string, fraction: string);
    text: string;
    value: number;
    sign: -1 | 1;
    integer: string;
    fraction: string;
}
