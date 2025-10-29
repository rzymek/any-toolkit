import { anyInt } from './anyInt';

export function anyOf<T>(...array: T[]): T {
  return array[anyInt(0, array.length - 1)];
}
