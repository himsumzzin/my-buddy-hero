import Head from 'next/head';
import { MissionCard } from '@/components/MissionList';
import { defaultMission } from '@/states';

export default function NewMission() {
  return (
    <>
      <Head>
        <title>임무 등록</title>
      </Head>
      <div>
        <MissionCard initialMission={defaultMission} />
      </div>
    </>
  );
}
