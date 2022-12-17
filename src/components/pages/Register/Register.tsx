import { HeroRegister } from './HeroRegister';
import { Camera } from './Camera';
import { Complete } from './Complete';
import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { heroesState } from '@/states/heroes';

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
  const setHeroesInfo = useSetRecoilState(heroesState);

  const getHeroInfo = (newHeroInfo: HeroInfo) => {
    setHeroInfo({ ...heroInfo, ...newHeroInfo });
    setPage('Camera');
  };

  const saveHeroInfo = async (imgURL: string) => {
    try {
      const { data } = await axios.post('/api/hero', {
        ...heroInfo,
        profileImage: imgURL,
      });
      console.log('서버에 저장을 성공해써요!');

      setHeroesInfo(data.body.hero);
      setHeroInfo((prev) => ({
        ...prev,
        profileImage: `data:image/webp;base64,${imgURL}`,
      }));
      setPage('Complete');
    } catch (err) {
      console.error('히어로 정보가 제대로 전송되지 않았습니다.', err);
    }
  };

  // link to page handler props
  const handlerLinkToRegisterPage = () => {
    setPage('HeroRegister');
  };
  const handlerLinkToCompletePage = () => {
    setPage('Complete');
  };

  const reset = () => {
    setHeroInfo(initialHeroInfo);
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
        <Complete heroInfo={heroInfo} goBack={reset}></Complete>
      )}
    </>
  );
};
