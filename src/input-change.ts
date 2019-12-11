export class InputChange {
  static getSelection(textFrom: string, textTo: string): [number, number] {
    let i = textFrom.length - 1;
    for (let j = textTo.length - 1; i >= 0 && j >= 0; i--, j--) {
      if (textFrom.charAt(i) !== textTo.charAt(j)) {
        break;
      }
    }

    const selectionFrom = i + 1;
    const selectionTo = textTo.length - (textFrom.length - selectionFrom);

    return [selectionFrom, selectionTo];
  }

  static getSelectionFrom(
    textFrom: string,
    textTo: string,
    selectionTo: number
  ): number {
    return textFrom.length - (textTo.length - selectionTo);
  }

  static create(
    textFrom: string,
    selectionFrom: number,
    textTo: string,
    selectionTo: number
  ): InputChange {
    if (textFrom === textTo) {
      return new InputChange(
        textFrom,
        textTo,
        selectionFrom,
        selectionTo,
        "",
        ""
      );
    }

    if (textTo === "") {
      return new InputChange(
        textFrom,
        textTo,
        textFrom.length,
        0,
        textFrom,
        ""
      );
    }

    const lengthChange = textTo.length - textFrom.length;
    const limit = lengthChange > 0 ? selectionFrom : selectionTo;

    let i = 0;
    for (; i !== limit; i++) {
      if (textFrom.charAt(i) !== textTo.charAt(i)) {
        break;
      }
    }

    return new InputChange(
      textFrom,
      textTo,
      selectionFrom,
      selectionTo,
      textFrom.substring(i, selectionFrom),
      textTo.substring(i, selectionTo)
    );
  }

  constructor(
    textFrom: string,
    textTo: string,
    selectionFrom: number,
    selectionTo: number,
    changeFrom: string,
    changeTo: string
  ) {
    this.textFrom = textFrom;
    this.textTo = textTo;
    this.selectionFrom = selectionFrom;
    this.selectionTo = selectionTo;
    this.changeFrom = changeFrom;
    this.changeTo = changeTo;
    this.changeIndex = this.detectChangeIndex();
    this.type = this.detectType();
  }

  alterChangeTo(text: string): void {
    if (text === this.changeTo) {
      return;
    }

    this.textTo =
      this.textTo.substring(0, this.changeIndex) +
      text +
      this.textTo.substring(this.selectionTo);
    this.selectionTo = this.changeIndex + text.length;
    this.changeTo = text;
    this.type = this.detectType();
  }

  textFrom: string;
  textTo: string;

  selectionFrom: number;
  selectionTo: number;

  changeFrom: string;
  changeTo: string;

  changeIndex: number;
  type: InputChangeType;

  private detectChangeIndex(): number {
    return this.selectionTo - this.changeTo.length;
  }

  private detectType(): InputChangeType {
    if (this.textFrom === this.textTo) {
      return InputChangeType.None;
    }

    if (this.textTo === "") {
      if (this.changeFrom.length === 1) {
        return InputChangeType.Remove;
      } else {
        return InputChangeType.Clean;
      }
    }

    if (this.changeFrom.length === 0 && this.changeTo.length === 1) {
      return InputChangeType.Append;
    }

    if (this.changeFrom.length === 1 && this.changeTo.length === 0) {
      return InputChangeType.Remove;
    }

    return InputChangeType.Replace;
  }
}

export enum InputChangeType {
  None,
  Append,
  Remove,
  Replace,
  Clean
}
