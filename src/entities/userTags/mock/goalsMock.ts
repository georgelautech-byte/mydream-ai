import { IGoalItem } from '../types/types';
import PatternsImage from '@/assets/goals_images/patterns_flat_image__uaf4umlpxbluhmzqg3dj_0.png';
import MySelfBetterImage from '@/assets/goals_images/consciousness_light_bulb_understanding_of_the_world_ifjbljcup0cipit9zxbg_3.png';
import LucidDreamsImage from '@/assets/goals_images/man_holding_hourglass_manipulation_of_space_and_time_42j3i8bifyjgxv2u4cqy_0.png';

export const goalsMock: IGoalItem[] = [
  {
    id: 1,
    name: 'Find the patterns',
    image: PatternsImage,
  },
  {
    id: 2,
    name: 'Get to know myself better',
    image: MySelfBetterImage,
  },
  {
    id: 3,
    name: 'Have lucid dreams',
    image: LucidDreamsImage,
  },
  {
    id: 4,
    name: 'Jornaling',
  },
  {
    id: 5,
    name: 'Understanding dreams',
  },
];
