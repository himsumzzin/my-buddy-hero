import { HeroRegister } from './HeroRegister';
import { Camera } from './Camera';
import { Complete } from './Complete';

import { useState } from 'react';

type Stage = 'HeroRegister' | 'Camera' | 'Complete';

interface HeroInfo {
  groupId: string;
  name: string;
  title: string;
  description: string;
  code: string;
  profileImage: string;
}

const initialHeroInfo = {
  groupId: '1',
  name: '',
  title: '',
  description: '',
  code: '',
  profileImage: '',
};

export const Register = () => {
  // 현재 렌더링 된 페이지 상태로 관리
  const [page, setPage] = useState<Stage>('HeroRegister');
  const [heroInfo, setHeroInfo] = useState<HeroInfo>(initialHeroInfo);

  const getHeroInfo = (newHeroInfo: HeroInfo) => {
    setHeroInfo(newHeroInfo);
    console.log(newHeroInfo);

    // 히어로 정보를 가지고 카메라 페이지로 이동
    setPage('Camera');
  };

  const getHeroInfoPayload = (imgURL: string) => {
    setHeroInfo({ ...heroInfo, profileImage: imgURL });
  };

  // link to page handler props
  const handlerLinkToRegisterPage = () => {
    setPage('HeroRegister');
  };
  const handlerLinkToCompletePage = () => {
    setPage('Complete');
    console.log(heroInfo);
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
          setHeroInfoPayload={getHeroInfoPayload}
          heroPayload={heroInfo}
        ></Camera>
      ) : (
        <Complete heroInfo={heroInfo}></Complete>
      )}
    </>
  );
};
