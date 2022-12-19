import { HeroCard, Link } from '@/components/common';
import styles from './Complete.module.css';

export const Complete = (props: { heroInfo: any; goBack: () => void }) => {
  const { heroInfo, goBack } = props;

  return (
    <div className={`${styles.container}`}>
      <HeroCard
        missionCount="0"
        heroInfo={heroInfo}
        className={styles.cardContainer}
      ></HeroCard>
      <p className={styles.subTitle}>
        {heroInfo.name}히어로가 된 걸 축하해! 멋진 임수를 완수하길 바랄게!
      </p>
      <div className={styles.linkContainer}>
        <Link href="/missions" size="sm">
          임무 수행하러 가기
        </Link>
        <Link href="/register" onClick={goBack} size="sm">
          추가 히어로 등록
        </Link>
      </div>
    </div>
  );
};
