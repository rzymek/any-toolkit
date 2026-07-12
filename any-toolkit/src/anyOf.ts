import { anyInteger } from "./anyInteger.js";

export function anyOf<T>(...values: T[]): T {
  return values[anyInteger({ min: 0, max: values.length - 1 })];
}
