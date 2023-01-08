import { Button } from '@/components/common';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import styles from './CloseButton.module.css';

export interface CloseButtonProps {
  type: string;
  className: string;
  onClose: () => void;
  [key: string]: unknown;
}

export const CloseButton = ({
  type,
  className,
  onClose,
  ...restprops
}: CloseButtonProps) => {
  return (
    <Button
      type={type}
      size="xs"
      className={`${styles.closeButton} ${className}`}
      onClick={onClose}
      {...restprops}
    >
      <CloseIcon width="32px" height="32px" viewBox="0 0 24 24" />
    </Button>
  );
};

CloseButton.defaultprops = {
  type: 'submit',
};
