import Image from 'next/image';
import styles from './HeroItem.module.css';

export interface HeroItemProps {
  hero: Hero;
  /**
   * 크기를 결정하는 값입니다
   */
  size: 'sm' | 'lg';
  className?: string;
}

export const HeroItem = ({ hero, size, className }: HeroItemProps) => {
  const { id, profileImage, title, name } = hero;
  return (
    <div
      className={`${styles.container} ${styles[size]} ${className ?? ''}`}
      data-hero-id={id}
    >
      <Image
        className={`${styles.profileImage}`}
        src={profileImage}
        alt={`${name} 히어로`}
        width={size === 'sm' ? 160 : 300}
        height={size === 'sm' ? 160 : 300}
      />
      <span className={`${styles.heroName} ${styles[size]}`}>{`${title}`}</span>
    </div>
  );
};
