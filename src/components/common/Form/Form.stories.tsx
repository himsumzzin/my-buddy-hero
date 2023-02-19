import {
  Form,
  FormProps,
  Input,
  Textarea,
  ValidationErrorMessage,
  ErrorMessage,
} from '@/components/common';
import { Button } from '@/components/common';
import styles from '@/styles/Login.module.css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from '@/hooks';
import { useState } from 'react';

export default {
  title: 'Components/common/Form',
  component: Form,
  parameters: {
    docs: {
      description: {
        component: `
              useForm 커스텀 훅을 활용한 Form 컴포넌트입니다.
            `,
      },
    },
  },
} as ComponentMeta<typeof Form>;

const LoginFailedTemplate: ComponentStory<typeof Form> = (args: FormProps) => {
  const [serverError, setServerError] = useState('');
  const { errors, touched, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: { id: '', password: '' },
    validate: (values) => {
      const errors = {
        id: '',
        password: '',
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
      setServerError('');
      return errors;
    },
    onSubmit: async (values) => {
      setServerError('로그인에 실패했습니다.');
    },
  });
  return (
    <Form
      description={'화원가입'}
      handleSubmit={handleSubmit}
      className={styles.signinGap}
    >
      <Input
        type="text"
        name="id"
        size="lg"
        labelText="아이디 :"
        border="round"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Input
        type="password"
        name="password"
        size="lg"
        labelText="비밀번호 :"
        border="round"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <ErrorMessage
        error={serverError}
        className={styles.serverErrorMsg}
      ></ErrorMessage>
      <Button size="lg" disabled={!isValid()}>
        로그인
      </Button>
    </Form>
  );
};

export const LoginFailedForm = LoginFailedTemplate.bind({});

const HeroRegisterTemplate: ComponentStory<typeof Form> = (args: FormProps) => {
  const { errors, touched, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: {
      heroname: '',
      herodescription: '',
      name: '',
      herocode: '',
    },
    validate: (values) => {
      const errors = {
        heroname: '',
        herodescription: '',
        name: '',
        herocode: '',
      };
      if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,5}$/.test(values.heroname)) {
        errors.heroname =
          '히어로 이름을 한글, 영어, 숫자 1 - 5 글자 입력해주세요.';
      }
      if (
        !/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s`~!@#$%^&*()-_=+]{4,20}$/.test(
          values.herodescription
        )
      ) {
        errors.herodescription = '영어, 숫자, 특수기호 8~16 글자 입력해주세요.';
      }
      if (values.name.length === 0) {
        errors.name = '이름을 입력해 주세요.';
      }
      if (!/^[0-9]{3,4}$/.test(values.herocode)) {
        errors.herocode = '숫자 3~4 글자 입력해 주세요.';
      }
      return errors;
    },
    onSubmit: async (values) => {
      alert('히어로 등록!');
    },
  });
  return (
    <Form
      description={'히어로 등록'}
      handleSubmit={handleSubmit}
      className={styles.signinGap}
    >
      <Input
        type="text"
        name="heroname"
        size="lg"
        labelText="어떤 히어로가 되고 싶은가요?"
        border="round"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Input
        type="text"
        name="herodescription"
        size="lg"
        labelText="히어로에 대해서 설명해 주세요!"
        border="round"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Input
        type="text"
        name="name"
        size="lg"
        labelText="이름을 입력해 주세요"
        border="round"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Input
        type="text"
        name="herocode"
        size="lg"
        labelText="히어로 넘버를 입력해 주세요~"
        border="round"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Button size="lg" disabled={!isValid()}>
        히어로로 변신!
      </Button>
    </Form>
  );
};

export const HeroRegisterForm = HeroRegisterTemplate.bind({});

const HeroCardSelectTemplate: ComponentStory<typeof Form> = (
  args: FormProps
) => {
  const [selectedHero, setSelectedHero] = useState('휴지 히어로');
  const { errors, touched, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: {
      herocode: '',
    },
    validate: (values) => {
      const errors = {
        herocode: '',
      };
      if (!/^[0-9]{3,4}$/.test(values.herocode)) {
        errors.herocode = '숫자 3~4 글자를 입력해 주세요.';
      }
      return errors;
    },
    onSubmit: async (values) => {
      alert('히어로 카드 선택!');
    },
  });
  const isAllValid = () => {
    return isValid() && selectedHero.length !== 0;
  };
  return (
    <Form
      description={'히어로 카드 선택'}
      handleSubmit={handleSubmit}
      className={styles.signinGap}
    >
      <Input
        type="text"
        name="herocode"
        size="md"
        labelText="히어로 코드"
        border="rec"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Button size="lg" disabled={!isAllValid()}>
        완료
      </Button>
    </Form>
  );
};

export const HeroCardSelectForm = HeroCardSelectTemplate.bind({});

const MissionRegisterTemplate: ComponentStory<typeof Form> = (
  args: FormProps
) => {
  const { errors, touched, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: {
      missiontitle: '',
      missionheadcount: '',
      missionDescription: '',
    },
    validate: (values) => {
      const errors = {
        missiontitle: '',
        missionheadcount: '',
        missionDescription: '',
      };
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
      if (values.missionDescription.length === 0) {
        errors.missionDescription = '임무를 상세히 입력해주세요.';
      }
      return errors;
    },
    onSubmit: async (values) => {
      alert('임무 등록!');
    },
  });

  return (
    <Form
      description={'히어로 카드 선택'}
      handleSubmit={handleSubmit}
      className={styles.signinGap}
    >
      <Input
        type="text"
        name="missiontitle"
        size="lg"
        labelText="미션 제목"
        placeholder="어떤 임무인가요?"
        border="rec"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Input
        type="number"
        name="missionheadcount"
        size="sm"
        labelText="몇 명이 필요한가요?"
        border="rec"
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Input>
      <Textarea
        name="missionDescription"
        placeholder="좀 더 자세히 설명해 주세요"
        labelText="미션 상세 설명"
        hiddenLabel={true}
        getFieldProps={getFieldProps}
      >
        <ValidationErrorMessage
          touched={touched}
          errors={errors}
        ></ValidationErrorMessage>
      </Textarea>
      <Button size="lg" disabled={!isValid()}>
        등록
      </Button>
    </Form>
  );
};

export const MissionRegisterForm = MissionRegisterTemplate.bind({});
