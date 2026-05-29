import Waveform from '@/assets/animations/wave.json';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import formatTime from '@/shared/helpers/formatTime';
import { useLang } from '@/shared/hooks/useLangStore';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import { analytics, Events } from '@/shared/service/analytics.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import Grid, { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Superwall from '@superwall/react-native-superwall';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Modal } from 'react-native';

interface AudioRecorderButtonProps {}

export default function AudioRecorderButton({}: AudioRecorderButtonProps) {
  const { isActive } = useSubscription();

  const { vibrate } = useVibration();
  const colors = useTheme();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [recording, setRecording] = useState<Audio.Recording>();
  const { t } = useTranslation();
  const { lang } = useLang();

  const startRecording = async () => {
    if (!isActive) {
      analytics.trackEvent(Events.mic_button_inactive, {
        local: lang,
      });
      Superwall.shared.register({
        placement: PLACEMENTS.campaign_trigger,
      });

      return;
    }

    setStartTime(Date.now());
    try {
      vibrate();
      const permissionResponse = await Audio.requestPermissionsAsync();

      if (permissionResponse.status === 'granted') {
        analytics.trackEvent(Events.mic_button_active, {
          local: lang,
          permission: 'granted',
        });
      } else {
        analytics.trackEvent(Events.mic_button_active, {
          local: lang,
          permission: 'denied',
        });
        Alert.alert(t('home.permission-to-access-microphone-was-denied'), t('home.enable-microphone-permission'));
      }

      analytics.trackEvent(Events.mic_button_active, {
        local: lang,
      });

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

      setRecording(recording);
    } catch (e) {
      errorLogger.logError('Error in startRecording');
      console.log(e);
    }
  };

  const stopRecording = async () => {
    setStartTime(null);

    try {
      if (!recording) {
        return;
      }

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      setRecording(undefined);

      const durationMs = Date.now() - (startTime ?? 0);
      setStartTime(null);
      setRecording(undefined);

      if (durationMs < 3000) {
        analytics.trackEvent(Events.audio_too_short, {
          local: lang,
          duration: durationMs,
        });
        Alert.alert(t('home.audio-too-short'), t('home.record-a-few-more'));
        return;
      }

      if (uri) {
        router.push(`/screens/newDreamScreen?uri=${uri}`);
      }
    } catch (e) {
      errorLogger.logError('Error in stopRecording');
      console.log(e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (recording && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => clearInterval(interval);
  }, [recording, startTime]);

  if (!isActive) {
    return (
      <GridPressable
        onPress={() => {
          Superwall.shared.register({
            placement: PLACEMENTS.campaign_trigger,
          });
        }}
        justfity="center"
        flex={1}
        paddingHorizontal={25}
        color={colors.text.primary}
        align="center"
        style={{ borderRadius: colors.styles.borderRadius, width: 90 }}
      >
        <FontAwesome name="microphone" size={32} color={colors.text.white} />
        <Grid style={{ position: 'absolute', right: 15, bottom: 5 }}>
          <FontAwesome name="lock" size={18} color={colors.accent.primary} />
        </Grid>
      </GridPressable>
    );
  }

  return (
    <>
      <GridPressable
        onPress={recording ? stopRecording : startRecording}
        justfity="center"
        flex={1}
        paddingHorizontal={25}
        color={colors.text.primary}
        align="center"
        style={{ borderRadius: colors.styles.borderRadius, width: 90 }}
      >
        {recording ? (
          <FontAwesome name="stop-circle-o" size={30} color={colors.text.white} />
        ) : (
          <FontAwesome name="microphone" size={30} color={colors.text.white} />
        )}
      </GridPressable>
      <Modal visible={!!recording} animationType="fade" transparent>
        <ModalContainer>
          <Grid
            color={'#2c4376'}
            paddingBottom={20}
            style={{ borderRadius: colors.styles.borderRadius }}
            align="center"
            width="80%"
            justfity="center"
            space="sm"
          >
            <Grid align="center">
              <GridPressable onPress={stopRecording} justfity="center" align="center">
                <LottieView
                  resizeMode="cover"
                  autoPlay
                  loop
                  source={Waveform}
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
              </GridPressable>
              <Grid justfity="center" align="center" space="lg">
                <Typography variant="title-3" weight="bold">
                  {formatTime(elapsedTime)}
                </Typography>
                <GridPressable
                  onPress={stopRecording}
                  justfity="center"
                  color={colors.text.primary}
                  align="center"
                  style={{ borderRadius: 100, width: 60, height: 60 }}
                >
                  <FontAwesome name="stop" size={20} color={colors.accent.disabled} />
                </GridPressable>
              </Grid>
            </Grid>
          </Grid>
        </ModalContainer>
      </Modal>
    </>
  );
}
