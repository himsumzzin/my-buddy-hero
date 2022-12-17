import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { initialHero } from '@/states';
import { useMissions } from '@/hooks/useMissions';

import { MissionForm } from '../MissionForm';
import { MissionInfo } from '../MissionInfo';
import { HeroList } from '../HeroList';
import { Result } from '../Result';

export const defaultMission = {
  id: '',
  groupId: '',
  authorId: '',
  maxReceiver: 1,
  receivers: [],
  title: '',
  description: '',
  isComplete: false,
};

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

export interface IMissionCardProps {
  /**
   * mission 상태에 대한 초기값입니다.
   * 임무 목록을 통해 렌더링했다면 해당 임무에 대한 정보를 넣어줍니다.
   * 임무 등록 버튼을 통해 렌더링했다면 기본값을 사용합니다.
   */
  initialMission: IMission | null;
  onClose: () => void;
}

export const MissionCard = ({ initialMission, onClose }: IMissionCardProps) => {
  const [currentComponent, setCurrentComponent] = useState<MissionComponent>(
    initialMission ? 'MissionInfo' : 'MissionForm'
  );
  const [missionInfo, setMissionInfo] = useState<IMission>(
    initialMission ?? defaultMission
  );
  const { addMission, updateMission } = useMissions();

  const missionStatus = useRef<IMissionStatus>(
    initialMission ? 'update' : 'create'
  );
  const heroInfo = useRef<IHero>(initialHero);

  const renderMissionForm = () => setCurrentComponent('MissionForm');
  const renderMissionInfo = () => setCurrentComponent('MissionInfo');
  const renderHeroList = () => setCurrentComponent('HeroList');
  const renderResult = () => setCurrentComponent('Result');

  const updateMissionInfo = (newMissionInfo: Summary) => {
    setMissionInfo((prevMissionInfo) => ({
      ...prevMissionInfo,
      ...newMissionInfo,
    }));

    renderHeroList();
  };

  const setMissionStatus = (newStatus: IMissionStatus) => {
    missionStatus.current = newStatus;
    renderHeroList();
  };

  const onHeroSelect = async (selectedHeroInfo: IHero) => {
    heroInfo.current = selectedHeroInfo;

    const status = missionStatus.current;
    switch (status) {
      case 'create':
        setMissionInfo((prevInfo) => ({
          ...prevInfo,
          authorId: selectedHeroInfo.id,
        }));
        await addMission({ ...missionInfo, authorId: heroInfo.current.id });
        break;
      case 'update':
        setMissionInfo((prevInfo) => ({
          ...prevInfo,
          receivers: [...prevInfo.receivers, selectedHeroInfo.id],
        }));
        await updateMission(missionInfo.id, { receiver: selectedHeroInfo.id });
        break;
      case 'complete':
        setMissionInfo((prevInfo) => ({
          ...prevInfo,
          isComplete: status === 'complete',
        }));
        await updateMission(missionInfo.id, {
          receivers: missionInfo.receivers,
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
            mission={missionInfo}
            onSubmit={updateMissionInfo}
            onClose={onClose}
          />
        ) : currentComponent === 'MissionInfo' ? (
          <MissionInfo
            mission={missionInfo}
            onSelect={setMissionStatus}
            onClose={onClose}
          />
        ) : currentComponent === 'HeroList' ? (
          <HeroList
            receivers={missionInfo.receivers}
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
