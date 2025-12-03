import * as anyToolkit from "any-toolkit";
import { showActualValueOnError } from "./internal/showActualValueOnError.js";

function wrap<T extends ((...args: any[]) => K) | (()=>K), K>(fn: T):T {
  return ((...a: Parameters<T>) => showActualValueOnError<K>(fn.name, fn(...a))) as any;
}

export const anyBoolean = wrap(anyToolkit.anyBoolean);
export const anyDate = wrap(anyToolkit.anyDate);
export const anyError = wrap(anyToolkit.anyError);
export const anyFloat = wrap(anyToolkit.anyFloat);
export const anyInt = wrap(anyToolkit.anyInt);
export const anyOf = wrap(anyToolkit.anyOf);
export const anyString = wrap(anyToolkit.anyString);
export const anyPrintableString = wrap(anyToolkit.anyPrintableString);
export const anyIdentifier = wrap(anyToolkit.anyIdentifier);
