import styles from './HeroCard.module.css';
import Image from 'next/image';

export type HeroCardProps = {
  missionCount: string;
  profileImage: string;
  code: string;
  name: string;
  description: string;
};

export const HeroCard = ({
  missionCount,
  profileImage,
  code,
  name,
  description,
}: HeroCardProps) => {
  return (
    <>
      <div className={`${styles.heroCardContainer}`}>
        <p className={`${styles.missionCount}`}>임무완료 : {missionCount}회</p>
        <Image
          className={`${styles.cartoonize}`}
          src={profileImage}
          alt={`${name} 히어로`}
          width={190}
          height={350}
        ></Image>
        <p className={`${styles.title}`}>{code}</p>
        <p className={`${styles.name}`}>{name}</p>
        <p className={`${styles.description}`}>{description}</p>
      </div>
    </>
  );
};

HeroCard.defaultProps = {
  missionCount: '0',
  profileImage: '/images/hero2.png',
  code: '휴지맨',
  name: '김현진 히어로',
  description: '저는 휴지를 주워서 학교가 깨끗해지는걸 좋아해요!',
};
