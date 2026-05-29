import { GoogleOauth } from '@/module/GoogleOauth';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

export default function RegistrationScreen() {
  return (
    <SafeWrapper>
      <Typography>Необходимо войти в приложение</Typography>
      <GoogleOauth />
    </SafeWrapper>
  );
}
