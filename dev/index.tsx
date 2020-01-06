import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { InputNumber } from "./input-number/input-number";

const Root = function() {
  const [text, setText] = useState("");

  return (
    <div className="foo">
      <InputNumber
        value={text}
        onChange={e => {
          setText(e.text);
        }}
      />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
