/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import { AxiosWithRetry } from '@/apis';
import {
  Form,
  Input,
  ValidationErrorMessage,
  ErrorMessage,
} from '@/components/Auth';
import { Title, Slide, Button } from '@/components/common';
import styles from './signup.module.css';
import { useForm } from '@/hooks';
import { useRouter } from 'next/router';

export default function Signup() {
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [serverError, setServerError] = useState({ id: '', message: '' });
  const { errors, touched, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: { id: '', password: '', pwcheck: '' },
    validate: (values) => {
      const errors = {
        id: '',
        password: '',
        pwcheck: '',
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
      setServerError({ id: '', message: '' });
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await AxiosWithRetry.post('api/auth/signup', {
          id: values.id,
          password: values.password,
        });
        if (response.data.body.success) router.replace('/login');
      } catch (error: any) {
        switch (error.response.data.body.type) {
          case 'id-duplication':
            setServerError(() => ({
              id: 'id-duplication',
              message: '이미 존재하는 아이디입니다',
            }));
            break;
          case 'signup-fail':
            setServerError(() => ({
              id: 'signup-fail',
              message: '로그인에 실패하였습니다',
            }));
            break;
        }
      }
    },
  });

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       // 로그인했으면 홈으로
  //       router.replace('/herolist');
  //     } else {
  //       // 로그인 안했으면 authform 보여줌
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <Slide direction="left" className={styles.container}>
        <Title className={styles.title}>회원가입</Title>
        <Form
          description={'회원가입'}
          handleSubmit={handleSubmit}
          className={styles.signupGap}
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
          <ErrorMessage
            error={
              serverError.id === 'id-duplication' ? serverError.message : ''
            }
            className={styles.serverErrorMsg}
          />
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
          <Input
            type="password"
            name="pwcheck"
            size="lg"
            labelText="비밀번호 확인 :"
            border="round"
            getFieldProps={getFieldProps}
          >
            <ValidationErrorMessage
              touched={touched}
              errors={errors}
            ></ValidationErrorMessage>
          </Input>
          <ErrorMessage
            error={serverError.id === 'signup-fail' ? serverError.message : ''}
            className={styles.serverErrorMsg}
          />
          <Button size="lg" disabled={!isValid()}>
            회원가입
          </Button>
        </Form>
        <p className={styles.signupNav}>
          <span className={styles.signupGuide}>이미 회원이시라면?</span>
          <Link href="/login" legacyBehavior>
            <a className={styles.signupLink}>{'로그인'}</a>
          </Link>
        </p>
      </Slide>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/herolist',
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
