import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";
import { InputChangeType } from "../input-change";

export const KeepBorderAppend: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    if (context.change.type === InputChangeType.Append) {
      if (context.inputFrom.input.integer.length < context.change.changeIndex) {
        if (
          context.inputFrom.input.fraction.length - 1 ===
          context.config.precision
        ) {
          context.change.alterChangeTo("");
          return;
        }
      } else {
        const { min, max } = context.config,
          { value, sign } = context.inputTo.input;

        if (
          (min < 0 && value < min) ||
          (min >= 0 && sign === -1) ||
          (max >= 0 && value > max) ||
          (max < 0 && sign === 1)
        ) {
          context.change.alterChangeTo("");
          return;
        }
      }
    }
    next(context);
  };
};
