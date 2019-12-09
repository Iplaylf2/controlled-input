export class InputNumber {
  constructor(
    text: string,
    value: number,
    sign: -1 | 1,
    integer: string,
    fractional: string
  ) {
    this.text = text;
    this.value = value;
    this.sign = sign;
    this.integer = integer;
    this.fractional = fractional;
  }

  text: string;
  value: number;
  sign: -1 | 1;
  integer: string;
  fractional: string;
}
