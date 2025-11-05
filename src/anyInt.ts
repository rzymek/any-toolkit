import { showValuesOnFailure } from './showValuesOnFailure';

export function anyInt(min = 0, max = Number.MAX_SAFE_INTEGER): number {
  return showValuesOnFailure(`anyInt(${min}, ${max})`,
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}
