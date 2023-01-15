import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Result, ResultProps } from './Result';

export default {
  title: 'Pages/Missions/Result',
  component: Result,
  args: {
    heroInfo: {
      id: '123',
      groupId: '1',
      title: '휴지맨',
      name: '김현진',
      code: '1234',
      profileImage: '/images/hero2.png',
      completeNumber: 5,
      description: '저는 휴지를 정말 잘 주워요!',
    },
    onClose: () => alert('닫는다!'),
  },
  parameters: {
    docs: {
      description: {
        component:
          '임무 등록|선택|완료를 마친 뒤 안내메시지를 보여주는 컴포넌트입니다',
      },
    },
  },
} as ComponentMeta<typeof Result>;

const Template: ComponentStory<typeof Result> = (args: ResultProps) => (
  <Result {...args} />
);

export const Create = Template.bind({});
Create.args = {
  missionStatus: 'create',
};
Create.parameters = {
  docs: {
    description: {
      story: '임무 등록 UI입니다.',
    },
  },
};

export const Update = Template.bind({});
Update.args = {
  missionStatus: 'update',
};
Update.parameters = {
  docs: {
    description: {
      story: '임무 선택 UI입니다.',
    },
  },
};

export const Complete = Template.bind({});
Complete.args = {
  missionStatus: 'complete',
};
Complete.parameters = {
  docs: {
    description: {
      story: '임무 완료 UI입니다.',
    },
  },
};
