import { useRecoilValue, useRecoilState } from 'recoil';
import { missionListState, userState } from '@/states';
import { useHeroes } from '@/hooks';
import { AxiosWithRetry } from '@/apis';

export const useMissions = () => {
  const user = useRecoilValue(userState);
  const groupId = user.groupId as string;

  const { updateCompleteNumber } = useHeroes();

  const [missionList, setMissionList] = useRecoilState(missionListState);

  const initMissionList = async () => {
    try {
      const { data } = await AxiosWithRetry.get(
        `api/groups/${groupId}/missions`
      );

      setMissionList(data.body.missions);
    } catch (err) {
      console.error(err);
    }
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
      console.error(err);
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
      console.error(err);
    }
  };
  return { missionList, initMissionList, addMission, updateMission };
};
