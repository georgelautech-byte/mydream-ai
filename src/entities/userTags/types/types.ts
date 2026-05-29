import { GENDER, GOALS, ZODIAC_SIGN } from '@/shared/types/globalTypes';

export interface IZodiacItem {
  id: number;
  name: ZODIAC_SIGN;
  icon: string;
  color: string;
}

export interface IGoalItem {
  id: number;
  name: GOALS;
  image?: string;
}

export interface IGenderItem {
  id: number;
  name: GENDER;
  image: string;
}
