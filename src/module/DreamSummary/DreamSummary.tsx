import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Button from '@/shared/ui/buttons/Button';
import CardPaper from '@/shared/ui/elements/CardPaper';
import Grid from '@/shared/ui/grid/Grid';
import { normalizedSize } from '@/shared/utils/size';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

interface DreamSummaryProps {
  dream: GetDreamDto;
  analysis: SleepDataResponse;
}

const ITEM_SIZE = normalizedSize(266);

export default function DreamSummary({ analysis, dream }: DreamSummaryProps) {
  const colors = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (ITEM_SIZE + normalizedSize(HORIZONTAL_PADDINGS)));
    setActiveIndex(index);
  };

  return (
    <Grid>
      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={ITEM_SIZE + normalizedSize(HORIZONTAL_PADDINGS)}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: normalizedSize(HORIZONTAL_PADDINGS),
          paddingBottom: normalizedSize(25),
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Grid flex={1} space="md" row>
          <Grid space="lg">
            <CardPaper
              width={ITEM_SIZE}
              title={'Detail'}
              date={new Date(dream.createdAt).toDateString()}
              text={dream.inputText}
            />
            <Button leftIcon={<AntDesign name="arrowdown" size={24} color={colors.text.white} />}>
              Finish the dream
            </Button>
          </Grid>
          <Grid>
            <CardPaper width={ITEM_SIZE} title={'Summary'} text={analysis.summary} />
          </Grid>
        </Grid>
      </ScrollView>
      <Grid space="sm" row justfity="center" style={{ marginTop: 10 }}>
        {[0, 1].map((_, index) => (
          <Animated.View
            layout={Layout.springify()}
            key={index}
            style={{
              width: activeIndex === index ? 25 : 9,
              height: 9,
              borderRadius: 50,
              backgroundColor: activeIndex === index ? colors.text.primary : colors.background.secondary,
            }}
          />
        ))}
      </Grid>
    </Grid>
  );
}
