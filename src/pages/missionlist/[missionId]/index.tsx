import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import { MissionCard } from '@/components/MissionList';
import { useGetMission } from '@/apis';

interface MissiondetailProps {
  missionId: string;
}

export default function MissionDetail({ missionId }: MissiondetailProps) {
  const groupId = '1';
  const { data: mission } = useGetMission(groupId, missionId);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { missionId },
  } = context;

  return {
    props: {
      missionId,
    },
  };
};
