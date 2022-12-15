import { Button, Title, Slide } from '@/components/common';
import Image from 'next/image';
import styles from './Result.module.css';

export interface ResultProps {
  /**
   * 미션의 상태입니다. 'create' | 'update' : 'complete' 세 가지가 존재합니다
   */
  missionStatus: MissionStatus;
  /**
   * 히어로 정볼를 나타냅니ㅏㄷ
   */
  heroInfo: Hero;
  /**
   * MissionCard 컴포넌트를 언마운트하는 로직을 담은 함수입니다.
   * MissionCard를 감싸고 있는 Dialog 컴포넌트를 닫는 함수를 사용할 예정입니다.
   */
  onClose: () => void;
}

export const Result = ({ missionStatus, heroInfo, onClose }: ResultProps) => {
  const { profileImage, code, name } = heroInfo;
  const message = {
    create: '등록',
    update: '수락',
    complete: '완료',
  };
  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={3} className="srOnly">
          {`임무 ${message[missionStatus]}`}
        </Title>
      </header>
      <div className={styles.imageBox}>
        <Image
          className={`${styles.image}`}
          src={profileImage}
          alt={`${name} 히어로`}
          width={190}
          height={320}
        />
      </div>
      <p className={`${styles.message} ${styles.heroName}`}>
        {code} {name}님
      </p>
      <p className={styles.message}>
        임무가 {message[missionStatus]}되었습니다!
      </p>
      <Button className={styles.closeButton} size="sm" onClick={onClose}>
        확인
      </Button>
    </Slide>
  );
};
