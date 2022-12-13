import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HeroItem, HeroItemProps } from './HeroItem';

export default {
  title: 'Components/missionCard/HeroItem',
  component: HeroItem,
  args: {
    id: '1',
    profileImage: '/images/hero1.png',
    name: '김현진',
    code: '휴지맨',
  },
  parameters: {
    docs: {
      description: {
        component: '히어로 리스트의 아이템으로 사용되는 컴포넌트입니다',
      },
    },
  },
} as ComponentMeta<typeof HeroItem>;

const Template: ComponentStory<typeof HeroItem> = (args: HeroItemProps) => (
  <HeroItem {...args} />
);

export const Available = Template.bind({});
Available.args = {
  isSelected: false,
  isReceiver: false,
};
Available.parameters = {
  docs: {
    description: {
      story: '선택 가능한 상태의 UI입니다.',
    },
  },
};

export const Selected = Template.bind({});
Selected.args = {
  isSelected: true,
  isReceiver: false,
};
Selected.parameters = {
  docs: {
    description: {
      story: '현재 선택된 상태의 UI입니다.',
    },
  },
};

export const Inavailable = Template.bind({});
Inavailable.args = {
  isSelected: false,
  isReceiver: true,
};
Inavailable.parameters = {
  docs: {
    description: {
      story:
        '선택 불가능한 상태의 UI입니다. 이미 미션을 수행중인 히어로가 해당됩니다',
    },
  },
};
