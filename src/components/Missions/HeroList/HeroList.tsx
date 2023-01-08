/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { heroesState } from '@/states/heroes';

import { Input, Button, Title } from '@/components/common';
import { HeroItem } from './HeroItem';
import ArrowLeftIcon from '@svgs/arrow-left.svg';

import styles from './HeroList.module.css';
import { Slide } from '@/components/common';

export interface HeroListProps {
  /**
   * 현재 선택된 임무에 관한 정보입니다
   */
  mission: Mission;
  /**
   * 미션의 상태입니다. 'create' | 'update' : 'complete' 세 가지가 존재합니다
   */
  missionStatus: MissionStatus;
  /**
   * 미션을 추가하거나 업데이트하는 함수입니다. 선택한 히어로와 히어로 코드가 일치할 때 호출합니다.
   */
  onSubmit: (heroInfo: Hero) => void;
  /**
   * missionStatus에 따라 missionForm 또는 missionInfo로 돌아가는 버튼입니다.
   */
  onGoBack: () => void;
}

interface CustomElements extends HTMLFormControlsCollection {
  herocode: HTMLInputElement[];
}

export interface HeroListForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export const HeroList = ({
  mission,
  missionStatus,
  onSubmit,
  onGoBack,
}: HeroListProps) => {
  const heroList = useRecoilValue(heroesState);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  const { receivers, authorId } = mission;

  const getErrorMessage = () => {
    if (!selectedHeroId) {
      return '히어로를 선택해주세요!';
    }
    switch (missionStatus) {
      case 'create':
        return '히어로 코드가 올바르지 않습니다. 다시 입력해주세요';
      case 'update':
        return '임무를 수락할 수 없는 히어로입니다.';
      case 'complete':
        return '임무를 종료할 수 없는 히어로입니다.';
    }
  };

  const selectHero = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      const heroId = e.target.closest('li')?.dataset?.heroId;
      if (!heroId || receivers.includes(heroId)) return;

      setIsValid(true);
      setSelectedHeroId(heroId);
    },
    [receivers]
  );

  const handleSubmit = (e: React.FormEvent<HeroListForm>) => {
    e.preventDefault();

    if (!selectedHeroId) {
      setIsValid(false);
      return;
    }

    const submittedCode = e.currentTarget.herocode.value;
    const matchedHero = heroList.find(
      (hero) => hero.id === selectedHeroId && hero.code === submittedCode
    );

    switch (missionStatus) {
      case 'create':
        matchedHero ? onSubmit(matchedHero) : setIsValid(false);
        break;
      case 'update':
        matchedHero && matchedHero.id !== authorId
          ? onSubmit(matchedHero)
          : setIsValid(false);
        break;
      case 'complete':
        matchedHero && matchedHero.id === authorId
          ? onSubmit(matchedHero)
          : setIsValid(false);
        break;
    }
  };

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={3}>당신은 누구인가요?</Title>
      </header>
      <div className={styles.heroesBox}>
        <ul className={styles.ul} onClick={selectHero}>
          {heroList.map((hero) => {
            const { id } = hero;
            return (
              <HeroItem
                key={id}
                hero={hero}
                isReceiver={receivers.includes(id)}
                isSelected={id === selectedHeroId}
              />
            );
          })}
        </ul>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="herocode"
          size="sm"
          initialValue=""
          className={styles.heroCode}
          labelText="히어로 코드"
          placeholder="히어로 코드:"
        />
        {!isValid ? (
          <span className={styles.errorMessage}>{getErrorMessage()}</span>
        ) : null}
        <Button size="sm">완료</Button>
      </form>
      <Button size="xs" className={styles.goBackButton} onClick={onGoBack}>
        <ArrowLeftIcon width="32px" height="32px" viewBox="0 0 24 24" />
      </Button>
    </Slide>
  );
};
