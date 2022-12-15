import Image from 'next/image';
import styles from './HeroItem.module.css';

export interface HeroItemProps {
  id: string;
  profileImage: string;
  name: string;
  code: string;
  /**
   * 현재 선택된 히어로인지 나타내는 값입니다
   */
  isSelected: boolean;
  /**
   * 이미 임무를 수행중인지 나타내는 값입니다
   */
  isReceiver: boolean;
}

export const HeroItem = ({
  id,
  profileImage,
  name,
  code,
  isSelected,
  isReceiver,
}: HeroItemProps) => {
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
        <span className={styles.heroName}>{`${code}`}</span>
      </button>
    </li>
  );
};
