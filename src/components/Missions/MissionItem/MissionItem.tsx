import styles from './MissionItem.module.css';

export interface IMissionItemProps {
  mission: IMission;
  onClick: (mission: IMission) => void;
}

export const MissionItem = ({ mission, onClick }: IMissionItemProps) => {
  const { id, description, maxReceiver, receivers } = mission;

  const handleClick = () => {
    onClick(mission);
  };
  // return <button>button</button>;
  return (
    <li className={`${styles.li}`} data-mission-id={id}>
      <button className={styles.heroButton} onClick={handleClick}>
        <p className={styles.description}>{description}</p>
        <div>
          <p className={styles.maxReceivers}>
            {maxReceiver - receivers.length}명의 도움이 필요해요!
          </p>
          <p className={styles.checkMission}>
            <span>임무 확인</span>
          </p>
        </div>
      </button>
    </li>
  );
};
