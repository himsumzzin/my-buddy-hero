import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import { MissionCard } from '@/components/MissionList';
import { useGetMission } from '@/apis';
import { useRouter } from 'next/router';

export default function MissionDetail() {
  const groupId = '1';
  const router = useRouter();
  const { missionId } = router.query;
  console.log('missionId : ', missionId);
  const { data: mission } = useGetMission(groupId, missionId as string);

  if (mission === undefined) {
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
MissionDetail.auth = {
  entrance: 'loggedIn',
  redirection: '/login', // redirect to this url
};
