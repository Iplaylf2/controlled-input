import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";
import { InputChangeType } from "../input-change";

export const IllegalFilter: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    const { change } = context;
    switch (change.type) {
      case InputChangeType.None:
        context.inputTo = context.inputFrom;
        return;
      case InputChangeType.Append:
      case InputChangeType.Replace:
        const afterFilter = change.changeTo.replace(/[^\-\.0-9]/g, "");
        if (afterFilter !== change.changeTo) {
          change;
        }
        next(context);
        break;
      default:
        next(context);
        break;
    }
  };
};
