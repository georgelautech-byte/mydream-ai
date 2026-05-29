import { getRandomInt } from '../helpers/getRandomInt';

export function getRandomObjectArray<T>(array: T[]): T {
  const randomInt = getRandomInt(0, array.length);

  return array[randomInt];
}
