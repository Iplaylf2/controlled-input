import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";
import { InputChangeType } from "../input-change";

export const IllegalFilter: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    const { change } = context;
    switch (change.type) {
      case InputChangeType.Append:
      case InputChangeType.Replace:
        const afterFilter = change.changeTo.replace(/[^\-\.0-9]/g, "");
        context.change.alterChangeTo(afterFilter);
        if (context.change.type === InputChangeType.None) {
          return;
        }
        break;
      default:
        break;
    }
    next(context);
  };
};
