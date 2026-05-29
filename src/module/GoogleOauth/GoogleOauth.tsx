import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import { Image } from 'expo-image';

export default function GoogleOauth() {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  //   iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  //   androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  // });

  return (
    <Button
      leftIcon={
        <Grid color="#fff" padding={5} style={{ borderRadius: 50 }}>
          <Image
            source={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'
            }
            style={{ width: 30, height: 30 }}
          />
        </Grid>
      }
      // onPress={() => void promptAsync()}
    >
      Войти через гугл
    </Button>
  );
}
