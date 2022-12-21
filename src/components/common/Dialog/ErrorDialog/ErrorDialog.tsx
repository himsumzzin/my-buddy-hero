import { Dialog } from '../Default';
import styles from './ErrorDialog.module.css';

export interface ErrorDialogProps {
  onClose: () => void;
}

export const ErrorDialog = ({ onClose }: ErrorDialogProps) => {
  return (
    <Dialog modal={true} lv={3}>
      <Dialog.Body className={styles.body}>
        <p className={styles.title}>인터넷 연결 실패!</p>
        <p className={styles.description}>
          와이파이가 잘 연결되었는지 확인해주세요
        </p>
      </Dialog.Body>
      <Dialog.Footer onClose={onClose} />
    </Dialog>
  );
};
