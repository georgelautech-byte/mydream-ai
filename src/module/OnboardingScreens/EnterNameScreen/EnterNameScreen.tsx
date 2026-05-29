import { useAuth } from '@/entities/auth/auth.repository';
import { useUserTags } from '@/entities/userTags/userTags.repository';
import AnimatedWrapper from '@/shared/ui/animations/AnimatedWrapper';
import Button from '@/shared/ui/buttons/Button';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Input from '@/shared/ui/controller/Input';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';

interface EnterNameScreenProps {
  onPressButton?: () => void;
  goPrevPage?: () => void;
  onChange: (name: string) => void;
}

export default function EnterNameScreen({ onPressButton, goPrevPage, onChange }: EnterNameScreenProps) {
  const { updateName } = useUserTags();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [nameText, setNameText] = useState(user?.displayName || '');
  const isDisabled = nameText.length === 0;
  const onChangeName = (text: string) => {
    setNameText(text);
  };

  const onPressButtonFunc = () => {
    updateName(nameText);
    if (user?.displayName !== nameText) {
      onChange(nameText);
    }

    if (onPressButton) {
      onPressButton();
    }
  };

  return (
    <SafeWrapper style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // keyboardVerticalOffset={normalizedSize(80)}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Grid height="100%" justfity="space-between" paddingVertical={20}>
          <Grid space="md">
            {goPrevPage && (
              <Grid align="flex-start">
                <GoBackButton onPress={goPrevPage} />
              </Grid>
            )}
            <Typography variant="largeTitle" weight="extra-bold">
              {t('onboarding.name-question')}
            </Typography>
            <Typography color="secondary">{t('onboarding.name-question-explanation')}</Typography>
          </Grid>

          <AnimatedWrapper>
            <Input value={nameText} placeholder={t('onboarding.input-name-placeholder')} onChangeText={onChangeName} />
          </AnimatedWrapper>

          <AnimatedWrapper style={{ marginBottom: 0 }}>
            <Button disabled={isDisabled} onPress={onPressButtonFunc}>
              {t('onboarding.continue')}
            </Button>
          </AnimatedWrapper>
        </Grid>
      </KeyboardAvoidingView>
    </SafeWrapper>
  );
}
