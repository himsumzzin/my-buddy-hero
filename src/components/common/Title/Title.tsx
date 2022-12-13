import styles from './Title.module.css';

export interface TitleProps {
  lv: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
  className?: string;
  children: React.ReactNode;
}

export const Title = ({ lv, className, children }: TitleProps) => {
  const ComponentName = `h${lv}`;

  return (
    <ComponentName className={`${styles.Title} ${className ?? ''}`}>
      {children}
    </ComponentName>
  );
};

Title.defaultProps = {
  lv: 2,
};
