import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";
import { InputChangeType } from "../input-change";

export const NonChange: ModifyMiddleware<InputNumberContext> = function(next) {
  return context => {
    if (context.change.type === InputChangeType.None) {
      context.inputTo = context.inputFrom;
      return;
    }
    next(context);
    if (context.change.type === (InputChangeType.None as any)) {
      context.inputTo = context.inputFrom;
      return;
    }
  };
};
