import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { defaultMission, initialHero } from '@/states';
import { useMissions } from '@/hooks/useMissions';

import { MissionForm } from '../MissionForm';
import { MissionInfo } from '../MissionInfo';
import { HeroList } from '../HeroList';
import { Result } from '../Result';

export interface Summary {
  title: string;
  description: string;
  maxReceiver: number;
}

export type MissionComponent =
  | 'MissionForm'
  | 'MissionInfo'
  | 'HeroList'
  | 'Result';

export interface MissionCardProps {
  /**
   * mission 상태에 대한 초기값입니다.
   * 임무 목록을 통해 렌더링했다면 해당 임무에 대한 정보를 넣어줍니다.
   * 임무 등록 버튼을 통해 렌더링했다면 기본값을 사용합니다.
   */
  initialMission: Mission | null;
  onClose: () => void;
}

export const MissionCard = ({ initialMission, onClose }: MissionCardProps) => {
  const [currentComponent, setCurrentComponent] = useState<MissionComponent>(
    initialMission ? 'MissionInfo' : 'MissionForm'
  );
  const [mission, setMission] = useState<Mission>(
    initialMission ?? defaultMission
  );
  const { addMission, updateMission } = useMissions();

  const missionStatus = useRef<MissionStatus>(
    initialMission ? 'update' : 'create'
  );
  const heroInfo = useRef<Hero>(initialHero);

  const renderMissionForm = () => setCurrentComponent('MissionForm');
  const renderMissionInfo = () => setCurrentComponent('MissionInfo');
  const renderHeroList = () => setCurrentComponent('HeroList');
  const renderResult = () => setCurrentComponent('Result');

  const updateMissionInfo = (newMissionInfo: Summary) => {
    setMission((prevMissionInfo) => ({
      ...prevMissionInfo,
      ...newMissionInfo,
    }));

    renderHeroList();
  };

  const setMissionStatus = (newStatus: MissionStatus) => {
    missionStatus.current = newStatus;
    renderHeroList();
  };

  const onHeroSelect = async (selectedHeroInfo: Hero) => {
    heroInfo.current = selectedHeroInfo;

    const status = missionStatus.current;
    switch (status) {
      case 'create':
        await addMission({ ...mission, authorId: heroInfo.current.id });
        break;
      case 'update':
        await updateMission(mission.id, { receiver: selectedHeroInfo.id });
        break;
      case 'complete':
        await updateMission(mission.id, {
          receivers: mission.receivers,
        });
        break;
    }

    renderResult();
  };

  return (
    <div>
      <AnimatePresence>
        {currentComponent === 'MissionForm' ? (
          <MissionForm
            mission={mission}
            onSubmit={updateMissionInfo}
            onClose={onClose}
          />
        ) : currentComponent === 'MissionInfo' ? (
          <MissionInfo
            mission={mission}
            onSelect={setMissionStatus}
            onClose={onClose}
          />
        ) : currentComponent === 'HeroList' ? (
          <HeroList
            mission={mission}
            missionStatus={missionStatus.current}
            onSubmit={onHeroSelect}
            onGoBack={
              missionStatus.current === 'create'
                ? renderMissionForm
                : renderMissionInfo
            }
          />
        ) : (
          <Result
            missionStatus={missionStatus.current}
            heroInfo={heroInfo.current}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
