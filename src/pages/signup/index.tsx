import { useState } from 'react';
import { Input, Button } from '@/components/common';
import styles from './signup.module.css';
import Link from 'next/link';

export default function Login() {
  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Herocode, setHerocode] = useState('');

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
            inputVal={Id}
            handler={setId}
            className={styles.input}
          ></Input>
          <Input
            name="password"
            size="lg"
            labelText="비밀번호"
            validText="올바른 비밀번호를 입력해주세요"
            inputVal={Password}
            handler={setPassword}
            className={styles.input}
          ></Input>
          <Input
            name="confirm"
            size="lg"
            labelText="비밀번호확인"
            validText="올바른 비밀번호를 입력해주세요"
            inputVal={ConfirmPassword}
            handler={setConfirmPassword}
            className={styles.input}
          ></Input>
          <Input
            name="herocode"
            size="lg"
            labelText="히어로 코드"
            validText="4자리 숫자를 입력해주세요"
            inputVal={Herocode}
            handler={setHerocode}
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
