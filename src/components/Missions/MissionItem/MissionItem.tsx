import Image from 'next/image';
import styles from './MissionItem.module.css';
import ArrowLeftIcon from '@svgs/arrow-left.svg';

export interface IMissionItemProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
}

export const MissionItem = ({ mission, onClick }: IMissionItemProps) => {
  const { id, title, maxReceiver, receivers, isComplete } = mission;
  const isFull = maxReceiver === receivers.length;

  const handleClick = () => {
    onClick(mission);
  };
  // return <button>button</button>;
  return (
    <li
      className={`${styles.container} ${isComplete ? styles.disabled : ''} ${
        isFull ? styles.full : ''
      }`}
      data-mission-id={id}
    >
      <button
        className={styles.heroButton}
        disabled={isComplete}
        onClick={handleClick}
      >
        <p className={styles.title}>{title}</p>
        <div>
          <p className={styles.maxReceivers}>
            {maxReceiver - receivers.length}명의 도움이 필요해요!
          </p>
          <p className={styles.checkMission}>
            <span>임무 확인</span>
            <ArrowLeftIcon
              width={24}
              height={24}
              className={styles.arrowIcon}
              src="/svgs/arrow-right.svg"
              alt=""
              aria-hidden="true"
            />
          </p>
        </div>
      </button>
    </li>
  );
};
