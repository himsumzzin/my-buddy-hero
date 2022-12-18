import { useRecoilValue, useSetRecoilState } from 'recoil';
import { missionsState, userState } from '@/states';
import { createMission } from '@/apis';
import axios from 'axios';

export const useMissions = () => {
  const user = useRecoilValue(userState);
  const groupId = user.groupId as string;

  const setMissions = useSetRecoilState(missionsState);

  const getMissions = async () => {
    try {
      const { data } = await axios.get(`api/missions/${groupId}`);
      setMissions(
        data.body.missions.sort((a: IMission, b: IMission) =>
          a.isComplete ? 1 : -1
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addMission = async (mission: IMission) => {
    try {
      const { data } = await axios.post('api/missions', {
        ...mission,
        groupId,
      });
      const newMission = data.body.mission;

      setMissions((prev) => [newMission, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMission = async (
    id: string,
    missionInfo: {
      receiver?: string;
      receivers?: string[];
    }
  ) => {
    try {
      const { data } = await axios.patch(
        `api/missions/mission/${id}`,
        missionInfo
      );

      if (data.body.success) {
        setMissions((prevMissions) =>
          prevMissions.map((prevMission) =>
            prevMission.id === id
              ? prevMission
              : { ...prevMission, ...missionInfo }
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  return { getMissions, addMission, updateMission };
};
