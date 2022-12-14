import { useRecoilValue, useSetRecoilState } from 'recoil';
import { missionsState, userState } from '@/states';
import { createMission } from '@/apis';

export const useMissions = () => {
  const user = useRecoilValue(userState);
  const groupId = user.groupId as string;

  const setMissions = useSetRecoilState(missionsState);

  const addMission = async ({
    authorId,
    missionInfo,
  }: {
    authorId: string;
    missionInfo: Mission;
  }) => {
    const { maxReceiver, title, description } = missionInfo;
    try {
      const updatedMission = await createMission({
        groupId,
        authorId,
        maxReceiver,
        title,
        description,
      });
      setMissions((prevMissions) => [...prevMissions, updatedMission]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMission = async (newMission: Mission) => {
    // 서버에 저장 -> 성공하면 상태 최신화, 실패하면?
    try {
      setMissions((prevMissions) =>
        prevMissions.map((mission) =>
          mission._id === newMission._id ? newMission : mission
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  return { addMission, updateMission };
};
