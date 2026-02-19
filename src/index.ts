import { Stack } from "./types";
import { isValidMeasurement } from "./validators";

/**
 * Determine which stack a package should be dispatched to based on its dimensions and mass.
 *
 * Rules:
 * - A package is bulky if volume >= 1,000,000 cm^3 OR any dimension >= 150 cm.
 * - A package is heavy if mass >= 20 kg.
 *
 * @param width Width in cm
 * @param height Height in cm
 * @param length Length in cm
 * @param mass Mass in kg
 * @returns one of {
 *   Stack.STANDARD | Stack.SPECIAL | Stack.REJECTED
 * }
 */
export function sort(
  width: number,
  height: number,
  length: number,
  mass: number
): Stack {
  // guard against invalid input
  if (
    !isValidMeasurement(width) ||
    !isValidMeasurement(height) ||
    !isValidMeasurement(length) ||
    !isValidMeasurement(mass)
  ) {
    throw new Error("Invalid dimensions or mass");
  }

  const volume = width * height * length;
  const isBulky =
    volume >= 1_000_000 ||
    width >= 150 ||
    height >= 150 ||
    length >= 150;
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) {
    return Stack.REJECTED;
  }
  if (isBulky || isHeavy) {
    return Stack.SPECIAL;
  }
  return Stack.STANDARD;
}
