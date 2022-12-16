import styles from './herolist.module.css';
import { Link, Button, HeroCard } from '@/components/common';
import { heroInfos } from './mockup';
import { useRouter } from 'next/router';

export default function Herolist() {
  const router = useRouter();
  // const getHeroList = async () => {
  //   await axios.get('/api/hero/{groupId}');
  // };

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Link href={''} size={'lg'}>
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
        {heroInfos.map((heroInfo, index) => (
          <li key={index}>
            <HeroCard heroInfo={heroInfo}></HeroCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
