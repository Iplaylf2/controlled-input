import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";
import { InputNumber } from "../input-number";

export const GetInputNumberTo: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    context.inputTo.input = InputNumber.create(context.change.textTo);
    next(context);
  };
};
