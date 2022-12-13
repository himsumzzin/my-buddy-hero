import { atom } from 'recoil';

export const missionsState = atom<MissionList>({
  key: 'missionsState',
  default: [],
});
