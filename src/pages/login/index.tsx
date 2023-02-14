/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Form,
  Input,
  ValidationErrorMessage,
  ErrorMessage,
} from '@/components/Auth';
import { Title, Slide, PWAInstallButton, Button } from '@/components/common';
import { useForm } from '@/hooks';
import styles from '@styles/Login.module.css';

export default function Signin() {
  // const [isLoading, setIsLoading] = useState(true);
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
      if (!response?.error) {
        router.replace('/herolist');
      } else {
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
          >
            <ValidationErrorMessage
              touched={touched}
              errors={errors}
            ></ValidationErrorMessage>
          </Input>
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
          >
            <ValidationErrorMessage
              touched={touched}
              errors={errors}
            ></ValidationErrorMessage>
          </Input>
          <ErrorMessage
            error={serverError.id === 'wrong-id' ? serverError.message : ''}
            className={styles.serverErrorMsg}
          ></ErrorMessage>
          <Button size="lg" disabled={!isValid()}>
            로그인
          </Button>
        </Form>
        <PWAInstallButton />
        <p className={styles.signinNav}>
          <span className={styles.signinGuide}>아직 회원이 아니시라면?</span>
          <Link href="/signup" legacyBehavior>
            <a className={styles.signinLink}>{'회원가입'}</a>
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
