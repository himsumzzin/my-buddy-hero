import { useState } from 'react';
import { useDialog, useHeroes } from '@/hooks';
import { initialHero } from '@/states';
import { HeroRegister } from './HeroRegister';
import { Camera } from './Camera';
import { Complete } from './Complete';
import { ErrorDialog } from '../common';

type Stage = 'HeroRegister' | 'Camera' | 'Complete';

export const Register = () => {
  // 현재 렌더링 된 페이지 상태로 관리
  const [page, setPage] = useState<Stage>('HeroRegister');
  const [heroInfo, setHeroInfo] = useState<Hero>(initialHero);
  const { createHero } = useHeroes();
  const errorDialog = useDialog();

  const getHeroInfo = (newHeroInfo: Hero) => {
    setHeroInfo({ ...heroInfo, ...newHeroInfo });
    setPage('Camera');
  };

  const saveHeroInfo = async (imgURL: string) => {
    try {
      const newHeroInfo = { ...heroInfo, profileImage: imgURL };
      const newHero = await createHero(newHeroInfo);

      setHeroInfo((prev) => ({
        ...prev,
        profileImage: newHero.profileImage,
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
      {errorDialog.isOpen ? <ErrorDialog onClose={errorDialog.close} /> : null}
    </>
  );
};
