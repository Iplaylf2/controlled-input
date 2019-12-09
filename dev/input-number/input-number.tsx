import React, { useMemo, useEffect, useRef } from "react";
import "./input-number.css";

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
        inputNumber({ text: e.target.value });
      }}
    ></input>
  );
};
