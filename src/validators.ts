/**
 * Utility helpers for validating numeric inputs.
 */

/**
 * Returns true if the given value is a finite number greater than or equal to zero.
 * Rejects NaN, Infinity, negative values and non-numeric types.
 */
export function isValidMeasurement(value: number): boolean {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0;
}
