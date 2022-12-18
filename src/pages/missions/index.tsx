/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import styles from './Missions.module.css';
import { Link, Button, Dialog } from '@/components/common';
import { useRecoilValue } from 'recoil';
import { missionListState } from '@/states';
import { MissionCard, MissionItem } from '@/components/Missions';
import { useMissions } from '@/hooks/useMissions';

export default function Missions() {
  const missions = useRecoilValue(missionListState);
  const { initMissions } = useMissions();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    initMissions();
  }, []);

  useEffect(() => {
    console.log(missions);
  }, [missions]);

  const openMissionInfo = (mission: Mission) => {
    setSelectedMission(mission);
    setOpenDialog(true);
  };
  const openMissionForm = () => {
    setOpenDialog(true);
  };
  const closeMissionCard = () => {
    setSelectedMission(null);
    setOpenDialog(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Link href={'/missions'} size={'lg'} selected>
          임무목록
        </Link>
        <Link href={'/herolist'} size={'lg'}>
          히어로 명단
        </Link>
        <Button
          size="md"
          disabled={false}
          className={styles.buttonBox}
          onClick={openMissionForm}
        >
          미션 등록
        </Button>
      </div>
      <div className={styles.missionContainer}>
        <ul className={styles.missionList}>
          {missions.map((mission) => {
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
      {openDialog ? (
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
