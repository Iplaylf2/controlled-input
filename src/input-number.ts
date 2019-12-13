export class InputNumber {
  static createWhite() {
    return new InputNumber("", NaN, 1, "", "");
  }

  static create(text: string) {
    const match = /^(-)?(\d+)?(\.\d*)?$/.exec(text);
    if (!match) {
      return InputNumber.createWhite();
    }

    const [, signRaw, integerText, fractionText] = match,
      signText = signRaw || "",
      integer = integerText || "",
      fraction = fractionText || "";

    return new InputNumber(
      text,
      Number.parseFloat(text),
      signText === "-" ? -1 : 1,
      integer,
      fraction
    );
  }

  static toString(value: number): string {
    if (Number.isNaN(value)) {
      return "";
    }

    const valueText = String(value),
      match = /^(-?\d)(?:\.\d+)?e(.)(\d+)$/.exec(valueText);

    if (!match) {
      return valueText;
    }

    const [, left, flag, exponent] = match,
      dotOffset = Number.parseInt(exponent);

    let text = "";
    if (flag === "+") {
      const dotIndex = left.length + dotOffset;

      text = valueText.replace(".", "");
      if (text.length > dotIndex) {
        text = text.substring(0, dotIndex) + "." + text.substring(dotIndex);
      } else {
        text = text.padEnd(dotIndex, "0");
      }
    } else {
      text = valueText.replace(".", "");
      text = "0." + text.padStart(dotOffset - 1, "0");
    }

    return text;
  }

  constructor(
    text: string,
    value: number,
    sign: -1 | 1,
    integer: string,
    fraction: string
  ) {
    this.text = text;
    this.value = value;
    this.sign = sign;
    this.integer = integer;
    this.fraction = fraction;
  }

  text: string;
  value: number;
  sign: -1 | 1;
  integer: string;
  fraction: string;
}
