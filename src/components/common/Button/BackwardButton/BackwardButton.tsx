import { Button, ButtonProps } from '../Default';
import { ReactComponent as ArrowLeftIcon } from '@svgs/arrow-left.svg';
import styles from './BackwardButton.module.css';

export const BackwardButton = ({ className, ...restProps }: ButtonProps) => {
  return (
    <Button className={`${styles.button} ${className ?? ''}`} {...restProps}>
      <ArrowLeftIcon width="40px" height="32px" viewBox="0 0 24 24" />
    </Button>
  );
};
