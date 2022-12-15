import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { initialHero } from '@/states';
import { useMissions } from '@/hooks/useMissions';

import { MissionForm } from './MissionForm';
import { MissionInfo } from './MissionInfo';
import { HeroList } from './HeroList';
import { Result } from './Result';

export const defaultMission = {
  _id: '',
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

export interface MissionCardProps {
  /**
   * mission 상태에 대한 초기값입니다.
   * 임무 목록을 통해 렌더링했다면 해당 임무에 대한 정보를 넣어줍니다.
   * 임무 등록 버튼을 통해 렌더링했다면 기본값을 사용합니다.
   */
  initialMission?: Mission;
  onClose: () => void;
}

export const MissionCard = ({ initialMission, onClose }: MissionCardProps) => {
  const [currentComponent, setCurrentComponent] = useState<MissionComponent>(
    initialMission ? 'MissionInfo' : 'MissionForm'
  );
  const [missionInfo, setMissionInfo] = useState<Mission>(
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
    setMissionInfo((prevMissionInfo) => ({
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
        setMissionInfo((prevInfo) => ({
          ...prevInfo,
          authorId: selectedHeroInfo._id,
        }));
        addMission({ authorId: heroInfo.current._id, missionInfo });
        break;
      case 'update':
        setMissionInfo((prevInfo) => ({
          ...prevInfo,
          receivers: [...prevInfo.receivers, selectedHeroInfo._id],
        }));
        updateMission(missionInfo);
        break;
      case 'complete':
        setMissionInfo((prevInfo) => ({
          ...prevInfo,
          isComplete: status === 'complete',
        }));
        updateMission(missionInfo);
        break;
    }

    renderResult();
  };

  return (
    <>
      <AnimatePresence>
        {currentComponent === 'MissionForm' ? (
          <MissionForm
            summary={missionInfo}
            onSubmit={updateMissionInfo}
            onClose={onClose}
          />
        ) : currentComponent === 'MissionInfo' ? (
          <MissionInfo
            summary={missionInfo}
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
    </>
  );
};
