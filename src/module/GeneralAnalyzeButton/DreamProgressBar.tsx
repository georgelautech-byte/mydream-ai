import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';

interface DreamProgressBarProps {
  current: number;
  total: number;
}

export default function DreamProgressBar({ current, total }: DreamProgressBarProps) {
  const colors = useTheme();
  // Guard against invalid totals
  const safeTotal = Math.max(1, total || 0);
  const clampedCurrent = Math.max(0, Math.min(current, safeTotal));
  const wholeSegments = Math.floor(clampedCurrent);
  const partial = clampedCurrent - wholeSegments; // 0..1
  return (
    <Grid space="sm">
      <Grid row gap={8} align="center" height={10} flex={1}>
        {Array.from({ length: safeTotal }).map((_, i) => {
          // Determine fill for this segment
          let fill = 0;
          if (i < wholeSegments)
            fill = 1; // full
          else if (i === wholeSegments) fill = partial; // partial (0..1)

          return (
            <Grid key={i} flex={1} height="100%" style={{ borderRadius: 40, overflow: 'hidden' }} color={'#ffffff20'}>
              {fill > 0 && (
                <Grid
                  width={`${fill * 100}%`}
                  height="100%"
                  color={colors.text.primary}
                  style={{ borderRadius: 40, position: 'absolute', left: 0, top: 0 }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      <Typography color="secondary" variant="footnote">{`${current} / ${total}`}</Typography>
    </Grid>
  );
}
