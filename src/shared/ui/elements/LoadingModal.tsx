import { Modal } from 'react-native';
import Paper from '../layout/Paper';
import ModalContainer from '../wrapper/ModalContainer';
import LoaderIndicator from './LoaderIndicator';

interface LoadingModalProps {
  open: boolean;
}

export default function LoadingModal({ open }: LoadingModalProps) {
  return (
    <Modal visible={open} transparent animationType="fade">
      <ModalContainer>
        <Paper>
          <LoaderIndicator />
        </Paper>
      </ModalContainer>
    </Modal>
  );
}
