import { describe, ErrorWithDiff, expect, it, vi, beforeEach, TestContext } from "vitest";
import { anyInt } from "../anyInt";
import { anyIdentifier, anyPrintableString, anyString } from "../anyString";
import { showValuesOnFailure } from "./showValuesOnFailure";

const { onTestFailed } = vi.hoisted(() => ({
  onTestFailed: vi.fn()
}));

vi.mock("vitest", async (importOriginal) => {
  const actual: {} = await importOriginal();
  return {
    ...actual,
    onTestFailed
  };
});

describe("showValuesOnFailure", () => {
  beforeEach(() => {
    onTestFailed.mockClear();
  });

  it("should include actual used values in error output", async () => {
    // given
    const name = anyIdentifier();
    const value = anyInt();
    const errors: ErrorWithDiff[] = [{
      name: "AssertionError",
      message: anyPrintableString(),
      stack: anyPrintableString()
    }];
    onTestFailed.mockImplementationOnce((callback: (context: { task: Partial<TestContext["task"]> }) => void) =>
      callback({
        task: {
          result: {
            errors,
            state: "fail"
          }
        }
      })
    );
    // when
    const result = showValuesOnFailure(name, value);
    // then
    expect(result).toBe(value);
    expect(errors).toHaveLength(1);
    expect(errors[0].stack).toContain(name);
    expect(errors[0].stack).toContain(value);
  });
});
