import { AuthInput, AuthInputProps } from '@/components/Auth';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Auth/AuthInput',
  component: AuthInput,
  parameters: {
    docs: {
      description: {
        component: `
                입력받을 수 있는 input 박스 입니다. 
            `,
      },
    },
  },
} as ComponentMeta<typeof AuthInput>;

const Template: ComponentStory<typeof AuthInput> = (args: AuthInputProps) => {
  return <AuthInput {...args} />;
};

export const IdInput = Template.bind({});
IdInput.args = {
  id: 'id',
  type: 'text',
  size: 'lg',
  labelText: '아이디',
  value: 'hi',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  id: 'password',
  type: 'password',
  size: 'lg',
  labelText: '비밀번호',
  value: 'hi',
};

export const ConfirmPasswordInput = Template.bind({});
ConfirmPasswordInput.args = {
  id: 'passwordCheck',
  type: 'password',
  size: 'lg',
  labelText: '비밀번호확인',
  value: 'hi',
};

export const MissionInput = Template.bind({});
MissionInput.args = {
  id: 'mission',
  type: 'text',
  size: 'md',
  labelText: '어떤 임무인가요?',
  value: 'hi',
};

export const HeroNumberInput = Template.bind({});
HeroNumberInput.args = {
  id: 'herocode',
  type: 'text',
  size: 'sm',
  labelText: '히어로 넘버',
  value: 'hi',
  maxLength: 4,
};

export const HeroRegisterInput = Template.bind({});
HeroRegisterInput.args = {
  id: 'herocode',
  type: 'text',
  size: 'lg',
  labelText: '히어로 넘버를 입력해주세요. 쉿, 비밀~',
  value: 'hi',
  maxLength: 4,
};
