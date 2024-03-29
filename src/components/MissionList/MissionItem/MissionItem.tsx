import Image from 'next/image';
import styles from './MissionItem.module.css';
import Link from 'next/link';
import { useGetHero } from '../../../apis/heroList';
import { BeatLoader } from 'react-spinners';

export interface MissionItemProps {
  mission: Mission;
}

const StatusMessage = ({ mission }: { mission: Mission }) => {
  const { isComplete, maxReceiver, receivers } = mission;
  const isFull = maxReceiver === receivers.length;

  if (isComplete) {
    return <p className={`${styles.status} ${styles.complete}`}>임무 완료!</p>;
  }

  if (isFull) {
    return (
      <p className={`${styles.status} ${styles.full}`}>임무가 진행중이에요</p>
    );
  }

  return (
    <p className={styles.status}>
      <span>{maxReceiver - receivers.length}</span>명의 도움이 필요해요
    </p>
  );
};

export const MissionItem = ({ mission }: MissionItemProps) => {
  const groupId = '1';
  const {
    data: author,
    isLoading,
    isError,
  } = useGetHero(groupId, mission.authorId);

  if (isLoading) {
    return <BeatLoader />;
  }
  if (isError) {
    return null;
  }

  const { id, title, maxReceiver, receivers, isComplete } = mission;
  const { name, title: authorTitle, profileImage } = author;
  const isFull = maxReceiver === receivers.length;

  return (
    <li
      className={`${styles.container} ${isComplete ? styles.disabled : ''} ${
        isFull ? styles.full : ''
      }`}
      data-mission-id={id}
    >
      <Link href={`/missionlist/${id}`} className={styles.heroButton}>
        <StatusMessage mission={mission} />
        <p className={styles.title}>{title}</p>
        <div className={styles.authorBox}>
          <Image
            className={`${styles.profileImage}`}
            src={profileImage}
            alt={`${name} 히어로`}
            width={65}
            height={65}
          />
          <div className={styles.authorInfo}>
            <span>{authorTitle}</span>
            <span>히어로의 임무</span>
          </div>
        </div>
      </Link>
    </li>
  );
};
