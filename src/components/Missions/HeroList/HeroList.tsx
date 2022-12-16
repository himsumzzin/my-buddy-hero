/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { heroesState } from '@/states/heroes';

import { Input, Button, Title } from '@/components/common';
import { HeroItem } from './HeroItem';
import { ReactComponent as ArrowLeftIcon } from '@svgs/arrow-left.svg';

import styles from './HeroList.module.css';
import { Slide } from '@/components/common';

export interface HeroListProps {
  /**
   * 임무를 수행중인 히어로들의 id를 담은 배열입니다.
   */
  receivers: string[];
  /**
   * 미션을 추가하거나 업데이트하는 함수입니다. 선택한 히어로와 히어로 코드가 일치할 때 호출합니다.
   */
  onSubmit: (heroInfo: IHero) => void;
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

export const HeroList = ({ receivers, onSubmit, onGoBack }: HeroListProps) => {
  const heroList = useRecoilValue(heroesState);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  console.log(heroList);

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
    const code = e.currentTarget.herocode.value;
    const matchedHero = heroList.find(
      (hero) => hero.id === selectedHeroId && hero.code === code
    );

    matchedHero ? onSubmit(matchedHero) : setIsValid(false);
  };

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={3}>히어로 선택</Title>
      </header>
      <div className={styles.heroesBox}>
        <ul className={styles.ul} onClick={selectHero}>
          {heroList.map(({ id, profileImage, code, name }) => {
            return (
              <HeroItem
                key={id}
                id={id}
                profileImage={profileImage}
                code={code}
                name={name}
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
          <span className={styles.errorMessage}>
            {selectedHeroId
              ? '히어로 코드를 확인해주세요!'
              : '히어로를 선택해주세요!'}
          </span>
        ) : null}
        <Button size="sm">완료</Button>
      </form>
      <Button size="xs" className={styles.goBackButton} onClick={onGoBack}>
        {/* <ArrowLeftIcon width="32px" height="32px" viewBox="0 0 24 24" /> */}
      </Button>
    </Slide>
  );
};
