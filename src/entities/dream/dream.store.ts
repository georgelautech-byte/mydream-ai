import { MAX_LENGTH_DREAM_TEXT } from '@/shared/config/constants/constants';
import { Alert } from 'react-native';
import { create } from 'zustand';

interface State {
  dreamText: string;
}

interface Actions {
  setDreamText: (text: string) => void;
}

export const useDreamStore = create<State & Actions>(set => ({
  dreamText: '',
  setDreamText: (text: string) => {
    if (text.length < MAX_LENGTH_DREAM_TEXT) {
      set({ dreamText: text });
    } else {
      Alert.alert('Text is too long', `Please limit your text to ${MAX_LENGTH_DREAM_TEXT} characters.`);
    }
  },
}));
