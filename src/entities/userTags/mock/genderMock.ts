import { IGenderItem } from './../types/types';
import MaleImage from '@/assets/icons/male_icon.png';

export const genderMock: IGenderItem[] = [
  {
    id: 1,
    name: 'male',
    image: MaleImage,
  },
  {
    id: 2,
    name: 'female',
    image: MaleImage,
  },
  {
    id: 3,
    name: 'non-binary',
    image: MaleImage,
  },
];

export const binaryGenderMock: IGenderItem[] = [
  {
    id: 1,
    name: 'male',
    image: MaleImage,
  },
  {
    id: 2,
    name: 'female',
    image: MaleImage,
  },
];
