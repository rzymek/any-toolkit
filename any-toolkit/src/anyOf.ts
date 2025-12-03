import { anyInt } from "./anyInt.js";

export function anyOf<T>(...array: T[]): T {
  return array[anyInt(0, array.length - 1)];
}
