import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ErrorPage, ErrorPageProps } from './ErrorPage';

export default {
  title: 'pages/ErrorPage',
  component: ErrorPage,
  args: {
    title: '에러 페이지',
    description: '에러 설명',
    redirectTo: '/',
    redirectText: '링크 텍스트',
  },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args: ErrorPageProps) => (
  <ErrorPage {...args} />
);

export const Default = Template.bind({});
