import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDialog } from '@/hooks';
import { initialHero } from '@/states';
import { ErrorDialog } from '../common';
import { HeroRegister } from './HeroRegister';
import { Camera } from './Camera';
import { Complete } from './Complete';
import { useAddHero } from '../../apis/heroList';

type Stage = 'HeroRegister' | 'Camera' | 'Complete';

export const Register = () => {
  // 현재 렌더링 된 페이지 상태로 관리
  const [page, setPage] = useState<Stage>('HeroRegister');
  const [heroInfo, setHeroInfo] = useState<Hero>(initialHero);
  const errorDialog = useDialog();
  const addHero = useAddHero();

  //임시로 사용할 값
  const groupId = '1';

  const getHeroInfo = (newHeroInfo: Hero) => {
    setHeroInfo({ ...heroInfo, ...newHeroInfo });
    setPage('Camera');
  };

  const saveHeroInfo = async (imgURL: string) => {
    try {
      const hero = { ...heroInfo, profileImage: imgURL };
      addHero.mutate({ groupId, hero });

      setHeroInfo((prev) => ({
        ...prev,
        profileImage: hero.profileImage,
      }));
      setPage('Complete');
    } catch (err) {
      // console.error('히어로 정보가 제대로 전송되지 않았습니다.', err);
      errorDialog.open();
    }
  };

  // link to page handler props
  const handlerLinkToRegisterPage = () => {
    setPage('HeroRegister');
  };
  const handlerLinkToCompletePage = () => {
    setPage('Complete');
  };

  const resetPage = () => {
    setHeroInfo(initialHero);
    setPage('HeroRegister');
  };

  return (
    <>
      <AnimatePresence>
        {page === 'HeroRegister' ? (
          <HeroRegister
            initialValue={heroInfo}
            onSubmit={getHeroInfo}
          ></HeroRegister>
        ) : page === 'Camera' ? (
          <Camera
            handlerRegisterPage={handlerLinkToRegisterPage}
            handlerCompletePage={handlerLinkToCompletePage}
            saveHeroInfo={saveHeroInfo}
          ></Camera>
        ) : (
          <Complete hero={heroInfo} reset={resetPage}></Complete>
        )}
        {errorDialog.isOpen ? (
          <ErrorDialog onClose={errorDialog.close} />
        ) : null}
      </AnimatePresence>
    </>
  );
};
