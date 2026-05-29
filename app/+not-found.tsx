import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <PageWrapper flex={1}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      {/* <Grid style={styles.container}>
        <Typography variant="title-3">This screen doesn&apos;t exist.</Typography>
        <Link href="/screens/homeScreen" style={styles.link}>
          <Typography color="secondary">Go to home screen!</Typography>
        </Link>
      </Grid> */}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
