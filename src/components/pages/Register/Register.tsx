import { HeroRegister } from './HeroRegister';
import { Camera } from './Camera';
import { Complete } from './Complete';
import axios from 'axios';
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
    setHeroInfo({ ...heroInfo, ...newHeroInfo });
    setPage('Camera');
  };

  const saveHeroInfo = async (imgURL: string) => {
    try {
      setHeroInfo({ ...heroInfo, profileImage: imgURL });
      const heroPayload = heroInfo;
      await axios
        .post('/api/hero', heroPayload)
        .then((res) => {
          console.log(heroPayload);
          console.log('서버에 저장을 성공해써요!');
          setPage('Complete');
        })
        .catch((error) => {
          console.error('서버전송에 실패했습니다. 다시 히어로 등록을 해주세요');
        });
    } catch (err) {
      console.error('히어로 정보가 제대로 전송되지 않았습니다.');
    }
  };

  // link to page handler props
  const handlerLinkToRegisterPage = () => {
    setPage('HeroRegister');
  };
  const handlerLinkToCompletePage = () => {
    setPage('Complete');
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
        <Complete heroInfo={heroInfo}></Complete>
      )}
    </>
  );
};
