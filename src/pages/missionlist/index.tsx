/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { filteredMissionListState } from '@/states';
import { useHeroes, useMissions } from '@/hooks';
import { Nav, Slide } from '@/components/common';
import { MissionItem } from '@/components/MissionList';
import styles from '@styles/MissionList.module.css';

export default function MissionList() {
  const router = useRouter();
  const { initHeroeList, getHero } = useHeroes();
  const { initMissionList } = useMissions();
  const filteredMissionList = useRecoilValue(filteredMissionListState);

  useEffect(() => {
    initHeroeList();
    initMissionList();
  }, []);

  return (
    <>
      <Head>
        <title>임무를 수행해보세요!</title>
      </Head>
      <div className={styles.container}>
        <Nav linkTo="mission" currentPage={router?.asPath} />
        <Slide direction="left" className={styles.missionContainer}>
          {filteredMissionList.length > 0 ? (
            <ul className={styles.missionList}>
              {filteredMissionList.map((mission) => {
                return (
                  <MissionItem
                    key={mission.id}
                    author={getHero(mission.authorId) as Hero}
                    mission={mission}
                  />
                );
              })}
            </ul>
          ) : (
            <p>임무를 등록해주세요!</p>
          )}
        </Slide>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
