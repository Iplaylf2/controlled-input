import { ModifyMiddleware } from "../modify-builder";
import {
  InputNumberContext,
  InputNumberAdjustType
} from "../input-number-context";
import { InputChangeType } from "../input-change";

export const AdjustDetect: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    const beforeAdjust = Object.assign({}, context.change);
    next(context);
    const afterAdjust = context.change;
    if (beforeAdjust.textTo === afterAdjust.textTo) {
      context.adjust = InputNumberAdjustType.Native;
    } else if (afterAdjust.type === InputChangeType.None) {
      context.adjust = InputNumberAdjustType.Block;
    } else if (
      beforeAdjust.selectionTo > afterAdjust.selectionTo &&
      testInclude(beforeAdjust.textTo, afterAdjust.textTo)
    ) {
      context.adjust = InputNumberAdjustType.Trim;
    } else if (
      beforeAdjust.selectionTo < afterAdjust.selectionTo &&
      testInclude(afterAdjust.textTo, beforeAdjust.textTo)
    ) {
      context.adjust = InputNumberAdjustType.Complete;
    } else {
      context.adjust = InputNumberAdjustType.Mutate;
    }
  };
};

const testInclude = function(full: string, part: string): boolean {
  const regText = Array.from(part).reduce((r, c) => r + ".*" + c);
  return new RegExp(regText).test(full);
};
