import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link, LinkProps } from './Link';
// import styles from './Link.module.css';

export default {
  title: 'Components/Link',
  component: Link,
  args: {
    href: '/',
  },
  parameters: {
    docs: {
      description: {
        component: `
          사이트 내부에서 이동하는 링크 컴포넌트입니다
        `,
      },
    },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args: LinkProps) => (
  <Link {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: '링크 컴포넌트 기본 모양',
};

export const SelectedNavLink = Template.bind({});
SelectedNavLink.args = {
  size: 'lg',
  children: '임무 목록',
  selected: true,
};
SelectedNavLink.parameters = {
  docs: {
    description: {
      story: '현재 페이지를 가리키는 링크',
    },
  },
};

export const DefaultNavLink = Template.bind({});
DefaultNavLink.args = {
  size: 'lg',
  children: '히어로 명단',
  selected: false,
};
DefaultNavLink.parameters = {
  docs: {
    description: {
      story: '현재 페이지를 제외한 나머지 페이지를 가리키는 링크',
    },
  },
};

export const HeroRegisterLink = Template.bind({});
HeroRegisterLink.args = {
  size: 'sm',
  children: '임무 수행하러 가기',
  selected: false,
};
