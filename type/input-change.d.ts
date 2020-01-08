export declare class InputChange {
    static getSelection(textFrom: string, textTo: string): [number, number];
    static getSelectionFrom(textFrom: string, textTo: string, selectionTo: number): number;
    static create(textFrom: string, selectionFrom: number, textTo: string, selectionTo: number): InputChange;
    constructor(textFrom: string, textTo: string, selectionFrom: number, selectionTo: number, changeFrom: string, changeTo: string);
    clone(): InputChange;
    alterChangeTo(text: string): void;
    readonly textFrom: string;
    textTo: string;
    readonly selectionFrom: number;
    selectionTo: number;
    changeFrom: string;
    changeTo: string;
    readonly changeIndex: number;
    type: InputChangeType;
    private detectType;
}
export declare enum InputChangeType {
    None = 0,
    Append = 1,
    Remove = 2,
    Replace = 3,
    Clean = 4
}
