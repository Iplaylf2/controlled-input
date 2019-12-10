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
