import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link, LinkProps } from './Link';
// import styles from './Link.module.css';

export default {
  title: 'Components/Link',
  component: Link,
  args: {
    href: '/',
    // className: styles.Link,
    children: 'test',
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
console.dir(Link);

const Template: ComponentStory<typeof Link> = (args: LinkProps) => (
  <Link {...args} />
);

export const Default = Template.bind({});
