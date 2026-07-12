import { expect, test } from "vitest";
import { anyBoolean, anyIdentifier, anyInteger, anyPositiveInteger, anyPrintableString, anyString } from "any-toolkit";

test("any-toolkit", () => {
  expect(typeof anyPrintableString()).toBe('string');
  expect(typeof anyString(2)).toBe('string');
  expect(typeof anyString(/X..X/)).toBe('string');
  expect(typeof anyIdentifier()).toBe('string');
  expect(typeof anyBoolean()).toBe('boolean');
  expect(typeof anyInteger()).toBe('number');
  expect(typeof anyPositiveInteger()).toBe('number');
});