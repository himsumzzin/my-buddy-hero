import { Dialog } from '../Default';
import styles from './ErrorDialog.module.css';

export interface ErrorDialogProps {
  title?: string;
  description?: string;
  onClose: () => void;
}

export const ErrorDialog = ({
  title,
  description,
  onClose,
}: ErrorDialogProps) => {
  return (
    <Dialog modal={true} lv={3}>
      <Dialog.Body className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </Dialog.Body>
      <Dialog.Footer onClose={onClose} />
    </Dialog>
  );
};

ErrorDialog.defaultProps = {
  title: '인터넷 연결 실패!',
  description: '와이파이가 잘 연결되었는지 확인해주세요',
};
