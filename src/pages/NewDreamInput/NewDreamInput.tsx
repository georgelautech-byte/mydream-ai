import { useDreamStore } from '@/entities/dream/dream.store';
import SaveAndAnaluzeButton from '@/module/SaveAndAnalyzeButton/SaveAndAnaluzeButton';
import { transcibe } from '@/shared/api/entities/openai/openai.api';
import { useTheme } from '@/shared/hooks/useTheme';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { fontWeight } from '@/shared/styles/typography/typography';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Paper from '@/shared/ui/layout/Paper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import { normalizedSize } from '@/shared/utils/size';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Modal, Platform, TextInput } from 'react-native';

export default function NewDreamInput() {
  const { t } = useTranslation();
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  const [isLoadingTranscribing, setIsLoadingTranscribing] = useState(false);
  const { dreamText, setDreamText } = useDreamStore();

  useEffect(() => {
    if (uri) {
      handleTranscribe();
    }
  }, [uri]);

  const handleTranscribe = async () => {
    setIsLoadingTranscribing(true);
    try {
      const formData = new FormData();
      const audioData = { uri, name: 'audio.m4a', type: 'audio/m4a' };
      formData.append('audio', audioData as unknown as Blob);

      const response = await transcibe(formData);
      setDreamText(dreamText + ' ' + response);
    } catch (e) {
      errorLogger.logError('Error in handleTranscribe');
      console.log(e);
    }
    setIsLoadingTranscribing(false);
  };

  const colors = useTheme();
  const headerHeight = useHeaderHeight();

  const onChangeText = (text: string) => {
    setDreamText(text);
  };

  const isButtonDisabled = dreamText.length === 0;
  return (
    <PageWrapper disableGradient>
      <SafeWrapper style={{ paddingTop: 15 + headerHeight, flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? normalizedSize(85) : 0}
        >
          <TextInput
            onChangeText={onChangeText}
            value={dreamText}
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            autoFocus
            multiline
            scrollEnabled
            placeholder={t('dream-input.placeholder')}
            style={{
              fontSize: 22,
              fontFamily: fontWeight.medium,
              color: colors.text.primary,
              flex: 1,
              textAlignVertical: 'top',
            }}
          />

          <Grid marginTop={20}>
            <SaveAndAnaluzeButton onChangeText={onChangeText} dreamText={dreamText} disabled={isButtonDisabled} />
          </Grid>
          <Modal visible={isLoadingTranscribing} animationType="fade" transparent>
            <ModalContainer>
              <Paper>
                <Grid space="md" align="center">
                  <Typography textAlign="center" weight="bold" variant="title-3">
                    {t('dream-input.audio-loading')}
                  </Typography>
                  <LoaderIndicator />
                </Grid>
              </Paper>
            </ModalContainer>
          </Modal>
        </KeyboardAvoidingView>
      </SafeWrapper>
    </PageWrapper>
  );
}
