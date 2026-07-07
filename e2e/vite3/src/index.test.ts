import { expect, it, test } from "vitest";
import {
  anyBoolean,
  anyFloat,
  anyIdentifier,
  anyOf,
  anyPositiveInteger,
  anyPrintableString,
  anyString
} from "any-toolkit-vitest";

test("vite3", () => {
  anyPrintableString();
  anyString(2);
  anyString(/X..X/);
  anyPositiveInteger();
  anyIdentifier();
  expect(typeof anyBoolean()).not.toBe("boolean");
});