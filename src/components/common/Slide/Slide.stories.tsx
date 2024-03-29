import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Slide, SlideProps } from './Slide';
import { HeroCard } from '@/components/common';
import { initialHero } from '@/states';

export default {
  title: 'Components/Common/Slide',
  component: Slide,
  args: {
    children: <HeroCard hero={initialHero} />,
  },
  parameters: {
    docs: {
      description: {
        component:
          '컴포넌트에 슬라이드 애니메이션을 적용시키는 래퍼 컴포넌트입니다',
      },
    },
  },
} as ComponentMeta<typeof Slide>;

const Template: ComponentStory<typeof Slide> = (args: SlideProps) => (
  <Slide {...args} />
);

export const Default = Template.bind({});
Default.args = {};
