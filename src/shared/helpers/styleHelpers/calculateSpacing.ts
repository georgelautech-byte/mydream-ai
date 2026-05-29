export type TSpaceGrid = 'sm' | 'md' | 'lg';

export function calculateSpacing(space: TSpaceGrid) {
  if (space === 'sm') return 8;
  else if (space === 'md') return 16;
  else if (space === 'lg') return 28;

  return 0;
}
