import { Input, InputProps } from '@/components/common';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `
                입력받을 수 있는 input 박스 입니다. 
            `,
      },
    },
  },
};

const Template = (args: InputProps) => {
  return <Input {...args} />;
};

export const IdInput = Template.bind({});
IdInput.args = {
  name: 'id',
  size: 'lg',
  labelText: '아이디',
  validText: '영문자로 시작하는 영문자 또는 숫자 6~20자 아이디를 입력하세요 ',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  name: 'password',
  size: 'lg',
  labelText: '비밀번호',
  validText: '영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력하세요',
};

export const ConfirmPasswordInput = Template.bind({});
ConfirmPasswordInput.args = {
  name: 'confirm',
  size: 'lg',
  labelText: '비밀번호확인',
  validText: '패스워드가 다릅니다',
};

export const MissionInput = Template.bind({});
MissionInput.args = {
  name: 'mission',
  size: 'md',
  labelText: '어떤 임무인가요?',
};

export const HeroNumberInput = Template.bind({});
HeroNumberInput.args = {
  name: 'herocode',
  size: 'sm',
  labelText: '히어로 넘버',
  validText: '숫자 4자리로 입력해주세요!',
};

export const HeroRegisterInput = Template.bind({});
HeroRegisterInput.args = {
  name: 'herocode',
  size: 'lg',
  labelText: '히어로 넘버를 입력해주세요. 쉿, 비밀~',
  validText: '숫자 4자리로 입력해주세요!',
};
