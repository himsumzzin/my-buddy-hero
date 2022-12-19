import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Nav, HeroCard } from '@/components/common';
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
      <Nav
        buttonName="히어로 추가"
        onButtonClick={() => {
          router.replace('/register');
        }}
        currentPage={router?.asPath}
      />
      <ul className={styles.listContainer}>
        {heroList.map((hero) => (
          <li key={hero.id}>
            <HeroCard hero={hero}></HeroCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
