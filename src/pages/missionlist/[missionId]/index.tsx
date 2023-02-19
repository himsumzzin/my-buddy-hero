import Head from 'next/head';
import { useRouter } from 'next/router';
import { MissionCard } from '@/components/MissionList';
import { BeatLoader } from 'react-spinners';
import { missionListState } from '@/states';
import { useRecoilValue } from 'recoil';

export default function MissionDetail() {
  const router = useRouter();
  const missionList = useRecoilValue(missionListState);

  const { missionId } = router.query;
  const mission = missionList.find((mission) => mission.id === missionId);

  if (!mission) {
    return <BeatLoader />;
  }

  return (
    <>
      <Head>
        <title>미션 상세</title>
      </Head>
      <div>
        <MissionCard initialMission={mission} />
      </div>
    </>
  );
}
