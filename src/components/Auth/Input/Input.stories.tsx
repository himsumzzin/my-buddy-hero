import { Input, InputProps, ErrorMessage } from '@/components/Auth';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from '@/hooks';

export default {
  title: 'Components/Auth/Input',
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
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => {
  const { errors, touched, getFieldProps } = useForm({
    initialValues: {
      id: '',
      password: '',
      pwcheck: '',
      missiontitle: '',
      missionheadcount: '',
      herocode: '',
      heroname: '',
    },
    validate: (values) => {
      const errors = {
        id: '',
        password: '',
        pwcheck: '',
        missiontitle: '',
        missionheadcount: '',
        herocode: '',
        heroname: '',
      };
      if (!/^[a-z0-9]{5,19}$/.test(values.id)) {
        errors.id = '영어, 숫자 조합 5~19 글자 입력해주세요.';
      }
      if (
        !/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
          values.password
        )
      ) {
        errors.password = '영어, 숫자, 특수기호 8~16 글자 입력해주세요.';
      }
      if (values.password !== values.pwcheck) {
        errors.pwcheck = '비밀번호와 일치하지 않습니다.';
      }
      if (
        !/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s`~!@#$%^&*()-_=+]{2,10}$/.test(
          values.missiontitle
        )
      ) {
        errors.missiontitle = '미션 제목을 2 ~ 10 글자 입력해주세요.';
      }
      if (!/^[0-9]+$/.test(values.missionheadcount)) {
        errors.missionheadcount = '숫자를 입력해주세요.';
      }
      if (!/^[0-9]{3,4}$/.test(values.herocode)) {
        errors.herocode = '히어로 코드 숫자 3 - 4 글자를 입력해주세요.';
      }
      if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,5}$/.test(values.heroname)) {
        errors.heroname =
          '히어로 이름을 한글, 영어, 숫자 1 - 5 글자 입력해주세요.';
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <Input getFieldProps={getFieldProps} {...args}>
      <ErrorMessage touched={touched} errors={errors}></ErrorMessage>
    </Input>
  );
};

export const IdInputWithErrorMsg = Template.bind({});
IdInputWithErrorMsg.args = {
  type: 'text',
  name: 'id',
  size: 'lg',
  labelText: '아이디 :',
  border: 'round',
};

export const PasswordWithErrorMsg = Template.bind({});
PasswordWithErrorMsg.args = {
  type: 'password',
  name: 'password',
  size: 'lg',
  labelText: '비밀번호 :',
  border: 'round',
};

export const ConfirmPasswordWithErrorMsg = Template.bind({});
ConfirmPasswordWithErrorMsg.args = {
  type: 'password',
  name: 'pwcheck',
  size: 'lg',
  labelText: '비밀번호 확인 :',
  border: 'round',
};

export const MissionTitleInput = Template.bind({});
MissionTitleInput.args = {
  type: 'text',
  name: 'missiontitle',
  size: 'lg',
  labelText: '어떤 임무인가요?',
  placeholder: '어떤 임무인가요?',
  border: 'rec',
};

export const MissionHeadcountInput = Template.bind({});
MissionHeadcountInput.args = {
  type: 'number',
  name: 'missionheadcount',
  size: 'sm',
  labelText: '몇 명이 필요한가요?',
  border: 'rec',
};

export const HeroNumberInput = Template.bind({});
HeroNumberInput.args = {
  type: 'text',
  name: 'herocode',
  size: 'md',
  labelText: '나의 히어로 코드',
  maxLength: 4,
  border: 'rec',
};

export const HeroNameInput = Template.bind({});
HeroNameInput.args = {
  type: 'text',
  name: 'heroname',
  size: 'lg',
  labelText: '어떤 히어로가 되고 싶은가요?',
  border: 'rec',
};
