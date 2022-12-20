import { HeroCard, Link } from '@/components/common';
import styles from './Complete.module.css';

interface CompleteProps {
  hero: Hero;
  reset: () => void;
}

export const Complete = ({ hero, reset }: CompleteProps) => {
  return (
    <div className={`${styles.container}`}>
      <HeroCard hero={hero} className={styles.cardContainer}></HeroCard>
      <p className={styles.subTitle}>
        {hero.name}히어로가 된 걸 축하해! 멋진 임수를 완수하길 바랄게!
      </p>
      <div className={styles.linkContainer}>
        <Link href="/missions" size="sm">
          임무 수행하러 가기
        </Link>
        <Link href="/register" onClick={reset} size="sm">
          추가 히어로 등록
        </Link>
      </div>
    </div>
  );
};
