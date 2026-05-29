import { Dimensions } from 'react-native';
import { MAX_WIDTH_APP } from '../config/constants/constants';

export const calcWidth = () => {
  const { width } = Dimensions.get('window');

  if (width > MAX_WIDTH_APP) {
    return MAX_WIDTH_APP;
  } else {
    return width;
  }
};
