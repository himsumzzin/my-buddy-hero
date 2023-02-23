import { Title, Slide, Link } from '@/components/common';
import { HeroItem } from '../HeroItem';
import styles from './Result.module.css';
import { useGetHero } from '../../../apis/heroList';

interface MessageProps {
  missionStatus: MissionStatus;
  hero: Hero;
  author: Hero;
  className?: string;
}

const Message = ({ missionStatus, hero, author, className }: MessageProps) => {
  switch (missionStatus) {
    case 'create':
      return (
        <div className={className ?? ''}>
          <span>{hero.name} 히어로님</span>
          <span>임무가 성공적으로 등록되었습니다</span>
        </div>
      );
    case 'update':
      return (
        <div className={className ?? ''}>
          <span>
            {hero.name} 히어로님이 {author.name} 히어로님의 임무를
            선택하셨습니다
          </span>
          <span>임무를 성공적으로 수행해주길 바래요</span>
        </div>
      );
    case 'complete':
      return (
        <div className={className ?? ''}>
          <span>{hero.name} 히어로님</span>
          <span>임무가 종료되었습니다</span>
        </div>
      );
  }
};

export interface ResultProps {
  /**
   * 미션의 상태입니다. 'create' | 'update' : 'complete' 세 가지가 존재합니다
   */
  missionStatus: MissionStatus;
  /**
   * 임무를 등록 / 선택 / 종료한 히어로 정보를 나타냅니다
   */
  hero: Hero;
  /**
   * 임무 정보입니다. missionStatus가 update인 경우 사용됩니다.
   */
  mission: Mission;
}

export const Result = ({ missionStatus, hero, mission }: ResultProps) => {
  const groupId = '1';
  const { data: author } = useGetHero(groupId, mission.authorId);

  const title = {
    create: '임무 등록',
    update: '임무 선택',
    complete: '임무 종료',
  };

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={1} className={styles.title}>
          {title[missionStatus]}
        </Title>
      </header>
      <div className={styles.imageBox}>
        <HeroItem hero={hero} size="lg" />
        {missionStatus === 'update' && <HeroItem hero={author} size="lg" />}
      </div>
      <Message
        className={styles.message}
        missionStatus={missionStatus}
        hero={hero}
        author={author}
      />
      <Link href="/missionlist" size="lg" className={styles.closeLink}>
        확인
      </Link>
    </Slide>
  );
};
