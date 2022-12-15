/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/Auth';
import { Title } from '@/components/common';
import styles from './login.module.css';
import Link from 'next/link';
import router from 'next/router';
import { signIn } from 'next-auth/react';

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
      labelText: '비번번호 :',
      regex:
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    },
  };

  const handleSubmit = async () => {
    const response = await signIn('credentials', {
      redirect: false, // 로그인 실패시 페이지 이동을 방지하기 위해 redirect: false
      id: inputValue.id.value,
      password: inputValue.password.value,
    });

    if (!response?.error) {
      router.replace('/register');
    } else {
      console.log(response);
      switch (response.error) {
        case 'no-id':
          setServerError(() => ({
            id: 'id',
            message: '존재하지 않는 아이디입니다',
          }));
          break;
        case 'wrong-id':
          setServerError(() => ({
            id: 'password',
            message: '비밀번호가 틀렸습니다',
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
      <Title className={styles.title}>로그인</Title>
      <AuthForm
        inputValue={inputValue}
        formInfo={formInfo}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        serverError={serverError}
        className={styles.signinGap}
      ></AuthForm>
      <p className={styles.signinNav}>
        <span className={styles.signinGuide}>아직 회원이 아니시라면?</span>
        <Link href="/signup" legacyBehavior>
          <a className={styles.signinLink}>{'회원가입'}</a>
        </Link>
      </p>
    </div>
  );
}
