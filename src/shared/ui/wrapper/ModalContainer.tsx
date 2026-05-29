import { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import Grid from '../grid/Grid';

interface ModalContainerProps extends PropsWithChildren {
  onClose?: () => void;
}

export default function ModalContainer({ children, onClose }: ModalContainerProps) {
  return (
    <Pressable onPress={onClose} style={{ flex: 1 }}>
      <Grid flex={1} align="center" justfity="center" color="rgba(0, 0, 0, 0.75)">
        {children}
      </Grid>
    </Pressable>
  );
}
