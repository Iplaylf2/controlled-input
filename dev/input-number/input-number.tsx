import React, { useMemo, useEffect, useRef } from "react";
import "./input-number.css";
import { InputChange } from "../../src/input-change";

export const InputNumber = function() {
  const inputRef = useRef<HTMLInputElement>({} as any);

  const inputNumber = useMemo(() => {
    return (status: { text: string }) => {
      inputRef.current.value = status.text;
    };
  }, []);

  useEffect(() => {
    console.log("render");
  });

  return (
    <input
      className="input-number"
      type="text"
      ref={inputRef}
      onChange={e => {
        const target = e.target;

        inputNumber({ text: target.value });

        const textFrom = errorLastText;
        const { value: textTo, selectionEnd: selectionTo } = target as any;

        console.log(
          JSON.stringify(
            InputChange.create(
              textFrom,
              InputChange.getSelectionFrom(textFrom, textTo, selectionTo),
              textTo,
              selectionTo
            )
          )
        );

        errorLastText = textTo;
      }}
    ></input>
  );
};

let errorLastText: string = "";
