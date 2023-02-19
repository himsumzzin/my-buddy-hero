/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRecoilValue } from 'recoil';
import { heroesState } from '@/states/heroList';
import {
  Form,
  Input,
  ErrorMessage,
  Title,
  Slide,
  BackwardButton,
  Button,
} from '@/components/common';
import { HeroItem } from '../HeroItem';
import styles from './HeroList.module.css';
import { useForm } from '@/hooks';

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
  onHeroSelect: (hero: Hero) => void;
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
  onHeroSelect,
  onGoBack,
}: HeroListProps) => {
  const heroList = useRecoilValue(heroesState);
  const { errors, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: { id: '', code: '' },
    validate: (values) => {
      const { id, code } = values;
      const errors = {
        submit: '',
      };

      if (!/^\d{4}$/.test(code)) {
        errors.submit = '히어로 코드는 4자리 숫자를 입력해주세요';
        return errors;
      }

      if (!id) {
        errors.submit = '히어로를 선택해주세요';
        return errors;
      }

      const matchedHero = heroList.find(
        (hero) => hero.id === id && hero.code === code
      );
      if (!matchedHero) {
        errors.submit = '히어로 코드가 올바르지 않습니다. 다시 입력해주세요';
        return errors;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { id, code } = values;
      const matchedHero = heroList.find(
        (hero) => hero.id === id && hero.code === code
      ) as Hero;

      onHeroSelect(matchedHero);
    },
  });
  const { onChange: onRadioInputChange, onBlur: onRadioInputBlur } =
    getFieldProps('id');

  const { receivers, authorId } = mission;
  const filteredHeroList = heroList.filter((hero) => {
    switch (missionStatus) {
      case 'update':
        return hero.id !== authorId && !receivers.includes(hero.id);
      case 'complete':
        return hero.id === authorId;
      default:
        return true;
    }
  });

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={1} className={styles.title}>
          나의 히어로 카드 선택
        </Title>
      </header>
      <Form description={'임무 등록'} handleSubmit={handleSubmit}>
        <div className={styles.heroesBox}>
          <ul className={styles.ul}>
            {filteredHeroList.map((hero) => {
              const { id } = hero;
              return (
                <li key={id}>
                  <label htmlFor={id}>
                    <input
                      id={id}
                      type="radio"
                      name="id"
                      value={id}
                      className="srOnly"
                      onChange={onRadioInputChange}
                      onBlur={onRadioInputBlur}
                    />
                    <HeroItem
                      className={styles.heroItem}
                      hero={hero}
                      size="sm"
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <Input
          type="text"
          name="code"
          size="sm"
          labelText="나의 히어로 코드"
          maxLength={4}
          placeholder=" "
          border="rec"
          className={styles.heroCode}
          getFieldProps={getFieldProps}
        >
          <span>나의 히어로 코드</span>
        </Input>
        <ErrorMessage error={errors.submit} />
        <Button size="lg" disabled={!isValid()} className={styles.submitButton}>
          완료
        </Button>
      </Form>
      <BackwardButton
        size="xs"
        className={styles.backwardButton}
        onClick={onGoBack}
      />
    </Slide>
  );
};
