import { expect, test } from "vitest";
import { anyIdentifier, anyPositiveInteger, anyPrintableString, anyString } from "any-toolkit-vitest";

test("vite3", () => {
  anyPrintableString();
  anyString(2);
  anyString(/X..X/);
  anyPositiveInteger();
  anyIdentifier();
  expect(true).toBe(false);
});