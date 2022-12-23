import { heroesState } from '@/states';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { AxiosWithRetry } from '@/apis';

export const useHeroes = () => {
  const { data: session } = useSession();
  const groupId = session?.user?.name;
  const [heroList, setHeroList] = useRecoilState(heroesState);

  const initHeroeList = async () => {
    const { data } = await AxiosWithRetry.get(`api/groups/${groupId}/heroes`);
    setHeroList(data.body.data);
  };

  const resetHeroList = () => {
    setHeroList([]);
  };

  const createHero = async (heroInfo: Hero) => {
    try {
      const { data } = await AxiosWithRetry.post(
        `/api/groups/${groupId}/heroes`,
        heroInfo
      );

      const newHero = data.body.hero;
      setHeroList((prev) => [...prev, newHero]);

      return newHero;
    } catch (err) {
      console.log(err);
      throw new Error('hero create error');
    }
  };

  const getHero = (heroId: string) =>
    heroList.find((hero) => hero.id === heroId);

  const updateCompleteNumber = (heroIds: string[]) => {
    setHeroList((prev) =>
      prev.map((hero) =>
        heroIds.includes(hero.id)
          ? { ...hero, completeNumber: hero.completeNumber + 1 }
          : hero
      )
    );
  };

  return {
    heroList,
    initHeroeList,
    resetHeroList,
    createHero,
    getHero,
    updateCompleteNumber,
  };
};
