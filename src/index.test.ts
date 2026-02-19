import { sort } from "./index";
import { Stack } from "./types";
import { isValidMeasurement } from "./validators";

describe("package sorting", () => {
  test("standard packages", () => {
    expect(sort(10, 10, 10, 1)).toBe(Stack.STANDARD);
    // anything with volume < 1e6 and dims < 150
    expect(sort(100, 100, 99, 19.9)).toBe(Stack.STANDARD);
  });

  test("bulky but not heavy -> special", () => {
    expect(sort(150, 1, 1, 1)).toBe(Stack.SPECIAL); // dimension
    expect(sort(100, 100, 100, 1)).toBe(Stack.SPECIAL); // volume 1e6
    expect(sort(100, 100, 100, 19.9)).toBe(Stack.SPECIAL);
  });

  test("heavy but not bulky -> special", () => {
    expect(sort(10, 10, 10, 20)).toBe(Stack.SPECIAL);
    // not bulky: dims <150 and volume <1e6
    expect(sort(100, 100, 100, 20)).toBe(Stack.REJECTED); // actually volume equals threshold, not in this case
  });

  test("both heavy and bulky -> rejected", () => {
    expect(sort(150, 150, 150, 20)).toBe(Stack.REJECTED);
    expect(sort(100, 100, 100, 20)).toBe(Stack.REJECTED); // volume criteria
    expect(sort(150, 100, 100, 20)).toBe(Stack.REJECTED);
  });

  test("edge cases around thresholds", () => {
    expect(sort(0, 0, 0, 0)).toBe(Stack.STANDARD);
    expect(sort(150, 0, 0, 0)).toBe(Stack.SPECIAL);
    expect(sort(0, 150, 0, 0)).toBe(Stack.SPECIAL);
    expect(sort(0, 0, 150, 0)).toBe(Stack.SPECIAL);
    // volume exactly 1e6 is considered bulky
    expect(sort(100, 100, 100, 19.9999)).toBe(Stack.SPECIAL);
    expect(sort(100, 100, 100, 20)).toBe(Stack.REJECTED);
  });

  test("invalid inputs should throw", () => {
    expect(() => sort(-1, 10, 10, 1)).toThrow();
    expect(() => sort(10, NaN, 10, 1)).toThrow();
  });

  test("validator helper works", () => {
    expect(isValidMeasurement(0)).toBe(true);
    expect(isValidMeasurement(5.5)).toBe(true);
    expect(isValidMeasurement(-1)).toBe(false);
    expect(isValidMeasurement(Infinity)).toBe(false);
    expect(isValidMeasurement(NaN)).toBe(false);
  });
});
