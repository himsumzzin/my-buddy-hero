import { Link, Button } from '@/components/common';
import { signOut } from 'next-auth/react';
import React from 'react';
import styles from './Nav.module.css';

export type NavProps = {
  /**
   * 임무 등록 버튼의 onClick 이벤트를 줄 수 있습니다.
   */
  onButtonClick?: any;
  /**
   * 버튼의 이름을 설정합니다.
   */
  buttonName: string;
  /**
   * 현재 위치를 문자열로 표시한다.
   */
  currentPage: string;
};

export const Nav = ({ onButtonClick, currentPage, buttonName }: NavProps) => {
  function logoutHandler() {
    signOut({ redirect: false });
  }
  return (
    <div className={styles.linkContainer}>
      <Link
        href={'/missions'}
        size={'lg'}
        selected={currentPage === '/missions'}
      >
        임무목록
      </Link>
      <Link
        href={'/herolist'}
        size={'lg'}
        selected={currentPage === '/herolist'}
      >
        히어로 명단
      </Link>
      <Button
        size="md"
        disabled={false}
        className={styles.buttonBox}
        onClick={onButtonClick}
      >
        {buttonName}
      </Button>
      <button className={styles.logout} onClick={logoutHandler}>
        로그아웃
      </button>
    </div>
  );
};
