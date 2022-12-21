import { heroesState, userState } from '@/states';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AxiosWithRetry } from '@/apis';

export const useHeroes = () => {
  const user = useRecoilValue(userState);
  const groupId = user.groupId as string;

  const [heroList, setHeroList] = useRecoilState(heroesState);

  const initHeroeList = async () => {
    const { data } = await AxiosWithRetry.get(`api/groups/${groupId}/heroes`);
    setHeroList(data.body.data);
  };

  const createHero = async (heroInfo: Hero) => {
    try {
      const { data } = await AxiosWithRetry.post(
        `/api/groups/${groupId}/heroes`,
        heroInfo
      );
      console.log('서버에 저장을 성공해써요!');

      const newHero = data.body.hero;
      setHeroList((prev) => [...prev, newHero]);

      return newHero;
    } catch (err) {
      console.log(err);
      throw new Error('hero create error');
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
