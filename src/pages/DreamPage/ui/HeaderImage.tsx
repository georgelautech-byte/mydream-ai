import AppBookImage from '@/assets/icons/app_icon_book.png';
import { Image } from 'expo-image';

export default function HeaderImage() {
  return <Image source={AppBookImage} style={{ height: 140, width: 140 }} />;
}
