import { Input, Button } from '@/components/common';
import { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';

export default function login() {
  const [Id, setId] = useState({
    value: '',
    isDirty: false,
    isValid: true,
  });
  const [Password, setPassword] = useState({
    value: '',
    isDirty: false,
    isValid: true,
  });

  const validateInput = (name: string, value: string) => {
    const validationRegex: any = {
      id: /^[a-z]+[a-z0-9]{5,19}$/g,
      password:
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
      confirm: /.*/g,
      mission: /.*/g,
      herocode: /^[0-9]{3,4}$/g,
      register: /.*/g,
    };

    return validationRegex[name].test(value);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>로그인</h1>
        <form action="" className={styles.form}>
          <Input
            name="id"
            size="lg"
            labelText="아이디"
            validText="올바른 아이디를 입력해주세요"
            value={Id.value}
            isValid={Id.isValid}
            onChange={(e) => {
              const { value } = e.target;
              setId({
                value,
                isDirty: true,
                isValid: validateInput('id', value),
              });
            }}
            className={styles.input}
          ></Input>
          <Input
            name="password"
            size="lg"
            labelText="비밀번호"
            validText="올바른 비밀번호를 입력해주세요"
            value={Password.value}
            isValid={Password.isValid}
            onChange={(e) => {
              const { value } = e.target;
              setPassword({
                value,
                isDirty: true,
                isValid: validateInput('password', value),
              });
            }}
            className={styles.input}
          ></Input>
          <Button size="lg" className={styles.button}>
            로그인
          </Button>
        </form>
        <p className={styles.signupGuide}>
          아직 회원이 아니시라면?{' '}
          <Link href={'../signup'} className={styles.signupLink}>
            {' '}
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
}
