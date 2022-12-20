import { atom, selector } from 'recoil';

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

export type MissionListFilter = 'All' | 'Completed' | 'Uncompleted';

export const missionListState = atom<MissionList>({
  key: 'missionListState',
  default: [],
});

const missionListFilterState = atom<MissionListFilter>({
  key: 'missionListFilterState',
  default: 'All',
});

export const filteredMissionListState = selector({
  key: 'filteredMissionListState',
  get: ({ get }) => {
    const filter = get(missionListFilterState);
    const list = get(missionListState);

    switch (filter) {
      case 'Completed':
        return list.filter((item: Mission) => item.isComplete);
      case 'Uncompleted':
        return list.filter((item: Mission) => !item.isComplete);
      default:
        return [...list].sort((a, b) => {
          if (a.isComplete !== b.isComplete) {
            return a.isComplete ? 1 : -1;
          }
          const isSelectableA = a.maxReceiver > a.receivers.length;
          const isSelectableB = b.maxReceiver > b.receivers.length;
          if (isSelectableA !== isSelectableB) {
            return isSelectableA ? -1 : 1;
          }
          return 0;
        });
    }
  },
});
