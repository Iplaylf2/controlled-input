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

  const expectRef = useRef<[RegularInputNumber, InputChange][]>([]);

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

    lastInputRef.current = {
      valid: false,
      input: InputNumberModel.createWhite()
    };

    shortLastInputRef.current = lastInputRef.current;

    return (status: { textTo: string; selectionTo: number }) => {
      const lastInput = shortLastInputRef.current;

      const selectionFrom = InputChange.getSelectionFrom(
        lastInput.input.text,
        status.textTo,
        status.selectionTo
      );

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

      shortLastInputRef.current = context.inputTo;

      expectRef.current.push([context.inputTo, context.change]);
      props.onChange({
        text: context.inputTo.input.text,
        value: context.inputTo.input.value,
        valid: context.inputTo.valid,
        change: adjust2change[context.adjust] as any
      });
    };
  }, [config.max, config.min, config.precision, config.step, props.onChange]);

  useEffect(() => {
    const expect = expectRef.current.shift();
    if (!expect) {
      return;
    }
    const [inputTo, change] = expect;
    if (props.value === inputTo.input.text) {
      lastInputRef.current = inputTo;

      inputRef.current.value = change.textTo;
      inputRef.current.selectionEnd = change.selectionTo;
      inputRef.current.selectionStart = change.selectionTo;
    } else {
      expectRef.current = [];
      shortLastInputRef.current = lastInputRef.current;
      dispatchInput({
        textTo: props.value,
        selectionTo: props.value.length
      });
    }
  }, [props.value]);

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
