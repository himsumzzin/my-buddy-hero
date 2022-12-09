import { HeroCard, HeroCardProps } from '@/components/common';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/HeroCard',
  component: HeroCard,
  parameters: {
    docs: {
      description: {
        component: `
                히어로 리스트에 사용 될 히어로카드 입니다. 
            `,
      },
    },
  },
} as ComponentMeta<typeof HeroCard>;

const Template: ComponentStory<typeof HeroCard> = (args: HeroCardProps) => {
  return <HeroCard {...args} />;
};

export const DefaultHeroCard = Template.bind({});
DefaultHeroCard.args = {};
