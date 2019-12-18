import { ModifyMiddleware } from "../modify-builder";
import { InputNumberContext } from "../input-number-context";

export const ValidDetect: ModifyMiddleware<InputNumberContext> = function(
  next
) {
  return context => {
    const { inputTo } = context,
      { value } = inputTo.input;
    if (Number.isNaN(value)) {
      inputTo.valid = false;
    } else {
      const { config } = context;
      if (value < config.min) {
        inputTo.valid = false;
      } else if (value > config.max) {
        inputTo.valid = false;
      } else {
        if (config.precision !== Infinity) {
          const sign = Math.sign(value),
            shim = Math.pow(10, config.precision),
            shimValue = Math.round(Math.abs(value) * shim),
            shimStep = Math.round(config.step * shim),
            q = Math.floor(shimValue / shimStep);

          const vaildValue = (sign * (q * shimStep)) / shim;
          inputTo.valid = vaildValue === value;
        } else {
          inputTo.valid = true;
        }
      }
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
