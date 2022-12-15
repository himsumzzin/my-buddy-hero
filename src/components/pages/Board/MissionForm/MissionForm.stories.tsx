import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MissionForm, MissionFormProps } from './MissionForm';
import { Summary } from '../MissionCard';

export default {
  title: 'Components/missionCard/MissionForm',
  component: MissionForm,
  args: {
    summary: {
      title: '',
      maxReceiver: 1,
      description: '',
    },
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
