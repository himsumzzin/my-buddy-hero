import { HeroCard, HeroCardProps } from '@/components/common';

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
};

const Template = (args: HeroCardProps) => {
  return <HeroCard {...args} />;
};

export const DefaultHeroCard = Template.bind({});
HeroCard.args = {};
