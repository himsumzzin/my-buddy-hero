import { Button, Title, Slide } from '@/components/common';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import styles from './MissionInfo.module.css';

export interface MissionInfoProps {
  /**
   * mission 상태 중 렌더링에 필요한 title, maxReceiver, description값만 사용하는 객체입니다.
   */
  mission: Mission;
  /**
   * 사용자의 입력에 따라 미션 선택 | 미션 완료 중 하나의 값을 MissionCard 컴포넌트에 전달합니다.
   */
  onSelect: (status: MissionStatus) => void;
}

export const MissionInfo = ({ mission, onSelect }: MissionInfoProps) => {
  const { title, description, maxReceiver, receivers } = mission;
  const isFull = receivers.length >= maxReceiver;

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={3}>임무 확인</Title>
      </header>
      <div className={styles.textBox}>
        <p className={styles.missionTitle}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.maxReceiver}>
          {maxReceiver - receivers.length}명이 더 필요해요!
        </p>
      </div>
      <div className={styles.buttonBox}>
        <Button
          size="sm"
          className={styles.missionButton}
          disabled={isFull}
          onClick={() => onSelect('update')}
        >
          저 할래요!
        </Button>
        <Button
          size="sm"
          className={styles.missionButton}
          onClick={() => onSelect('complete')}
        >
          임무 끝!
        </Button>
      </div>
    </Slide>
  );
};
