import NextLink from 'next/link';
import React from 'react';
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
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => any;
  children: React.ReactNode;
  restProps?: unknown[];
};

export const Link = ({
  href,
  size,
  selected,
  children,
  onClick,
  ...restProps
}: LinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick && onClick(e);
  };
  return (
    <NextLink
      href={href}
      className={`
      ${styles.Link}
      ${styles[size]}
      ${selected ? styles.selected : ''}`}
      onClick={onClick ? handleClick : undefined}
      {...restProps}
    >
      {children}
    </NextLink>
  );
};

Link.defaultProps = {
  selected: false,
};
