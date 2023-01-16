import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MissionCard, MissionCardProps } from './MissionCard';

export default {
  title: 'Components/Missions/MissionCard',
  component: MissionCard,
  args: {
    onClose: () => alert('닫는다!'),
  },
  parameters: {
    docs: {
      description: {
        component:
          'MissionCard 등록|선택|완료 컴포넌트를 감싸는 컨테이너 컴포넌트입니다',
      },
    },
  },
} as ComponentMeta<typeof MissionCard>;

const Template: ComponentStory<typeof MissionCard> = (
  args: MissionCardProps
) => <MissionCard {...args} />;

export const Create = Template.bind({});

export const Update = Template.bind({});
Update.args = {
  initialMission: {
    id: '',
    groupId: '',
    authorId: '',
    maxReceiver: 3,
    receivers: [],
    title: '지우개 좀 빌려주세요',
    description: '필통을 잊어버리고 안가져왔어요',
    isComplete: false,
  },
};
