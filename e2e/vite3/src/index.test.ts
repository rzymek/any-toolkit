import { expect, test } from "vitest";
import { anyBoolean, anyIdentifier, anyInt, anyPrintableString, anyString } from "any-toolkit-vitest";

test("vite3", () => {
  anyString();
  anyPrintableString();
  anyString(2);
  anyString(/X..X/);
  anyInt();
  anyBoolean();
  anyIdentifier();
  expect(true).toBe(false);
});