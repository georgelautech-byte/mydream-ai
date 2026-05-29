import { useCreateDream } from '@/entities/dream/dream.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import Button from '@/shared/ui/buttons/Button';
import Input from '@/shared/ui/controller/Input';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function CreateDreamInput() {
  const colors = useTheme();
  const { createDreamFunction, isPending } = useCreateDream();

  const [dreamText, setDreamText] = useState('');
  const buttonVisibility = useSharedValue(0);

  const onChangeText = (text: string) => {
    setDreamText(text);
    buttonVisibility.value = text.trim().length > 0 ? 1 : 0;
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(buttonVisibility.value === 1 ? 0 : -50) }],
    opacity: withTiming(buttonVisibility.value),
  }));

  const onPressCreateDream = async () => {
    if (dreamText.trim().length === 0) {
      Alert.alert('Please enter a dream description');
      return;
    }

    if (dreamText.split(' ').length < 3) {
      Alert.alert('Please enter at least 3 words');
      return;
    }
    setDreamText('');

    buttonVisibility.value = 0;
    await createDreamFunction({
      inputText: dreamText,
    });
  };

  const isButtonDisabled = dreamText.trim().length === 0 || isPending;

  return (
    <>
      <Grid space="md">
        <Input
          value={dreamText}
          onChangeText={onChangeText}
          placeholder={'You can use microphone button'}
          multiline
          numberOfLines={3}
          enterKeyHint="done"
          keyboardAppearance="dark"
          returnKeyLabel=""
          style={{ height: 120, zIndex: 100 }}
        />

        <Button
          leftIcon={
            <FontAwesome6
              name="wand-magic-sparkles"
              size={20}
              color={isButtonDisabled ? colors.background.neutral : colors.text.white}
            />
          }
          disabled={isButtonDisabled}
          onPress={onPressCreateDream}
        >
          Save & Analyze
        </Button>
      </Grid>

      {/* Модальная карточка с индикатором загрузки */}
      <Modal transparent visible={isPending} animationType="fade">
        <ModalContainer>
          <Paper>
            <Grid space="md">
              <Typography weight="bold" variant="title-3">
                Analyzing your dream...
              </Typography>
              <ActivityIndicator size="large" />
            </Grid>
          </Paper>
        </ModalContainer>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  animatedButtonContainer: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
  },
  spinnerCard: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
