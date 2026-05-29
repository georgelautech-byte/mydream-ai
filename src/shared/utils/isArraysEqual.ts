export function isArraysEqual(firstArray?: unknown[], secondArray?: unknown[]) {
  if (firstArray === undefined || secondArray === undefined) return true;

  return firstArray.toString() === secondArray.toString();
}
