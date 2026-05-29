import { ProtectionTiming } from './protection.types';

export const TimingsBeforeBlock: number[] = [1, 5, 10, 30, 60];

export const generateMockTimings = (timings: number[], word: string): ProtectionTiming[] => {
  const res: ProtectionTiming[] = timings.map(item => ({
    label: `${item} ${word}`,
    value: item,
  }));

  return res;
};
