import RandExp from "randexp";
import { showValuesOnFailure } from "./internal/showValuesOnFailure";

export function anyString(length?: number): string;
export function anyString(matching: RegExp): string;
export function anyString(arg: RegExp | number | undefined) {
  return showValuesOnFailure(`anyString(${arg ?? ''})`,
    arg instanceof RegExp
      ? anyStringMatchingRegExp(arg)
      : anyStringOfLength(arg ?? 16)
  );
}

export function anyPrintableString(length = 16) {
  return showValuesOnFailure(`anyPrintableString(${length})`,
    anyStringMatchingRegExp(new RegExp(`[ -~]{${length}}`))
  );
}

export function anyIdentifier(length = 16) {
  return showValuesOnFailure(`anyIdentifier(${length})`,
    anyStringMatchingRegExp(
      new RegExp(`[a-zA-Z_][a-zA-Z0-9_]{${length - 1}}`)
    )
  );
}

function anyStringOfLength(length: number) {
  return anyStringMatchingRegExp(new RegExp(`.{${length}}`));
}

function anyStringMatchingRegExp(matching: RegExp) {
  return new RandExp(matching).gen();
}
