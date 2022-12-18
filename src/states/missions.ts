import { atom } from 'recoil';

export const missionsState = atom<MissionList>({
  key: 'missionsState',
  default: [],
});

export const defaultMission = {
  id: '',
  groupId: '',
  authorId: '',
  maxReceiver: 1,
  receivers: [],
  title: '',
  description: '',
  isComplete: false,
};
