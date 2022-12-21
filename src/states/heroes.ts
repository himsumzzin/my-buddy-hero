import { atom } from 'recoil';

export const initialHero: Hero = {
  id: '',
  groupId: '',
  name: '',
  code: '',
  title: '',
  profileImage: '',
  completeNumber: 0,
  description: '',
};

export const heroesState = atom<HeroList>({
  key: 'heroesState',
  default: [],
});
