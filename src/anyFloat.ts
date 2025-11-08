import { showValuesOnFailure } from "./internal/showValuesOnFailure";

export function anyFloat(min = 0, max = 1): number {
  return showValuesOnFailure(`anyFloat(${min}, ${max})`,
    Math.random() * (max - min) + min
  );
}
