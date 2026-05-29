export function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
  const mergedArray = [...arr1, ...arr2.filter(item => !arr1.includes(item))];

  return mergedArray;
}
