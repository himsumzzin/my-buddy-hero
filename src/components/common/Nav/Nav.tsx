import { Link, Button } from '@/components/common';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import styles from './Nav.module.css';
import { useRouter } from 'next/router';
import { useHeroes, useMissions } from '@/hooks';

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
  const router = useRouter();
  const { status } = useSession(); // 세션 유무 파악 가능
  const { resetHeroList } = useHeroes();
  const { resetMissionList } = useMissions();

  async function logoutHandler() {
    await signOut({ redirect: false });
    if (status === 'authenticated') {
      router.replace('/login');
      resetHeroList();
      resetMissionList();
    }
  }

  return (
    <div className={styles.linkContainer}>
      <Link
        href={'/missionlist'}
        size={'lg'}
        selected={currentPage === '/missionlist'}
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
      <Button
        size="md"
        disabled={false}
        className={styles.logout}
        onClick={logoutHandler}
      >
        로그아웃
      </Button>
    </div>
  );
};
