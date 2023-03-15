import Head from 'next/head';
import { MissionCard } from '@/components/MissionList';
import { defaultMission } from '@/states';
import { GetStaticProps } from 'next';

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
NewMission.auth = {
  entrance: 'loggedIn',
  redirection: '/login', // redirect to this url
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
