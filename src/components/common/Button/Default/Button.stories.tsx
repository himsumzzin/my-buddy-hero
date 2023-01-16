import { Button, ButtonProps } from '@/components/common';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Common/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
                버튼의 크기를 세 가지 종류로 사용할 수 있는 컴포넌트 입니다.
            `,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => {
  return <Button size={args.size}>{args.children}</Button>;
};

export const XSmallButton = Template.bind({});
XSmallButton.args = {
  size: 'xs',
  children: 'X',
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  size: 'sm',
  children: '등록',
};

export const MediumButton = Template.bind({});
MediumButton.args = {
  size: 'md',
  children: '임무 등록',
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  size: 'lg',
  children: '로그인',
};
