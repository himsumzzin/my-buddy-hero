import NextLink from 'next/link';
import styles from './Link.module.css';

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  restProps?: unknown[];
};

export const Link = ({
  href,
  children,
  ...restProps
}: LinkProps): JSX.Element => {
  return (
    <NextLink href={href} className={styles.Link} {...restProps}>
      {children}
    </NextLink>
  );
};
