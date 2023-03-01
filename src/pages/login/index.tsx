/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Form,
  Input,
  ValidationErrorMessage,
  ErrorMessage,
  Title,
  Slide,
  PWAInstallButton,
  Button,
} from '@/components/common';
import { useForm } from '@/hooks';
import styles from '@styles/Login.module.css';

export default function Signin() {
  const router = useRouter();
  const [serverError, setServerError] = useState({ id: '', message: '' });
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
      setServerError({ id: '', message: '' });
      return errors;
    },
    onSubmit: async (values) => {
      const response = await signIn('credentials', {
        redirect: false,
        id: values.id,
        password: values.password,
      });
      if (response?.error) {
        switch (response.error) {
          case 'no-id':
            setServerError(() => ({
              id: 'no-id',
              message: '존재하지 않는 아이디입니다',
            }));
            break;
          case 'wrong-id':
            setServerError(() => ({
              id: 'wrong-id',
              message: '비밀번호가 틀렸습니다',
            }));
            break;
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <Slide direction="left" className={styles.container}>
        <Title className={styles.title}>로그인</Title>
        <Form
          description={'로그인'}
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
          />
          <ValidationErrorMessage
            name="id"
            touched={touched}
            errors={errors}
            className={styles.serverErrorMsg}
          ></ValidationErrorMessage>
          <ErrorMessage
            error={serverError.id === 'no-id' ? serverError.message : ''}
            className={styles.serverErrorMsg}
          />
          <Input
            type="password"
            name="password"
            size="lg"
            labelText="비밀번호 :"
            border="round"
            getFieldProps={getFieldProps}
          />
          <ValidationErrorMessage
            name="password"
            touched={touched}
            errors={errors}
            className={styles.serverErrorMsg}
          ></ValidationErrorMessage>
          <ErrorMessage
            error={serverError.id === 'wrong-id' ? serverError.message : ''}
            className={styles.serverErrorMsg}
          ></ErrorMessage>
          <Button size="lg" disabled={!isValid()}>
            로그인
          </Button>
        </Form>
        <PWAInstallButton />
        <ul className={styles.signinGuideList}>
          <li className={styles.signinNav}>
            <span className={styles.signinGuide}>아직 회원이 아니시라면?</span>
            <Link href="/signup" legacyBehavior>
              <a className={styles.signinLink}>{'회원가입'}</a>
            </Link>
          </li>
          <li className={styles.adminLink}>
            <Link href="/adminlogin" legacyBehavior>
              <a className={styles.signinLink}>{'관리자 페이지'}</a>
            </Link>
          </li>
        </ul>
      </Slide>
    </>
  );
}
Signin.auth = {
  entrance: 'notLoggedIn',
  redirection: '/herolist', // redirect to this url
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
