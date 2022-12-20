import { heroesState, userState } from '@/states';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useHeroes = () => {
  const user = useRecoilValue(userState);
  const groupId = user.groupId as string;

  const [heroList, setHeroList] = useRecoilState(heroesState);

  const initHeroeList = async () => {
    try {
      const { data } = await axios.get(`api/groups/${groupId}/heroes`);
      setHeroList(data.body.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createHero = async (heroInfo: Hero) => {
    try {
      const { data } = await axios.post(
        `/api/groups/${groupId}/heroes`,
        heroInfo
      );
      console.log('서버에 저장을 성공해써요!');

      const newHero = data.body.hero;
      setHeroList((prev) => [...prev, newHero]);

      return newHero;
    } catch (err) {
      console.error('히어로 정보가 제대로 전송되지 않았습니다.', err);
    }
  };

  const updateCompleteNumber = (heroIds: string[]) => {
    setHeroList((prev) =>
      prev.map((hero) =>
        heroIds.includes(hero.id)
          ? { ...hero, completeNumber: hero.completeNumber + 1 }
          : hero
      )
    );
  };

  return { heroList, initHeroeList, createHero, updateCompleteNumber };
};
