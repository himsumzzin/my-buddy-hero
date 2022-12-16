import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MissionItem, IMissionItemProps } from './MissionItem';

export default {
  title: 'Pages/Missions/MissionItem',
  component: MissionItem,
  args: {
    mission: {
      id: '1',
      groupId: '',
      authorId: '',
      receivers: ['123'],
      title: '',
      isComplete: false,
      description:
        '현진이 엉덩이는 빨개 빨가면 사과 사과는 맛있어 맛있으면 바나나 바나나는 길어 길면 기차 기차는 빨라 빠르면 비행기 비행기는 높아 높으면 백두산!',
      maxReceiver: 3,
    },
    onClick: (id) => {
      console.log(id);
      return id;
    },
  },
  parameters: {
    docs: {
      description: {
        component: '미션 리스트의 아이템으로 사용되는 컴포넌트입니다',
      },
    },
  },
} as ComponentMeta<typeof MissionItem>;

const Template: ComponentStory<typeof MissionItem> = (
  args: IMissionItemProps
) => <MissionItem {...args} />;

export const Available = Template.bind({});
