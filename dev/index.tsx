import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { InputNumber } from "./input-number/input-number";

const Root = function() {
  const [text, setText] = useState("");
  const [change, setChange] = useState("-");

  return (
    <div className="root">
      <InputNumber
        value={text}
        onChange={e => {
          setText(e.text);
          setChange(e.change);
        }}
      />
      <div>{change}</div>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
