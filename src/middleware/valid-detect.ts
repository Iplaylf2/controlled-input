import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";

export const ValidDetect: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    const { inputTo } = context;
    if (Number.isNaN(inputTo.input.value)) {
      inputTo.valid = false;
    } else {
      const { config } = context;
      const validValue = getVaildValue(
        inputTo.input.value,
        config.min,
        config.max,
        config.step,
        config.precision
      );
      inputTo.valid = validValue === inputTo.input.value;
    }
    next(context);
  };
};

const getVaildValue = function(
  value: number,
  min: number,
  max: number,
  step: number,
  precision: number
): number {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    const sign = Math.sign(value),
      shim = Math.pow(10, precision),
      shimValue = Math.round(Math.abs(value) * shim),
      shimStep = Math.round(step * shim),
      q = Math.floor(shimValue / shimStep);
    return (sign * (q * shimStep)) / shim;
  }
};
