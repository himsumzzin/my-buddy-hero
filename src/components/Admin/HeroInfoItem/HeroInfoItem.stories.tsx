import { HeroInfoItem, HeroInfoItemProps } from '@/components/Admin';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { initialHero } from '@/states';
export default {
  title: 'Components/Admin/HeroInfoItem',
  component: HeroInfoItem,
  args: {
    hero: {
      ...initialHero,
      id: '1',
      profileImage: '/images/hero2.png',
      name: '김현진',
      title: '나는야휴지맨',
      code: '1234',
      completeNumber: 25,
    },
    sequence: 1,
  },
  parameters: {
    docs: {
      description: {
        component: `
                관리자페이지의 히어로 블럭 컴포넌트입니다
            `,
      },
    },
  },
} as ComponentMeta<typeof HeroInfoItem>;
const Template: ComponentStory<typeof HeroInfoItem> = (
  args: HeroInfoItemProps
) => {
  return <HeroInfoItem {...args} />;
};
export const DefaultHeroInfoItem = Template.bind({});
