import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const HERO_KEYS = {
  list: ['heroList'] as const,
  detail: (id: string) => [...HERO_KEYS.list, id] as const,
};

const getHeroList = async (groupId: string): Promise<HeroList> => {
  const { data } = await axios.get(`/api/groups/${groupId}/heroes`);

  return data.body.data;
};
const getHero = async ({
  groupId,
  heroId,
}: {
  groupId: string;
  heroId: string;
}) => {
  const { data } = await axios.get(`/api/groups/${groupId}/heroes/${heroId}`);

  return data.body.hero;
};

const addHero = ({ groupId, hero }: { groupId: string; hero: Hero }) =>
  axios.post(`/api/groups/${groupId}/heroes`, hero);

const useHeroMutation = (fetcher: (props: any) => Promise<any>) => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => queryClient.invalidateQueries(HERO_KEYS.list),
  });
};

export const useGetHeroList = (groupId: string) =>
  useQuery(HERO_KEYS.list, () => getHeroList(groupId));

export const useGetHero = (groupId: string, heroId: string) =>
  useQuery(HERO_KEYS.detail(heroId), () => getHero({ groupId, heroId }));

export const useAddHero = () => useHeroMutation(addHero);
