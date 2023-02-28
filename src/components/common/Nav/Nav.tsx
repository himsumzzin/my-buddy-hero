import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { Link, Button } from '@/components/common';
import { HERO_KEYS, MISSION_KEYS } from '@/apis';
import styles from './Nav.module.css';

export type NavProps = {
  /**
   * 버튼의 이름을 설정합니다.
   */
  linkTo: string;
  /**
   * 현재 위치를 문자열로 표시한다.
   */
  currentPage: string;
};

export const Nav = ({ currentPage, linkTo }: NavProps) => {
  const router = useRouter();
  const { status } = useSession(); // 세션 유무 파악 가능
  const queryClient = useQueryClient();

  async function logoutHandler() {
    await signOut({ redirect: false });
    if (status === 'authenticated') {
      queryClient.removeQueries(MISSION_KEYS.list);
      queryClient.removeQueries(HERO_KEYS.list);

      router.replace('/login');
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
      <Link
        href={linkTo === 'mission' ? '/missionlist/newmission' : '/register'}
        size="lg"
        className={styles.link}
      >
        {linkTo === 'mission' ? '임무 등록' : '히어로 추가'}
      </Link>
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
