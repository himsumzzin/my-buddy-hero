import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HeroItem, HeroItemProps } from './HeroItem';
import { initialHero } from '@/states';

export default {
  title: 'Components/missionlist/HeroItem',
  component: HeroItem,
  args: {
    hero: {
      ...initialHero,
      id: '1',
      profileImage: '/images/hero1.png',
      name: '김현진',
      title: '휴지맨',
    },
    size: 'sm',
    bgColor: 'main',
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

export const Default = Template.bind({});
