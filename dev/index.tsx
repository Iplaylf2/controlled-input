import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { InputNumber } from "./input-number/input-number";

const Root = function() {
  const [text, setText] = useState("");
  const [change, setChange] = useState("-");
  const [valid, setValid] = useState(false);

  return (
    <div className="root">
      <InputNumber
        config={{
          max: Infinity,
          min: -Infinity,
          step: 0.5,
          precision: 1
        }}
        value={text}
        onChange={e => {
          setText(e.text);
          setChange(e.change);
          setValid(e.valid);
        }}
      />
      <div>{change}</div>
      <div>{String(valid)}</div>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
