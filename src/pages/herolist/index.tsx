import styles from './herolist.module.css';
import { Link, Button, HeroCard } from '@/components/common';
import { heroInfos } from './mockup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/states';
import { heroesState } from '@/states/heroes';

export default function Herolist() {
  const router = useRouter();
  const [heroes, setHeroes] = useRecoilState<IHeroList>(heroesState);
  const user = useRecoilValue(userState);
  const groupId = user.groupId as string;

  useEffect(() => {
    const getHeroesOnServer = async () => {
      const { data } = await axios.get(`api/hero/${groupId}`);

      setHeroes(data.body.data);
    };
    getHeroesOnServer();
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
        {heroes.map((heroInfo, index) => (
          <li key={index}>
            <HeroCard heroInfo={heroInfo}></HeroCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
