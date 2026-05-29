import { useAuth } from '@/entities/auth/auth.repository';
import { IGenderItem, IZodiacItem } from '@/entities/userTags/types/types';
import { useUserTags } from '@/entities/userTags/userTags.repository';
import AgePicker from '@/module/Fields/AgePicker/AgePicker';
import GenderPicker from '@/module/Fields/GenderPicker/GenderPicker';
import GoalsPicker from '@/module/Fields/GoalsPicker/GoalsPicker';
import ZodiacSignPicker from '@/module/Fields/ZodiacSignPicker/ZodiacSignPicker';
import {
  AgeScreen,
  EnterNameScreen,
  GenderChooseScreen,
  GoalsScreen,
  ProgrevScreen,
  WelcomeScreen,
} from '@/module/OnboardingScreens';
import HelpUsScreen from '@/module/OnboardingScreens/HelpUsScreen/HelpUsScreen';
import ShortExplanationScreen from '@/module/OnboardingScreens/ShortExplanationScreen/ShortExplanationScreen';
import ZodiacSignScreen from '@/module/OnboardingScreens/ZodiacSign/ZodiacSignScreen';
import { useVibration } from '@/shared/hooks/useVibration';
import { AGE } from '@/shared/types/globalTypes';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  const { vibrate } = useVibration();
  const { initUser } = useAuth();
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0])); // 0-я страница видна сразу

  const markVisited = useCallback((i: number) => {
    setVisited(prev => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  const goNextPage = () => {
    pagerViewRef.current?.setPage(currentPage + 1);
    setCurrentPage(currentPage + 1);
    const next = currentPage + 1;
    markVisited(next);
    vibrate();
  };

  const goPrevPage = () => {
    pagerViewRef.current?.setPage(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  const router = useRouter();

  const redirectToHomeScreen = async () => {
    await initUser({
      displayName: name,
    });
    // Alert.alert('Успех', 'Вы успешно прошли регистрацию');
    router.replace('/screens/homeScreen');
  };

  const { name, zodiacSign, age, gender, updateGender, updateName, updateZodiacSign, updateAge, updateGoals, goals } =
    useUserTags();

  const onPressUpdateGender = (gender: IGenderItem) => {
    updateGender(gender);
    goNextPage();
  };
  const preferNotToSayGender = () => {
    updateGender(undefined);
    goNextPage();
  };
  const onPressUpdateAge = (age: AGE) => {
    updateAge(age);
    goNextPage();
  };
  const preferNotToSayAge = () => {
    updateAge(undefined);
    goNextPage();
  };

  const onPressUpdateZodiacSign = (zodiacSign: IZodiacItem) => {
    updateZodiacSign(zodiacSign);
    goNextPage();
  };

  const renderPage = (i: number) => {
    switch (i) {
      case 0:
        return <WelcomeScreen onPressButton={goNextPage} />;
      case 1:
        return <ShortExplanationScreen onPressButton={goNextPage} />;
      case 2:
        return (
          <GenderChooseScreen
            genderPickerComponent={<GenderPicker value={gender} onChange={onPressUpdateGender} />}
            onPressButton={preferNotToSayGender}
          />
        );
      case 3:
        return <EnterNameScreen onPressButton={goNextPage} goPrevPage={goPrevPage} onChange={updateName} />;
      case 4:
        return (
          <AgeScreen
            agePickerComponent={<AgePicker onChange={onPressUpdateAge} value={age} />}
            onPressButton={preferNotToSayAge}
            goPrevPage={goPrevPage}
          />
        );
      case 5:
        return <HelpUsScreen onPressContinue={goNextPage} />;
      case 6:
        return (
          <ZodiacSignScreen
            zodiacSignComponent={<ZodiacSignPicker onChange={onPressUpdateZodiacSign} value={zodiacSign} />}
            onPressButton={goNextPage}
            goPrevPage={goPrevPage}
          />
        );
      case 7:
        return (
          <GoalsScreen
            goalsPickerComponent={<GoalsPicker onChange={updateGoals} value={goals} />}
            onPressButton={goNextPage}
            goPrevPage={goPrevPage}
          />
        );
      case 8:
        return <ProgrevScreen onFinishAnimation={redirectToHomeScreen} />;
      default:
    }
  };

  // there are pages indexed 0..11 (12 pages total), keep this in sync with renderPage cases
  const PAGES_COUNT = 9;

  return (
    <PageWrapper>
      <PagerView
        ref={pagerViewRef}
        scrollEnabled={false}
        style={{
          flex: 1,
        }}
        initialPage={0}
      >
        {Array.from({ length: PAGES_COUNT }).map((_, i) => (
          <View key={`page-${i}`} style={{ flex: 1 }}>
            {visited.has(i) ? renderPage(i) : null}
          </View>
        ))}
      </PagerView>
    </PageWrapper>
  );
}
