import React, { useMemo, useEffect, useRef } from "react";
import "./input-number.css";
import {
  ModifyBuilder,
  InputNumberContext,
  InputNumberAdjustType,
  InputNumber as InputNumberModel,
  InputChange,
  MiddlewareList
} from "../../src";

const {
  AdjustDetect,
  NonChange,
  NormalAdjust,
  GetInputNumberTo,
  KeepBorderAppend,
  ValidDetect
} = MiddlewareList;

export const InputNumber = function() {
  const inputRef = useRef<HTMLInputElement>({} as any);

  const inputNumber = useMemo(() => {
    const inputMap = ModifyBuilder.create<InputNumberContext>()
      .use(AdjustDetect)
      .use(NonChange)
      .use(NormalAdjust)
      .use(GetInputNumberTo)
      .use(KeepBorderAppend)
      .use(ValidDetect)
      .build();

    let lastInput = {
      valid: false,
      input: InputNumberModel.createWhite()
    };

    const config = {
      max: Infinity,
      min: -Infinity,
      precision: Infinity,
      step: 1
    };

    return (status: { textTo: string; selectionTo: number }) => {
      const context = inputMap({
        change: InputChange.create(
          lastInput.input.text,
          InputChange.getSelectionFrom(
            lastInput.input.text,
            status.textTo,
            status.selectionTo
          ),
          status.textTo,
          status.selectionTo
        ),
        config,
        adjust: InputNumberAdjustType.Native,
        inputFrom: lastInput,
        inputTo: {} as any
      });

      lastInput = context.inputTo;

      inputRef.current.value = context.change.textTo;
      inputRef.current.selectionEnd = context.change.selectionTo;
      inputRef.current.selectionStart = context.change.selectionTo;

      console.log(JSON.stringify(context));
    };
  }, []);

  return (
    <input
      className="input-number"
      type="text"
      ref={inputRef}
      onChange={e => {
        const target = e.target;

        const { value: textTo, selectionEnd: selectionTo } = target as any;

        inputNumber({ textTo, selectionTo });
      }}
    ></input>
  );
};
