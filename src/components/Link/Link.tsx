import NextLink from 'next/link';
import styles from './Link.module.css';

export type LinkProps = {
  /**
   * 이동할 경로
   */
  href: string;
  /**
   * 버튼의 크기는 두 가지로 고정되어 있습니다
   */
  size: 'sm' | 'lg';
  selected: boolean;
  children: React.ReactNode;
  restProps?: unknown[];
};

export const Link = ({
  href,
  size,
  selected,
  children,
  ...restProps
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={`
      ${styles.Link}
      ${styles[size]}
      ${selected ? styles.selected : ''}`}
      {...restProps}
    >
      {children}
    </NextLink>
  );
};

Link.defaultProps = {
  selected: false,
};
