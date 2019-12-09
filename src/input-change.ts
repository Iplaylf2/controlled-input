export class InputChange {
  static getSelection(textFrom: string, textTo: string): [number, number] {
    const lengthChange = textTo.length - textFrom.length;
    const [longger, shorter] =
      lengthChange > 0 ? [textTo, textFrom] : [textFrom, textTo];

    var i = 0;
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
    return textFrom.length - (textTo.length - selectionTo);
  }

  static create(
    textFrom: string,
    selectionFrom: number,
    textTo: string,
    selectionTo: number
  ): InputChange {
    throw "";
  }

  constructor(
    textFrom: string,
    textTo: string,
    selectionFrom: number,
    selectionTo: number,
    changeFrom: string,
    changeTo: string,
    type: InputChangeType
  ) {
    this.textFrom = textFrom;
    this.textTo = textTo;
    this.selectionFrom = selectionFrom;
    this.selectionTo = selectionTo;
    this.changeFrom = changeFrom;
    this.changeTo = changeTo;
    this.type = type;
  }

  textFrom: string;
  textTo: string;

  selectionFrom: number;
  selectionTo: number;

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
