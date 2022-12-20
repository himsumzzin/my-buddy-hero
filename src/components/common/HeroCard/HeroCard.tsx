import styles from './HeroCard.module.css';
import Image from 'next/image';

export interface HeroCardProps {
  hero: Hero;
  className?: string;
}

export const HeroCard = ({ hero, className }: HeroCardProps) => {
  const { name, title, description, profileImage, completeNumber } = hero;
  return (
    <>
      <div className={`${styles.heroCardContainer} ${className ?? ''}`}>
        <p className={`${styles.completeNumber}`}>
          임무완료 : {completeNumber}회
        </p>
        <Image
          className={`${styles.cartoonize}`}
          src={profileImage}
          alt={`${name} 히어로`}
          width={190}
          height={350}
        ></Image>
        <p className={`${styles.title}`}>{title}</p>
        <p className={`${styles.name}`}>{name}</p>
        <p className={`${styles.description}`}>{description}</p>
      </div>
    </>
  );
};

HeroCard.defaultProps = {
  completeNumber: 0,
  heroInfo: {
    groupId: '1',
    name: '김현진',
    title: '휴지맨',
    description: '저는 휴지를 주워서 학교가 깨끗해지는걸 좋아해요!',
    code: '1234',
    profileImage: '/images/hero2.png',
  },
};
