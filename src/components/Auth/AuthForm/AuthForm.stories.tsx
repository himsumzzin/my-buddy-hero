import { AuthForm, AuthFormProps } from '@/components/Auth';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Auth/AuthForm',
  component: AuthForm,
  parameters: {
    docs: {
      description: {
        component: `
                입력받을 수 있는 form 박스 입니다. 
            `,
      },
    },
  },
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args: AuthFormProps) => {
  return <AuthForm {...args} />;
};

export const SignupForm = Template.bind({});
SignupForm.args = {
  inputValue: {},
  formInfo: {
    id: {
      id: 'id',
      type: 'text',
      errMsg: '형식에 맞는 id를 입력해주세요',
      labelText: 'id 입력!!',
      regex: /^[a-z]+[a-z0-9]{5,19}$/,
    },
    password: {
      id: 'password',
      type: 'password',
      errMsg: '형식에 맞는 password를 입력해주세요',
      labelText: 'password 입력!!',
      regex: /^[a-z]+[a-z0-9]{5,19}$/,
    },
    passwordCheck: {
      id: 'passwordCheck',
      type: 'password',
      errMsg: 'password가 다릅니다.',
      labelText: 'password 확인!!',
      check: 'password',
    },
  },
  handleSubmit: () => {
    console.log('회원가입!!');
  },
  className: 'signup',
};

export const SigninForm = Template.bind({});
SigninForm.args = {
  inputValue: {},
  formInfo: {
    id: {
      id: 'id',
      type: 'text',
      errMsg: '형식에 맞는 id를 입력해주세요',
      labelText: 'id 입력!!',
      regex: /^[a-z]+[a-z0-9]{5,19}$/,
    },
    password: {
      id: 'password',
      type: 'password',
      errMsg: '형식에 맞는 password를 입력해주세요',
      labelText: 'password 입력!!',
      regex: /^[a-z]+[a-z0-9]{5,19}$/,
    },
  },
  handleSubmit: () => {
    console.log('로그인!!');
  },
  className: 'signin',
};
