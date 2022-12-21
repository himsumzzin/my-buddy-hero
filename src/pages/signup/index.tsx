/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/Auth';
import { Title } from '@/components/common';
import styles from './signup.module.css';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface IinputValue {
  [key: string]: { value: string; isDirty: boolean };
}

export default function Signup() {
  const [inputValue, setInputValue] = useState<IinputValue>({});
  const [serverError, setServerError] = useState({ id: '', message: '' });

  const formInfo = {
    id: {
      id: 'id',
      type: 'text',
      errMsg: '영어, 숫자 조합 5~19 글자 입력해주세요',
      labelText: '아이디 :',
      regex: /^[a-z0-9]{5,19}$/,
    },
    password: {
      id: 'password',
      type: 'password',
      errMsg: '영어, 숫자, 특수기호 8~16 글자 입력해주세요',
      labelText: '비밀번호 :',
      regex:
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    },
    passwordCheck: {
      id: 'passwordCheck',
      type: 'password',
      errMsg: '비밀번호와 일치하지 않습니다.',
      labelText: '비밀번호 확인 :',
      check: 'password',
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('api/auth/signup', {
        id: inputValue.id.value,
        password: inputValue.password.value,
      });
      if (response.data.body.success) router.replace('/login');
    } catch (error: any) {
      switch (error.response.data.body.type) {
        case 'id-duplication':
          setServerError(() => ({
            id: 'id',
            message: '이미 존재하는 아이디입니다',
          }));
          break;
        case 'signup-fail':
          setServerError(() => ({
            id: 'passwordCheck',
            message: '로그인에 실패하였습니다',
          }));
          break;
      }
    }
  };

  const handleChange = (id: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [id]: { value, isDirty: true },
    }));
    if (setServerError) setServerError({ id: '', message: '' });
  };
  // initiate state
  useEffect(() => {
    for (const key in formInfo) {
      setInputValue((prev) => ({
        ...prev,
        [key]: { value: '', isDirty: false },
      }));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Title className={styles.title}>회원가입</Title>
      <AuthForm
        inputValue={inputValue}
        formInfo={formInfo}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        serverError={serverError}
        className={styles.signupGap}
        buttonText="회원가입"
      ></AuthForm>
      <p className={styles.signupNav}>
        <span className={styles.signupGuide}>이미 회원이시라면?</span>
        <Link href="/login" legacyBehavior>
          <a className={styles.signupLink}>{'로그인'}</a>
        </Link>
      </p>
    </div>
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
