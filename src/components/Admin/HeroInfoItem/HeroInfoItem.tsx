import Image from 'next/image';
import styles from './HeroInfoItem.module.css';
import Link from 'next/link';

export interface HeroInfoItemProps {
  /**
   * 히어로 객체
   */
  hero: Hero;
  /**
   * 관리자 페이지 렌더링 시 sequence를 통해 히어로들의 순서를 나타냅니다.
   */
  order: number;
  /**
   * 스타일을 입히고 싶은 경우 클래스명을 추가해 스타일 적용할 수 있습니다.
   */
  className?: string;
}
export const HeroInfoItem = ({ hero, order, className }: HeroInfoItemProps) => {
  const { id, profileImage, name, title, code, completeNumber } = hero;
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <div className={`${styles.checkboxContainer}`}>
        <input type="checkbox" className={`${styles.checkbox}`}></input>
      </div>
      <Link href={`/admin/${id}`} className={`${styles.heroInfoItemContainer}`}>
        <p className={`${styles.flexItem} ${styles.order}`}>{`${order}`}</p>
        <div className={`${styles.profileImageContainer}`}>
          <Image
            className={`${styles.profileImage}`}
            src={profileImage}
            alt={`${name} 히어로`}
            width={58}
            height={58}
          />
        </div>
        <p className={`${styles.name} ${styles.flexItem}`}>{`${name}`}</p>
        <p className={`${styles.title} ${styles.flexItem}`}>{`${title}`}</p>
        <p className={`${styles.code} ${styles.flexItem}`}>{`${code}`}</p>
        <p
          className={`${styles.completeNumber} ${styles.flexItem}`}
        >{`${completeNumber}회`}</p>
      </Link>
    </div>
  );
};

HeroInfoItem.defaultProps = {
  completeNumber: 0,
  hero: {
    groupId: '1',
    name: '김현진',
    title: '휴지맨',
    description: '저는 휴지를 주워서 학교가 깨끗해지는걸 좋아해요!',
    code: '1234',
    profileImage: '/images/hero2.png',
  },
};
