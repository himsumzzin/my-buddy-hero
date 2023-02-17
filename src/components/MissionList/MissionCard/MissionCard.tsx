import { useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import { initialHero } from '@/states';
import { useMissions, useDialog, IinitialValues } from '@/hooks';

import { ErrorDialog } from '@/components/common';
import { MissionForm } from '../MissionForm';
import { MissionInfo } from '../MissionInfo';
import { HeroList } from '../HeroList';
import { Result } from '../Result';

export interface Summary extends IinitialValues {
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
  initialMission: Mission;
  /**
   * MissionCard를 담은 Dialog를 닫는 함수입니다
   */
}

export const MissionCard = ({ initialMission }: MissionCardProps) => {
  const [currentComponent, setCurrentComponent] = useState<MissionComponent>(
    initialMission.id ? 'MissionInfo' : 'MissionForm'
  );
  const { addMission, updateMission } = useMissions();
  const errorDialog = useDialog();
  const missionStatus = useRef<MissionStatus>(
    initialMission.id ? 'update' : 'create'
  );
  const mission = useRef<Mission>(initialMission);
  const hero = useRef<Hero>(initialHero);

  const renderMissionForm = useCallback(
    () => setCurrentComponent('MissionForm'),
    []
  );
  const renderMissionInfo = useCallback(
    () => setCurrentComponent('MissionInfo'),
    []
  );
  const renderHeroList = useCallback(() => setCurrentComponent('HeroList'), []);
  const renderResult = useCallback(() => setCurrentComponent('Result'), []);

  const updateMissionInfo = (newMissionInfo: Summary) => {
    mission.current = {
      ...mission.current,
      ...newMissionInfo,
    };

    renderHeroList();
  };

  const setMissionStatus = (newStatus: MissionStatus) => {
    missionStatus.current = newStatus;
    renderHeroList();
  };

  const onHeroSelect = async (selectedHeroInfo: Hero) => {
    hero.current = selectedHeroInfo;

    const status = missionStatus.current;
    try {
      switch (status) {
        case 'create':
          await addMission({
            ...mission.current,
            authorId: hero.current.id,
          });
          break;
        case 'update':
          await updateMission(mission.current.id, {
            receiver: selectedHeroInfo.id,
          });
          break;
        case 'complete':
          await updateMission(mission.current.id, {
            receivers: mission.current.receivers,
          });
          break;
      }
      renderResult();
    } catch (err) {
      errorDialog.open();
    }
  };

  return (
    <div>
      <AnimatePresence>
        {currentComponent === 'MissionForm' ? (
          <MissionForm mission={mission.current} onSubmit={updateMissionInfo} />
        ) : currentComponent === 'MissionInfo' ? (
          <MissionInfo mission={mission.current} onSelect={setMissionStatus} />
        ) : currentComponent === 'HeroList' ? (
          <HeroList
            mission={mission.current}
            missionStatus={missionStatus.current}
            onHeroSelect={onHeroSelect}
            onGoBack={
              missionStatus.current === 'create'
                ? renderMissionForm
                : renderMissionInfo
            }
          />
        ) : (
          <Result
            missionStatus={missionStatus.current}
            hero={hero.current}
            mission={mission.current}
          />
        )}
      </AnimatePresence>
      {errorDialog.isOpen ? <ErrorDialog onClose={errorDialog.close} /> : null}
    </div>
  );
};
