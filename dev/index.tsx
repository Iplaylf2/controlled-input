import React from "react";
import ReactDOM from "react-dom";

import { AssignBuilder, AssignNext } from "../src/assign-builder";

const builder = AssignBuilder.create<{
  a: string;
}>()
  .use((next: AssignNext<{ b: number }>) => context => {
    console.log("m1->", JSON.stringify(context));
    next({ b: 1 });
    console.log("<-m1", JSON.stringify(context));
  })
  .use((next: AssignNext<{ c: boolean }>) => context => {
    console.log("m2->", JSON.stringify(context));
    next({ c: true });
    console.log("<-m2", JSON.stringify(context));
  })
  .use((next: AssignNext<{ d: object }>) => context => {
    console.log("m3->", JSON.stringify(context));
    next({ d: {} });
    console.log("<-m3", JSON.stringify(context));
  });

const run = builder.build();
console.log("run");
console.dir(run);
console.dir(run({ a: "aaa" }));

ReactDOM.render(<div>dev</div>, document.getElementById("root"));
