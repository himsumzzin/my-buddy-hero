import { heroesState } from '@/states';
import axios from 'axios';
import { useRecoilState } from 'recoil';

export const useHeroes = () => {
  const [heroes, setHeroes] = useRecoilState(heroesState);

  const createHero = async (heroInfo: HeroInfo) => {
    try {
      const { data } = await axios.post('/api/hero', heroInfo);
      console.log('서버에 저장을 성공해써요!');

      const newHero = data.body.hero;
      setHeroes(newHero);

      return newHero;
    } catch (err) {
      console.error('히어로 정보가 제대로 전송되지 않았습니다.', err);
    }
  };

  return { createHero };
};
