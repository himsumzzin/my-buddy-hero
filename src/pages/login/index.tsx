import { Input, Button } from '@/components/common';
import styles from './login.module.css';
import Link from 'next/link';

export default function login() {
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
            className={styles.input}
          ></Input>
          <Input
            name="password"
            size="lg"
            labelText="비밀번호"
            validText="올바른 비밀번호를 입력해주세요"
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
