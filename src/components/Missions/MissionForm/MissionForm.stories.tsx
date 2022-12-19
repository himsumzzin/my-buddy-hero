import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MissionForm, MissionFormProps } from './MissionForm';
import { Summary } from '../MissionCard';
import { defaultMission } from '@/states';

export default {
  title: 'Pages/Missions/MissionForm',
  component: MissionForm,
  args: {
    mission: defaultMission,
    onSubmit: (newMissionInfo: Summary) => {
      console.log(newMissionInfo);
    },
    onClose: () => {
      alert('Close!');
    },
  },
  parameters: {
    docs: {
      description: {
        component: '미션을 등록하기 위해 정보를 입력하는 창입니다',
      },
    },
  },
} as ComponentMeta<typeof MissionForm>;

const Template: ComponentStory<typeof MissionForm> = (
  args: MissionFormProps
) => <MissionForm {...args} />;

export const Default = Template.bind({});
