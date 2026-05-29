import { useDreamStore } from '@/entities/dream/dream.store';
import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import Button from '@/shared/ui/buttons/Button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AddDreamButton() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { dreamText } = useDreamStore();
  const { vibrate } = useVibration();
  const handlePress = () => {
    vibrate();
    router.push('/screens/newDreamScreen');
  };

  return (
    <Button
      onPress={handlePress}
      style={{ borderRadius: colors.styles.borderRadius, flex: 1 }}
      leftIcon={<MaterialCommunityIcons name="pencil-plus" size={24} color={colors.text.white} />}
    >
      {dreamText ? t('home.continue-writing') : t('home.note-a-new-dream')}
    </Button>
  );
}
