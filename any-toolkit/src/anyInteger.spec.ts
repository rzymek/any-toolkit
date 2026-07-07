import { expect, test } from "vitest";
import { anyInteger, anyNegativeInteger, anyPositiveInteger } from "./anyInteger";

test("anyInteger", () => {
  expect(typeof anyInteger()).toBe("number");
  expect(anyInteger()).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
  expect(anyInteger()).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  expect(anyInteger({ min: 5, max: 6 })).toBeGreaterThanOrEqual(5);
  expect(anyInteger({ max: 5002 })).toBeLessThanOrEqual(5002);
  expect(Number.isSafeInteger(anyInteger())).toBe(true);
});

test("anyPositiveInteger", () => {
  expect(anyPositiveInteger()).toBeGreaterThanOrEqual(1);
  expect(anyPositiveInteger()).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  expect(anyPositiveInteger({ max: 10 })).toBeLessThanOrEqual(10);
  expect(anyPositiveInteger({ max: 10 })).toBeGreaterThanOrEqual(1);
  expect(Number.isSafeInteger(anyPositiveInteger())).toBe(true);
});

test("anyNegativeInteger", () => {
  expect(anyNegativeInteger()).toBeLessThanOrEqual(-1);
  expect(anyNegativeInteger()).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
  expect(anyNegativeInteger({ min: -10 })).toBeGreaterThanOrEqual(-10);
  expect(anyNegativeInteger({ min: -10 })).toBeLessThanOrEqual(-1);
  expect(Number.isSafeInteger(anyNegativeInteger())).toBe(true);
});
