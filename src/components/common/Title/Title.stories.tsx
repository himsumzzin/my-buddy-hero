import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title, TitleProps } from './Title';

export default {
  title: 'Components/Title',
  component: Title,
  args: {
    lv: 2,
  },
  parameters: {
    docs: {
      description: {
        component: '공통 스타일을 적용한 Title 컴포넌트입니다',
      },
    },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args: TitleProps) => (
  <Title {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: '미션',
};
