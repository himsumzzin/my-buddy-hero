import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Link, Button, HeroCard } from '@/components/common';
import { useHeroes, useMissions } from '@/hooks';
import styles from './herolist.module.css';

export default function Herolist() {
  const router = useRouter();

  const { heroList, initHeroeList } = useHeroes();
  const { initMissionList } = useMissions();

  useEffect(() => {
    initHeroeList();
    initMissionList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Link href="/missions" size={'lg'}>
          임무목록
        </Link>
        <Link href={'/herolist'} size={'lg'} selected>
          히어로 명단
        </Link>
        <Button
          size="md"
          disabled={false}
          className={styles.buttonBox}
          onClick={() => {
            router.replace('/register');
          }}
        >
          히어로 추가
        </Button>
      </div>
      <ul className={styles.listContainer}>
        {heroList.map((heroInfo, index) => (
          <li key={index}>
            <HeroCard heroInfo={heroInfo}></HeroCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
