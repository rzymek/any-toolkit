import { anyPrintableString } from "./anyString.js";

export function anyError(message = anyPrintableString()): Error {
  return new Error(message);
}
