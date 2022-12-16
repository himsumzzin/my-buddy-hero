import { atom } from 'recoil';

export const initialHero = {
  id: '',
  groupId: '',
  name: '',
  code: '1234',
  title: '',
  profileImage: '',
  completeNumber: 0,
  description: '',
};

export const heroesState = atom<IHeroList>({
  key: 'heroesState',
  default: [],
});
