import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const MISSION_KEYS = {
  list: ['missionList'] as const,
  detail: (id: string) => [...MISSION_KEYS.list, id] as const,
};

const getMissionList = async (groupId: string): Promise<MissionList> => {
  const { data } = await axios.get(`/api/groups/${groupId}/missionlist`);

  return data.body.missions;
};
const getMission = async (
  groupId: string,
  missionId: string
): Promise<Mission> => {
  const { data } = await axios.get(
    `/api/groups/${groupId}/missionlist/${missionId}`
  );

  return data.body.mission;
};

const addMission = ({
  groupId,
  mission,
}: {
  groupId: string;
  mission: Mission;
}) => axios.post(`/api/groups/${groupId}/missionlist`, mission);

const updateMission = async ({
  groupId,
  missionId,
  receiver,
}: {
  groupId: string;
  missionId: string;
  receiver: string;
}) =>
  axios.patch(`/api/groups/${groupId}/missionlist/${missionId}`, {
    missionInfo: receiver,
  });

const completeMission = async ({
  groupId,
  missionId,
  receivers,
}: {
  groupId: string;
  missionId: string;
  receivers: string[];
}) =>
  axios.patch(`/api/groups/${groupId}/missionlist/${missionId}`, {
    missionInfo: receivers,
  });

const useMissionMutation = (fetcher: (props: any) => Promise<any>) => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => queryClient.invalidateQueries(MISSION_KEYS.list),
  });
};

export const useGetMissionList = (groupId: string) =>
  useQuery(MISSION_KEYS.list, () => getMissionList(groupId));

export const useGetMission = (groupId: string, missionId: string) => {
  return useQuery([MISSION_KEYS.detail(missionId), missionId], () =>
    getMission(groupId, missionId)
  );
};

export const useAddMission = () => useMissionMutation(addMission);
export const useUpdateMission = () => useMissionMutation(updateMission);
export const useCompleteMission = () => useMissionMutation(completeMission);
