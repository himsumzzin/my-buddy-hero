/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Dialog, Nav } from '@/components/common';
import { MissionCard, MissionItem } from '@/components/Missions';
import { filteredMissionListState } from '@/states';
import { useDialog, useHeroes, useMissions } from '@/hooks';
import styles from './Missions.module.css';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Missions() {
  const router = useRouter();
  const { initHeroeList } = useHeroes();
  const { initMissionList } = useMissions();
  const filteredMissionList = useRecoilValue(filteredMissionListState);
  const missionDialog = useDialog();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    initHeroeList();
    initMissionList();
  }, []);

  const openMissionInfo = (mission: Mission) => {
    setSelectedMission(mission);
    missionDialog.open();
  };
  const openMissionForm = () => {
    missionDialog.open();
  };
  const closeMissionCard = () => {
    setSelectedMission(null);
    missionDialog.close();
  };

  return (
    <div className={styles.container}>
      <Nav
        buttonName="임무 등록"
        onButtonClick={openMissionForm}
        currentPage={router?.asPath}
      />
      <div className={styles.missionContainer}>
        <ul className={styles.missionList}>
          {filteredMissionList.map((mission) => {
            return (
              <MissionItem
                key={mission.id}
                mission={mission}
                onClick={openMissionInfo}
              />
            );
          })}
        </ul>
      </div>
      {missionDialog.isOpen ? (
        <Dialog modal onClose={closeMissionCard}>
          <MissionCard
            initialMission={selectedMission}
            onClose={closeMissionCard}
          />
        </Dialog>
      ) : null}
    </div>
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
