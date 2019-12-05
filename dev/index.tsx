import React from "react";
import ReactDOM from "react-dom";

import { ModifyBuilder } from "../src/modify-builder";
const foo = ModifyBuilder.create<{ test: number }>();

const bar = foo
  .use(next => context => {
    context.test += 10;
    console.log("m1->", JSON.stringify(context));
    next(context);
    console.log("<-m1", JSON.stringify(context));
  })
  .use(next => context => {
    context.test += 100;
    console.log("m2->", JSON.stringify(context));
    next(context);
    console.log("<-m2", JSON.stringify(context));
  })
  .use(next => context => {
    context.test += 1000;
    console.log("m3->", JSON.stringify(context));
    next(context);
    console.log("<-m3", JSON.stringify(context));
  });

const run = bar.build();
console.log(run({ test: 8 }));

ReactDOM.render(<div>dev</div>, document.getElementById("root"));
