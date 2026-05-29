import { useContinueDream, useGetDreamById } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';

import { GeneralFeedback } from '@/entities/feedback';
import { SharableSnapshot } from '@/module/SharableSnapshot';
import { HORIZONTAL_PADDINGS, PLACEMENTS } from '@/shared/config/constants/constants';
import { useLang } from '@/shared/hooks/useLangStore';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useTheme } from '@/shared/hooks/useTheme';
import { analytics, Events } from '@/shared/service/analytics.service';
import { animationEngine } from '@/shared/service/animation.service';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Button from '@/shared/ui/buttons/Button';
import CardPaper from '@/shared/ui/elements/CardPaper';
import HeaderPlaceholder from '@/shared/ui/elements/HeaderPlaceholder';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Superwall from '@superwall/react-native-superwall';
import { useLocalSearchParams } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import HeaderDream from './ui/HeaderDream';
import Interpretations from './ui/Interpretations';
import LoadingSkeleton from './ui/LoadingSkeleton';
import Participants from './ui/Participants';
import { localizeDate } from '@/entities/dream/helpers/groupDreamsByDate';

export default function DreamPage() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const { isActive } = useSubscription();
  const [analysis, setAnalysis] = useState<SleepDataResponse | undefined>(undefined);
  const { data, isLoading, isError, isFetching } = useGetDreamById(params.id);
  const { continueDreamFunction, isPending } = useContinueDream();
  const { lang } = useLang();

  const handleContinueDream = async () => {
    if (!isActive) {
      analytics.trackEvent(Events.press_complete_dream_inactive, {
        local: lang,
        dreamId: data?.id,
      });
      Superwall.shared.register({
        placement: PLACEMENTS.campaign_trigger,
      });

      return;
    }
    if (data) {
      analytics.trackEvent(Events.press_complete_dream_active, {
        local: lang,
        dreamId: data.id,
      });
      await continueDreamFunction(data.id);
    }
  };

  useLayoutEffect(() => {
    if (data) {
      const analysis = getDreamAnalysisResponse(data.analyzeText);
      setAnalysis(analysis);
    }
  }, [isLoading, isFetching, data]);

  const onPressLike = () => {
    analytics.trackEvent(Events.press_feedback, {
      local: lang,
      dreamId: data?.id,
      reaction: 1,
    });
  };

  const onPressDislike = () => {
    analytics.trackEvent(Events.press_feedback, {
      local: lang,
      dreamId: data?.id,
      reaction: 0,
    });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">Error loading dream information</Typography>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  if (!data) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">No dream information available</Typography>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  if (!analysis) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">No analysis available</Typography>
          <CardPaper
            title={t('dream-page.original-input')}
            text={data.inputText}
            date={new Date(data.createdAt).toLocaleDateString()}
          />
        </SafeWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <HeaderPlaceholder />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeWrapper style={{ paddingHorizontal: 0 }}>
          <Animated.View entering={animationEngine.fadeInUp(0)}>
            <Grid space="lg">
              <HeaderDream dream={data} />
              <Participants analysis={analysis} />
              <Grid width="100%" space="md" paddingHorizontal={HORIZONTAL_PADDINGS}>
                <Typography weight="extra-bold" variant="title-2">
                  {t('dream-page.general-info')}
                </Typography>
                <CardPaper
                  width="100%"
                  title={t('dream-page.original-input')}
                  date={localizeDate(new Date(data.createdAt), lang)}
                  text={data.inputText}
                />
                {data.continuation ? (
                  <Animated.View entering={animationEngine.fadeInUp(0)}>
                    <CardPaper title={t('dream-page.continuation-title')} text={data.continuation} />
                  </Animated.View>
                ) : (
                  <Button
                    onPress={handleContinueDream}
                    disabled={isFetching || isLoading || isPending}
                    leftIcon={
                      !isActive ? (
                        <FontAwesome name="lock" size={24} color={colors.text.white} />
                      ) : (
                        <AntDesign
                          name="arrowdown"
                          size={24}
                          color={isPending ? colors.text.primary : colors.text.white}
                        />
                      )
                    }
                  >
                    {isPending ? t('dream-page.loading-continuation') : t('dream-page.finish-dream')}
                  </Button>
                )}
              </Grid>

              <Interpretations analysis={analysis} isActive={isActive} />

              <Animated.View layout={LinearTransition}>
                <SharableSnapshot dream={data} analysis={analysis} />
              </Animated.View>
              <Grid marginVertical={60}>
                <GeneralFeedback
                  onPressLike={onPressLike}
                  onPressDislike={onPressDislike}
                  title={t('dream-page.feed-back-interpretations')}
                />
              </Grid>
            </Grid>
          </Animated.View>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
