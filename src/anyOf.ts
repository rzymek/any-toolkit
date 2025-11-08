import { anyInt } from './anyInt';
import { showValuesOnFailure } from './internal/showValuesOnFailure';

export function anyOf<T>(...array: T[]): T {
  return showValuesOnFailure(`anyOf([${array.length}])`,
    array[anyInt(0, array.length - 1)]
  );
}
