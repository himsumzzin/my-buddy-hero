import Image from 'next/image';
import styles from './HeroItem.module.css';

export interface HeroItemProps {
  hero: Hero;
  /**
   * 현재 선택된 히어로인지 나타내는 값입니다
   */
  isSelected: boolean;
  /**
   * 이미 임무를 수행중인지 나타내는 값입니다
   */
  isReceiver: boolean;
}

export const HeroItem = ({ hero, isSelected, isReceiver }: HeroItemProps) => {
  const { id, profileImage, title, name } = hero;
  return (
    <li
      key={id}
      className={`${styles.li} ${isSelected ? styles.selected : ''} ${
        isReceiver ? styles.receiver : ''
      }`}
      data-hero-id={id}
    >
      <button className={styles.heroButton} disabled={isReceiver}>
        <Image
          className={`${styles.profileImage}`}
          src={profileImage}
          alt={`${name} 히어로`}
          width={190}
          height={350}
        />
        <span className={styles.heroName}>{`${title}`}</span>
      </button>
    </li>
  );
};
