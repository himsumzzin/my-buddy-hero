import { atom } from 'recoil';

export const initialHero = {
  _id: '',
  groupId: '',
  name: '',
  code: '',
  password: '',
  profileImage: '',
  missionCount: 0,
  description: '',
};

const sampleHero = {
  _id: '123',
  groupId: '1',
  name: '김현진',
  code: '휴지맨',
  password: '1234',
  profileImage: '/images/hero2.png',
  missionCount: 5,
  description: '저는 휴지를 정말 잘 주워요!',
};
const sampleHero2 = {
  _id: '456',
  groupId: '1',
  name: '이채련',
  code: '아쿠아맨',
  password: '1234',
  profileImage: '/images/hero1.png',
  missionCount: 5,
  description: '저는 잠수를 기깔나게 잘해요!',
};

const sampleHeroes = [];

for (let i = 1; i < 20; i++) {
  if (i % 2 === 0) {
    sampleHeroes.push({
      ...sampleHero,
      _id: i + '',
    });
  } else {
    sampleHeroes.push({
      ...sampleHero2,
      _id: i + '',
    });
  }
}

export const heroesState = atom<HeroList>({
  key: 'heroesState',
  default: sampleHeroes,
});
