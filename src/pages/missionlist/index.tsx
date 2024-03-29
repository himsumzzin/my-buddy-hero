/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import { Nav, Slide } from '@/components/common';
import { MissionItem } from '@/components/MissionList';
import { useGetMissionList } from '@/apis';
import styles from '@styles/MissionList.module.css';

export default function MissionList() {
  const router = useRouter();

  const groupId = '1';
  const { data: missionList } = useGetMissionList(groupId);

  if (!missionList) {
    return <BeatLoader />;
  }

  const filteredMissoinList = missionList.sort((misssion) =>
    misssion.isComplete ? 1 : -1
  );

  return (
    <>
      <Head>
        <title>임무를 수행해보세요!</title>
      </Head>
      <div className={styles.container}>
        <Nav linkTo="mission" currentPage={router?.asPath} />
        <Slide direction="left" className={styles.missionContainer}>
          <ul className={styles.missionList}>
            {filteredMissoinList.map((mission) => (
              <MissionItem key={mission.id} mission={mission} />
            ))}
          </ul>
        </Slide>
      </div>
    </>
  );
}
MissionList.auth = {
  entrance: 'loggedIn',
  redirection: '/login', // redirect to this url
};
