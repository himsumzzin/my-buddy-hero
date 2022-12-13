import { atom } from 'recoil';

export const userState = atom<User>({
  key: 'userState',
  default: {
    _id: '11',
    groupId: '1',
    nickname: 'nickname',
  },
});
