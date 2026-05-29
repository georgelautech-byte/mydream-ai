import { useTheme } from '@/shared/hooks/useTheme';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

export default function DismissModalButton() {
  const colors = useTheme();
  return (
    <Pressable
      onPress={() => router.dismiss()}
      style={{
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Entypo name="chevron-down" size={24} color={colors.text.primary} />
    </Pressable>
  );
}
