import styles from './Button.module.css';

export type ButtonProps = {
  /**
   *
   */
  size: 'sm' | 'md' | 'lg';
  restProps: unknown[];
};

export const Button = ({ size, ...restProps }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...restProps}>
      버튼
    </button>
  );
};
