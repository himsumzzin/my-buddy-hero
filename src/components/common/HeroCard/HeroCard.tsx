import styles from './HeroCard.module.css';
import Image from 'next/image';

interface HeroInfo {
  groupId: string;
  name: string;
  title: string;
  description: string;
  code: string;
  profileImage: string;
}

export type HeroCardProps = {
  missionCount?: string;
  profileImage?: string;
  code?: string;
  name?: string;
  description?: string;
  className?: string;
  heroInfo: HeroInfo;
};

export const HeroCard = ({
  missionCount,
  profileImage,
  code,
  name,
  description,
  className,
  heroInfo,
}: HeroCardProps) => {
  return (
    <>
      <div className={`${styles.heroCardContainer} ${className}`}>
        <p className={`${styles.missionCount}`}>임무완료 : {missionCount}회</p>
        <Image
          className={`${styles.cartoonize}`}
          src={heroInfo.profileImage}
          alt={`${heroInfo.name} 히어로`}
          width={190}
          height={350}
        ></Image>
        <p className={`${styles.title}`}>{heroInfo.title}</p>
        <p className={`${styles.name}`}>{heroInfo.name}</p>
        <p className={`${styles.description}`}>{heroInfo.description}</p>
      </div>
    </>
  );
};

// HeroCard.defaultProps = {
//   missionCount: '0',
//   profileImage: '/images/hero2.png',
//   code: '휴지맨',
//   name: '김현진 히어로',
//   description: '저는 휴지를 주워서 학교가 깨끗해지는걸 좋아해요!',
// };
