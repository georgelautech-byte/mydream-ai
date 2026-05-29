import DogAnim from '@/assets/animations/dog_anim_2.json';
import { useCreateDream } from '@/entities/dream/dream.repository';
import { useLang } from '@/shared/hooks/useLangStore';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useTheme } from '@/shared/hooks/useTheme';
import { analytics, Events } from '@/shared/service/analytics.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import Button from '@/shared/ui/buttons/Button';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { Alert, Modal } from 'react-native';

interface SaveAndAnaluzeButtonProps {
  dreamText: string;
  disabled: boolean;
  onChangeText: (text: string) => void;
}

export default function SaveAndAnaluzeButton({ dreamText, disabled, onChangeText }: SaveAndAnaluzeButtonProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const { lang } = useLang();
  const { createDreamFunction, isPending } = useCreateDream();
  const { subscriptionStatus } = useSubscription();

  const onPressCreateDream = async () => {
    if (dreamText.trim().length === 0) {
      Alert.alert(t('dream-input.enter-description'));
      analytics.trackEvent(Events.press_record_button_under_text, {
        dreamText: dreamText,
        local: lang,
      });
      return;
    }

    if (dreamText.trim().length < 7) {
      Alert.alert(t('dream-input.more-words-needed'));
      analytics.trackEvent(Events.press_record_button_under_text, {
        dreamText: dreamText,
        local: lang,
      });
      return;
    }

    analytics.trackEvent(Events.press_record_button, {
      local: lang,
    });

    try {
      const res = await createDreamFunction({
        inputText: dreamText,
      });

      console.log('RES: ', res);

      router.dismissAll();

      if (!res) {
        return;
        // throw new Error(t('dream-input.dream-not-created'));
      }

      onChangeText('');
      router.push(`/screens/dream/${res.id}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        const nextAvailableDate = new Date(e?.response?.data?.nextDate).toLocaleString();
        const limit = e?.response?.data?.limit;
        Alert.alert(
          t('dream-input.reached-limit', { limit, time: nextAvailableDate }) || t('dream-input.unknown-error'),
        );
        analytics.trackEvent(Events.error_to_create_dream, {
          local: lang,
          error: e.message,
          subStatus: subscriptionStatus,
        });
      }
      errorLogger.logError('Error in SaveAndAnaluzeButton');
    }
  };

  return (
    <>
      <Button
        leftIcon={
          <FontAwesome6
            name="wand-magic-sparkles"
            size={20}
            color={disabled ? colors.background.neutral : colors.text.white}
          />
        }
        disabled={disabled}
        onPress={onPressCreateDream}
      >
        {t('dream-input.analyze-button')}
      </Button>
      <Modal transparent visible={isPending} animationType="fade">
        <ModalContainer>
          <Grid width="90%">
            <Paper color="#2c4376">
              <Grid width="100%" space="md" align="center">
                <LottieView
                  autoPlay
                  style={{ width: '100%', height: 250, shadowColor: '#60eaff', shadowOpacity: 1, shadowRadius: 4 }}
                  source={DogAnim}
                />
                <Typography textAlign="center" weight="bold" variant="title-3">
                  {t('dream-input.analyzing-loading')}
                </Typography>
                <LoaderIndicator />
              </Grid>
            </Paper>
          </Grid>
        </ModalContainer>
      </Modal>
    </>
  );
}
