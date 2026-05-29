import { ActivityIndicator } from 'react-native';
import LoadingAnimation from '@/assets/animations/loading.json';
import LottieView from 'lottie-react-native';

export default function LoaderIndicator() {
  return <LottieView autoPlay style={{ width: 50, height: 50 }} source={LoadingAnimation} />;

  return <ActivityIndicator size="large" color="#fff" />;
}
