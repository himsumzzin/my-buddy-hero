import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Nav, NavProps } from './Nav';
// import styles from './Link.module.css';

export default {
  title: 'Components/Common/Nav',
  component: Nav,
  parameters: {
    docs: {
      description: {
        component: `
          사이트 내부에서 이동하는 Nav 컴포넌트입니다
        `,
      },
    },
  },
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args: NavProps) => (
  <Nav {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttonName: '기본 버튼',
};

export const HeroListSelectedNav = Template.bind({});
HeroListSelectedNav.args = {
  buttonName: '히어로 등록',
  currentPage: '/herolist',
};
export const MissionListSelectedNav = Template.bind({});
MissionListSelectedNav.args = {
  buttonName: '임무 등록',
  currentPage: '/missionlist',
};
