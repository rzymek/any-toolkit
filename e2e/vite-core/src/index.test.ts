import { expect, test } from "vitest";
import { anyBoolean, anyIdentifier, anyInt, anyPrintableString, anyString } from "any-toolkit";

test("vite3", () => {
  anyString();
  anyPrintableString();
  anyString();
  anyInt();
  anyBoolean();
  anyIdentifier();
  expect(true).toBe(false);
});
