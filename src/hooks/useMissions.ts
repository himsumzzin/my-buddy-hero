import { useRecoilState } from 'recoil';
import { missionListState } from '@/states';
import { useHeroes } from '@/hooks';
import { AxiosWithRetry } from '@/apis';
import { useSession } from 'next-auth/react';

export const useMissions = () => {
  const { data: session } = useSession();
  const groupId = session?.user?.name;

  const { updateCompleteNumber } = useHeroes();

  const [missionList, setMissionList] = useRecoilState(missionListState);

  const initMissionList = async () => {
    const { data } = await AxiosWithRetry.get(`api/groups/${groupId}/missions`);
    setMissionList(data.body.missions);
  };

  const resetMissionList = () => {
    setMissionList([]);
  };

  const addMission = async (mission: Mission) => {
    try {
      const { data } = await AxiosWithRetry.post(
        `api/groups/${groupId}/missions`,
        mission
      );
      const newMission = data.body.mission;

      setMissionList((prev) => [newMission, ...prev]);
    } catch (err) {
      console.log(err);
      throw new Error('mission create error');
    }
  };

  const updateMission = async (
    missionId: string,
    missionInfo: {
      receiver?: string;
      receivers?: string[];
    }
  ) => {
    try {
      await AxiosWithRetry.patch(
        `api/groups/${groupId}/missions/${missionId}`,
        missionInfo
      );

      const { receiver, receivers } = missionInfo;

      if (receiver) {
        setMissionList((prevMissions) =>
          prevMissions.map((prevMission) =>
            prevMission.id === missionId
              ? {
                  ...prevMission,
                  receivers: [...prevMission.receivers, receiver],
                }
              : prevMission
          )
        );
      }
      if (receivers) {
        setMissionList((prevMissions) =>
          prevMissions.map((prevMission) =>
            prevMission.id === missionId
              ? { ...prevMission, isComplete: true }
              : prevMission
          )
        );
        updateCompleteNumber(receivers);
      }
    } catch (err) {
      throw new Error('mission update error');
    }
  };
  return {
    missionList,
    initMissionList,
    resetMissionList,
    addMission,
    updateMission,
  };
};
