import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { useAuth } from '../auth.repository';

export default function UserAvatar() {
  const { user } = useAuth();
  return (
    <Grid row space="sm" align="center">
      <Grid style={{ borderRadius: 100 }} width={30} height={30} color={'#2774CD'} align="center" justfity="center">
        <Typography weight="bold">{user?.displayName[0]}</Typography>
      </Grid>
      <Grid>
        <Typography>{user?.displayName}</Typography>
      </Grid>
    </Grid>
  );
}
