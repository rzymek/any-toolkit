import { describe, it, expect } from "vitest";
import { anyFloat, anyPercentage } from "./anyFloat";

describe("anyFloat", () => {
  it("should return a number", () => {
    expect(typeof anyFloat()).toBe("number");
  });

  it("should return a number within MIN_VALUE and MAX_VALUE by default", () => {
    const value = anyFloat();
    expect(value).toBeGreaterThanOrEqual(Number.MIN_VALUE);
    expect(value).toBeLessThanOrEqual(Number.MAX_VALUE);
  });

  it("should return a number within the specified range", () => {
    const value = anyFloat({ min: 10, max: 20 });
    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(20);
  });

  it("should handle negative ranges", () => {
    const value = anyFloat({ min: -20, max: -10 });
    expect(value).toBeGreaterThanOrEqual(-20);
    expect(value).toBeLessThanOrEqual(-10);
  });

  it("should not always return an integer", () => {
    const values = Array.from({ length: 1000 }, () =>
      anyFloat({ min: 0, max: 1 }),
    );
    const hasFloat = values.some((value) => !Number.isInteger(value));
    expect(hasFloat).toBe(true);
  });
});

describe("anyPercentage", () => {
  it("should return a number between 0 and 1", () => {
    const value = anyPercentage();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);
  });
});
