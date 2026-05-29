import { PickerStyle } from 'react-native-picker-select';
import { normalizedSize } from '../utils/size';

export const pickerStyle = (secondary: string): PickerStyle => {
  const res: PickerStyle = {
    inputIOS: {
      paddingVertical: normalizedSize(14),
      paddingHorizontal: normalizedSize(16),
      borderWidth: 1,
      borderColor: '#2F3A59',
      borderRadius: 15,
      color: '#FFFFFF',
      backgroundColor: secondary,
      fontSize: normalizedSize(16),
      fontWeight: '500',
    },
    inputIOSContainer: {
      zIndex: 1000,
    },
    inputAndroid: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#2F3A59',
      borderRadius: 12,
      color: '#FFFFFF',
      backgroundColor: '#1C1F2E',
      fontSize: 16,
      fontWeight: '500',
    },
    inputAndroidContainer: {
      zIndex: 1000,
    },
    placeholder: {
      color: '#ffffff', // серый текст
      zIndex: -1,
    },
    iconContainer: {
      top: 16,
      right: 12,
    },
  };

  return res;
};
