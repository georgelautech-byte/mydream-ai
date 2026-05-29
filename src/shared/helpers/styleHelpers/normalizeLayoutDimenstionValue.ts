import { DimensionValue } from 'react-native';
import { normalizedSize } from '../../utils/size';

export const normalizeLayoutDimenstionValue = (value: DimensionValue) => {
  if (Number.isInteger(value) && typeof value === 'number') {
    return normalizedSize(value);
  }
  return value;
};
