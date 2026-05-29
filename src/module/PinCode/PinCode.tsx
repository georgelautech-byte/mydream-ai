import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import CircleButton from '@/shared/ui/buttons/CircleButton';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptic from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AppIcon from '@/assets/icons/app_icon_transparent.png';
import { useTranslation } from 'react-i18next';
import { normalizedSize } from '@/shared/utils/size';

interface PinCodeProps {
  onResult: (code: string, isBiometricRight: boolean) => void;

  title: string;
  isPasscodeOn?: null | number;
  isBiometricOn: boolean;
  newPin?: boolean;
}

export default function PinCode({ newPin, title, isPasscodeOn, isBiometricOn, onResult }: PinCodeProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0);

  const offset = useSharedValue(0);
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  useEffect(() => {
    if (code.length === 4) {
      onResult(code.join(''), false);
      setCode([]);
    }
  }, [code]);

  const { vibrateSelection } = useVibration();
  const onNumberPress = (number: number) => {
    vibrateSelection();
    setCode([...code, number]);
  };

  const numberBackSpace = () => {
    vibrateSelection();
    setCode(code.slice(0, -1));
  };

  const onBiometricPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (success) {
      onResult(code.join(''), true);
      setCode([]);
    } else {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
    }
  };

  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    if (isBiometricOn) {
      const auth = LocalAuthentication.authenticateAsync({
        promptMessage: t('protection.welcome-back'),
        fallbackLabel: t('protection.enter-passcode'),
      });

      auth.then(result => {
        if (result.success) {
          onResult(code.join(''), true);
          setCode([]);
        } else {
          Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
        }
      });
    }
  }, []);

  if (!isPasscodeOn && !newPin) {
    return (
      <PageWrapper>
        <LinearGradient colors={['#000a4478', '#1a009e45', '#9600e76a']}>
          <SafeAreaView>
            <Grid height="100%">
              <Grid space="lg" marginTop={60} align="center">
                <Typography weight="bold" textAlign="center" variant="title-1">
                  {title}
                </Typography>
                <Image source={AppIcon} style={{ height: normalizedSize(90), width: normalizedSize(90) }} />
              </Grid>
            </Grid>
          </SafeAreaView>
        </LinearGradient>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <LinearGradient colors={['#000a4478', '#1a009e45', '#9600e76a']}>
        <SafeAreaView>
          <Grid height="100%" justfity="center">
            <Grid marginTop={70} row justfity="center" align="center">
              <Typography weight="bold" textAlign="center" variant="title-1">
                {title}
              </Typography>
            </Grid>

            <Animated.View style={styleAnimation}>
              <Grid style={styles.codeView}>
                {codeLength.map((_, index) => (
                  <Grid
                    key={index}
                    style={[
                      styles.codeEmpty,
                      { backgroundColor: code[index] !== undefined ? colors.text.primary : '#ffffff27' },
                    ]}
                  />
                ))}
              </Grid>
            </Animated.View>

            <Grid gap={15} align="center" marginHorizontal={50}>
              {numbers.map((row, rowIndex) => (
                <Grid gap={15} row key={rowIndex} justfity="space-between">
                  {row.map(number => (
                    <CircleButton text={number} onPress={() => onNumberPress(number)} key={number} />
                  ))}
                </Grid>
              ))}

              <Grid gap={15} row justfity="space-between">
                <Grid flex={1} style={{ minWidth: 0 }}>
                  {isBiometricOn && (
                    <CircleButton onPress={onBiometricPress}>
                      <MaterialCommunityIcons name="face-recognition" size={26} color="#fff" />
                    </CircleButton>
                  )}
                </Grid>

                <CircleButton onPress={() => onNumberPress(0)}>
                  <Typography style={styles.number}>{0}</Typography>
                </CircleButton>

                <Grid flex={1} style={{ minWidth: 0 }}>
                  <CircleButton onPress={numberBackSpace}>
                    <MaterialIcons name="backspace" size={26} color="#fff" />
                  </CircleButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SafeAreaView>
      </LinearGradient>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  greetings: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: normalizedSize(60),
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalizedSize(20),
    marginVertical: normalizedSize(60),
  },
  codeEmpty: {
    width: normalizedSize(20),
    height: normalizedSize(20),
    borderRadius: 10,
  },
  number: {
    fontSize: normalizedSize(20),
  },
});
