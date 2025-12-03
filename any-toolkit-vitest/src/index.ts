import * as anyToolkit from "any-toolkit";
import { showActualValueOnError } from "./internal/showActualValueOnError.js";

function wrap<T extends ((...args: any[]) => K) | (() => K), K>(fn: T, name?: string): T {
  return ((...a: Parameters<T>) => showActualValueOnError<K>(name ?? fn.name, fn(...a))) as any;
}

export const anyBoolean = wrap(anyToolkit.anyBoolean, "anyBoolean");
export const anyDate = wrap(anyToolkit.anyDate, "anyDate");
export const anyError = wrap(anyToolkit.anyError, "anyError");
export const anyFloat = wrap(anyToolkit.anyFloat, "anyFloat");
export const anyInt = wrap(anyToolkit.anyInt, "anyInt");
export const anyOf = wrap(anyToolkit.anyOf, "anyOf");
export const anyString = wrap(anyToolkit.anyString, "anyString");
export const anyPrintableString = wrap(anyToolkit.anyPrintableString, "anyPrintableString");
export const anyIdentifier = wrap(anyToolkit.anyIdentifier, "anyIdentifier");
