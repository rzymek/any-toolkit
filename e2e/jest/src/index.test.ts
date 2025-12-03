import { expect, test } from "@jest/globals";
import { anyBoolean, anyIdentifier, anyInt, anyPrintableString, anyString } from "any-toolkit";

test("any-toolkit", () => {
  anyString();
  anyPrintableString();
  anyString();
  anyInt();
  anyBoolean();
  anyIdentifier();
  expect(typeof anyBoolean()).toBe("boolean");
});