import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MissionInfo, MissionInfoProps } from './MissionInfo';

export default {
  title: 'Components/missionCard/MissionInfo',
  component: MissionInfo,
  args: {
    summary: {
      _id: '',
      groupId: '',
      authorId: '',
      maxReceiver: 3,
      receivers: [],
      title: '지우개 좀 빌려주세요',
      description: '필통을 잊어버리고 안가져왔어요',
      isComplete: false,
    },
    onSelect: (missionStatus: MissionStatus) => {
      alert(missionStatus);
    },
    onClose: () => {
      alert('Close!');
    },
  },
  parameters: {
    docs: {
      description: {
        component: '미션 선택 또는 완료를 고르는 창입니다',
      },
    },
  },
} as ComponentMeta<typeof MissionInfo>;

const Template: ComponentStory<typeof MissionInfo> = (
  args: MissionInfoProps
) => <MissionInfo {...args} />;

export const Default = Template.bind({});
