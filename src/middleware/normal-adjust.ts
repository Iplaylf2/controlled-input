import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";
import { InputChangeType } from "../input-change";

export const NormalAdjust: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    const { change } = context;
    switch (change.type) {
      case InputChangeType.Append:
      case InputChangeType.Replace:
        const filterIllegalChar = change.changeTo.replace(/[^\-\.0-9]/g, "");

        const filterMinus =
          change.changeIndex === 0
            ? filterIllegalChar.charAt(0) +
              filterIllegalChar.substring(1).replace(/\-/g, "")
            : filterIllegalChar.replace(/\-/g, "");

        let filterDot: string;
        const dotIndex =
          change.textFrom.length - context.inputFrom.input.fractional.length;

        if (
          context.inputFrom.input.fractional.length > 0 &&
          dotIndex < change.changeIndex &&
          dotIndex >= change.selectionFrom
        ) {
          filterDot = filterMinus.replace(/\./g, "");
        } else {
          const border = filterMinus.indexOf(".") + 1;
          filterDot =
            filterMinus.substring(0, border) +
            filterMinus.substring(border).replace(/\./g, "");
        }

        context.change.alterChangeTo(filterDot);
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
