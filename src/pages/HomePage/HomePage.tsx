import { useAuth } from '@/entities/auth/auth.repository';
import { useGetDreams } from '@/entities/dream/dream.repository';
import { DreamsList } from '@/module/DreamsList';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import { animationEngine } from '@/shared/service/animation.service';
import HeaderPlaceholder from '@/shared/ui/elements/HeaderPlaceholder';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Superwall from '@superwall/react-native-superwall';
import { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import ListHeader from './ListHeader';

export default function HomePage() {
  const { initUser } = useAuth();
  const { data, isLoading } = useGetDreams();

  useEffect(() => {
    void initUser();

    // if (!__DEV__) {
    // setTimeout(() => {
    //   Superwall.shared.register({
    //     placement: PLACEMENTS.campaign_trigger,
    //   });
    // }, 10 * 1000);
    // }
  }, []);

  useEffect(() => {
    if (data?.pages[0].length !== 0 && !isLoading) {
      Superwall.shared.register({
        placement: PLACEMENTS.campaign_trigger,
      });
    }
  }, [isLoading]);

  return (
    <PageWrapper background="stars">
      <Animated.View entering={animationEngine.fadeInUp(1)}>
        <HeaderPlaceholder />

        <Grid space="lg">
          <DreamsList headerComponent={ListHeader} />
        </Grid>
      </Animated.View>
    </PageWrapper>
  );
}
