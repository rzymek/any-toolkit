import { anyInteger } from "./anyInteger.js";

export function anyOf<T>(...array: T[]): T {
  return array[anyInteger({ min: 0, max: array.length - 1 })];
}
