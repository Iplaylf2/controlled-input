export class InputChange {
  static getSelection(textFrom: string, textTo: string): [number, number] {
    const lengthChange = textTo.length - textFrom.length;
    const [longger, shorter] =
      lengthChange > 0 ? [textTo, textFrom] : [textFrom, textTo];

    let i = 0;
    for (; i !== shorter.length; i++) {
      if (longger.charAt(i) !== shorter.charAt(i)) {
        break;
      }
    }

    if (i === 0) {
      return [textFrom.length, textTo.length];
    }

    if (longger.substring(i + lengthChange) === shorter.substring(i)) {
      return lengthChange > 0 ? [i, i + lengthChange] : [i + lengthChange, i];
    } else {
      return lengthChange > 0
        ? [i, textTo.length]
        : [textFrom.length, textTo.length];
    }
  }

  static getSelectionFrom(
    textFrom: string,
    textTo: string,
    selectionTo: number
  ): number {
    let i = textFrom.length - 1;
    for (let j = textTo.length - 1; j <= selectionTo; i--, j--) {
      if (textFrom.charAt(i) !== textTo.charAt(j)) break;
    }

    return i + 1;
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
        0,
        "",
        "",
        InputChangeType.None
      );
    }

    const lengthChange = textTo.length - textFrom.length;
    if (textTo === "") {
      const type =
        lengthChange === -1 ? InputChangeType.Remove : InputChangeType.Clean;
      return new InputChange(
        textFrom,
        textTo,
        textFrom.length,
        0,
        0,
        textFrom,
        "",
        type
      );
    }

    const limit = lengthChange > 0 ? selectionFrom : selectionTo;

    let i = 0;
    for (; i !== limit; i++) {
      if (textFrom.charAt(i) !== textTo.charAt(i)) {
        break;
      }
    }

    let type: InputChangeType;
    if (i === limit) {
      switch (lengthChange) {
        case -1:
          type = InputChangeType.Remove;
          break;
        case 1:
          type = InputChangeType.Append;
          break;
        default:
          type = InputChangeType.Replace;
          break;
      }
    } else {
      type = InputChangeType.Replace;
    }

    return new InputChange(
      textFrom,
      textTo,
      i,
      selectionFrom,
      selectionTo,
      textFrom.substring(i, selectionFrom),
      textTo.substring(i, selectionTo),
      type
    );
  }

  constructor(
    textFrom: string,
    textTo: string,
    selectionFrom: number,
    selectionTo: number,
    changeIndex: number,
    changeFrom: string,
    changeTo: string,
    type: InputChangeType
  ) {
    this.textFrom = textFrom;
    this.textTo = textTo;
    this.selectionFrom = selectionFrom;
    this.selectionTo = selectionTo;
    this.changeIndex = changeIndex;
    this.changeFrom = changeFrom;
    this.changeTo = changeTo;
    this.type = type;
  }

  alterChangeTo(text: string) {
    const lengthChange = text.length - this.changeTo.length;
    this.changeTo = text;
    this.selectionTo += lengthChange;
  }

  textFrom: string;
  textTo: string;

  selectionFrom: number;
  selectionTo: number;

  changeIndex: number;
  changeFrom: string;
  changeTo: string;

  type: InputChangeType;
}

export enum InputChangeType {
  None,
  Append,
  Remove,
  Replace,
  Clean
}
