import { expect, test } from "vitest";
import { anyBoolean, anyIdentifier, anyInt, anyPrintableString, anyString } from "any-toolkit-vitest";

test("vite4", () => {
  anyString();
  anyPrintableString();
  anyString();
  anyInt();
  anyBoolean();
  anyIdentifier();
  expect(typeof anyBoolean()).not.toBe("boolean");
});