import { atom } from 'recoil';

export const initialHero = {
  id: '',
  groupId: '',
  name: '',
  title: '',
  code: '',
  profileImage: '',
  completeNumber: 0,
  description: '',
};

const sampleHero = {
  id: '123',
  groupId: '1',
  name: '김현진',
  title: '',
  code: '휴지맨',
  profileImage: '/images/hero2.png',
  completeNumber: 5,
  description: '저는 휴지를 정말 잘 주워요!',
};
const sampleHero2 = {
  id: '456',
  groupId: '1',
  name: '이채련',
  title: '',
  code: '아쿠아맨',
  profileImage: '/images/hero1.png',
  completeNumber: 5,
  description: '저는 잠수를 기깔나게 잘해요!',
};

const sampleHeroes = [];

for (let i = 1; i < 20; i++) {
  if (i % 2 === 0) {
    sampleHeroes.push({
      ...sampleHero,
      id: i + '',
    });
  } else {
    sampleHeroes.push({
      ...sampleHero2,
      id: i + '',
    });
  }
}

export const heroesState = atom<IHeroList>({
  key: 'heroesState',
  default: sampleHeroes,
});
