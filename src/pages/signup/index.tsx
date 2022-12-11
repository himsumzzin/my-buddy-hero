import { useState } from 'react';
import { Input, Button } from '@/components/common';
import styles from './signup.module.css';
import Link from 'next/link';

export default function Login() {
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
  const [Confirm, setConfirm] = useState({
    value: '',
    isDirty: false,
    isValid: true,
  });
  const [Herocode, setHerocode] = useState({
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
        <h1 className={styles.title}>회원가입</h1>
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
          <Input
            name="confirm"
            size="lg"
            labelText="비밀번호확인"
            validText="비밀번호와 일치하지 않습니다"
            value={Confirm.value}
            isValid={Confirm.isValid}
            onChange={(e) => {
              const { value } = e.target;
              setConfirm({
                value,
                isDirty: true,
                isValid: validateInput('confirm', value),
              });
            }}
            className={styles.input}
          ></Input>
          <Input
            name="herocode"
            size="lg"
            labelText="히어로 코드"
            validText="4자리 숫자를 입력해주세요"
            value={Herocode.value}
            isValid={Herocode.isValid}
            onChange={(e) => {
              const { value } = e.target;
              setHerocode({
                value,
                isDirty: true,
                isValid: validateInput('herocode', value),
              });
            }}
            className={styles.input}
          ></Input>
          <Button size="lg" className={styles.button}>
            가입
          </Button>
        </form>
        <p className={styles.signupGuide}>
          이미 회원이신가요?
          <Link href={'../login'} className={styles.signupLink}>
            로그인
          </Link>
        </p>
      </div>
    </>
  );
}
