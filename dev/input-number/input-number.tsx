import React, { useMemo, useRef, useEffect } from "react";
import "./input-number.css";
import {
  ModifyBuilder,
  InputNumberContext,
  InputNumberAdjustType,
  InputNumber as InputNumberModel,
  InputNumberConfig as InputNumberConfigModel,
  RegularInputNumber,
  InputChange,
  MiddlewareList,
  InputChangeType
} from "../../src";

const {
  AdjustDetect,
  NonChange,
  NormalAdjust,
  GetInputNumberTo,
  KeepBorderAppend,
  ValidDetect
} = MiddlewareList;

export type InputNumberConfig = InputNumberConfigModel;

export type InputNumberTarget = {
  text: string;
  value: number;
  change: "native" | "block" | "trim" | "complete" | "mutate";
  valid: boolean;
};

export const InputNumber = function(props: {
  config?: InputNumberConfig;
  value: string;
  onChange: (target: InputNumberTarget) => void;
}) {
  const config = props.config || {
    max: Infinity,
    min: -Infinity,
    precision: Infinity,
    step: 1
  };

  const expectRef = useRef<[RegularInputNumber, number][]>([]);

  const lastInputRef = useRef<RegularInputNumber>(null as any);
  const shortLastInputRef = useRef<RegularInputNumber>(null as any);

  const inputRef = useRef<HTMLInputElement>({} as any);

  const dispatchInput = useMemo(() => {
    const inputMap = ModifyBuilder.create<InputNumberContext>()
      .use(AdjustDetect)
      .use(NonChange)
      .use(NormalAdjust)
      .use(GetInputNumberTo)
      .use(KeepBorderAppend)
      .use(ValidDetect)
      .build();

    return (status: { textTo: string; selectionTo: number }) => {
      const lastInput = shortLastInputRef.current;

      const selectionFrom = InputChange.getSelectionFrom(
        lastInput.input.text,
        status.textTo,
        status.selectionTo
      );

      //block
      inputRef.current.value = lastInput.input.text;
      inputRef.current.selectionEnd = selectionFrom;
      inputRef.current.selectionStart = selectionFrom;

      const context = inputMap({
        change: InputChange.create(
          lastInput.input.text,
          selectionFrom,
          status.textTo,
          status.selectionTo
        ),
        config,
        adjust: InputNumberAdjustType.Native,
        inputFrom: lastInput,
        inputTo: {} as any
      });

      props.onChange({
        text: context.inputTo.input.text,
        value: context.inputTo.input.value,
        valid: context.inputTo.valid,
        change: adjust2change[context.adjust] as any
      });

      if (context.change.type !== InputChangeType.None) {
        shortLastInputRef.current = context.inputTo;
        expectRef.current.push([context.inputTo, context.change.selectionTo]);
      }
    };
  }, [config.max, config.min, config.precision, config.step, props.onChange]);

  useEffect(() => {
    const white = {
      valid: false,
      input: InputNumberModel.createWhite()
    };

    expectRef.current.push([white, 0]);

    lastInputRef.current = white;
    shortLastInputRef.current = lastInputRef.current;
  }, [config.max, config.min, config.precision, config.step]);

  useEffect(() => {
    let [inputTo, selectionTo] = expectRef.current.shift() as any;

    if (props.value !== inputTo.input.text) {
      expectRef.current = [];
      shortLastInputRef.current = lastInputRef.current;
      dispatchInput({
        textTo: props.value,
        selectionTo: props.value.length
      });
      [inputTo, selectionTo] = expectRef.current.shift() as any;
      if (props.value !== inputTo.input.text) {
        return;
      }
    }

    lastInputRef.current = inputTo;

    inputRef.current.value = inputTo.input.text;
    inputRef.current.selectionEnd = selectionTo;
    inputRef.current.selectionStart = selectionTo;
  }, [props.value, config.max, config.min, config.precision, config.step]);

  return (
    <input
      className="input-number"
      type="text"
      ref={inputRef}
      onChange={e => {
        const target = e.target;

        const { value: textTo, selectionEnd: selectionTo } = target as any;

        dispatchInput({ textTo, selectionTo });
      }}
    ></input>
  );
};

const adjust2change = {
  [InputNumberAdjustType.Native]: "native",
  [InputNumberAdjustType.Block]: "block",
  [InputNumberAdjustType.Trim]: "trim",
  [InputNumberAdjustType.Complete]: "complete",
  [InputNumberAdjustType.Mutate]: "mutate"
};
