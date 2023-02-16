import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MissionItem, IMissionItemProps } from './MissionItem';

export default {
  title: 'Components/missionlist/MissionItem',
  component: MissionItem,
  args: {
    mission: {
      id: '1',
      groupId: '',
      authorId: '',
      receivers: ['123'],
      title: '미션 제목입니다',
      isComplete: false,
      description:
        '현진이 엉덩이는 빨개 빨가면 사과 사과는 맛있어 맛있으면 바나나 바나나는 길어 길면 기차 기차는 빨라 빠르면 비행기 비행기는 높아 높으면 백두산!',
      maxReceiver: 3,
    },
    author: {
      id: '123',
      groupId: '1',
      name: '코딩맨',
      code: '1234',
      title: '코딩맨',
      profileImage:
        'https://storage.googleapis.com/my-buddy-hero-23f442ea-c632-4e73-9459-1b0d73f7f704/01c78c73_1_%EB%AF%BC%EC%84%9D',
      completeNumber: 0,
      description: '코딩맨입니다',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '미션 리스트의 아이템으로 사용되는 컴포넌트입니다. 기본 / 미션 수락 불가능 / 미션 완료 세가지 상태를 가집니다.',
      },
    },
  },
} as ComponentMeta<typeof MissionItem>;

const Template: ComponentStory<typeof MissionItem> = (
  args: IMissionItemProps
) => <MissionItem {...args} />;

export const Available = Template.bind({});
Available.parameters = {
  docs: {
    description: {
      story: '기본 상태. 미션 선택 / 미션 완료 처리 모두 가능합니다',
    },
  },
};

export const NotSelectable = Template.bind({});
NotSelectable.args = {
  mission: {
    id: '1',
    groupId: '',
    authorId: '',
    receivers: ['123', '456', '789'],
    title: '미션 제목입니다',
    isComplete: false,
    description:
      '현진이 엉덩이는 빨개 빨가면 사과 사과는 맛있어 맛있으면 바나나 바나나는 길어 길면 기차 기차는 빨라 빠르면 비행기 비행기는 높아 높으면 백두산!',
    maxReceiver: 3,
  },
};
NotSelectable.parameters = {
  docs: {
    description: {
      story:
        '미션 수락 불가능 상태. 미션 선택은 불가능하고 미션 완료 처리만 가능합니다',
    },
  },
};

export const Completed = Template.bind({});
Completed.args = {
  mission: {
    id: '1',
    groupId: '',
    authorId: '',
    receivers: ['123', '456', '789'],
    title: '미션 제목입니다',
    isComplete: true,
    description:
      '현진이 엉덩이는 빨개 빨가면 사과 사과는 맛있어 맛있으면 바나나 바나나는 길어 길면 기차 기차는 빨라 빠르면 비행기 비행기는 높아 높으면 백두산!',
    maxReceiver: 3,
  },
};
Completed.parameters = {
  docs: {
    description: {
      story: '미션 완료 상태. 클릭해도 미션 카드를 렌더링하지 않습니다',
    },
  },
};
