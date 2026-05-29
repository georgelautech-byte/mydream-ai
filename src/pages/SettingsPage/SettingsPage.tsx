import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollView } from 'react-native';
import AppSettingsBlock from './ui/blocks/AppSettingsBlock';
import LegalBlock from './ui/blocks/LegalBlock';
import LogOutBlock from './ui/blocks/LogOutBlock';
import FeedbackBlock from './ui/blocks/FeedbackBlock';
import RateBlock from './ui/blocks/RateBlock';
import { SubBlock } from '@/module/SubBlock';

export default function SettingsPage() {
  const headerHeight = useHeaderHeight();
  return (
    <PageWrapper disableGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeWrapper style={{ paddingTop: 15 + headerHeight, flex: 1 }}>
          <Grid space="lg">
            <SubBlock />
            <AppSettingsBlock />
            <RateBlock />
            <FeedbackBlock />
            <LegalBlock />
            <LogOutBlock />
          </Grid>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
