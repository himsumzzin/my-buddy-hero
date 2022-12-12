import { Input, Button } from '@/components/common';
import styles from './Register.module.css';

export default function Register() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>히어로 등록</h1>
        <form action="" className={styles.form}>
          <Input
            name="herotitle"
            size="lg"
            labelText="히어로 칭호를 입력해주세요"
            validText="히어로 칭호를 입력해주세요"
            initialValue=""
            className={styles.input}
          ></Input>
          <Input
            name="herodescription"
            size="lg"
            labelText="히어로에 대해서 설명해주세요!"
            validText="히어로에 대한 설명을 입력해주세요"
            initialValue=""
            className={styles.input}
          ></Input>
          <Input
            name="heroname"
            size="lg"
            labelText="이름을 입력해주세요"
            validText="이름을 입력하세요"
            initialValue=""
            className={styles.input}
          ></Input>
          <Input
            name="herocode"
            size="lg"
            labelText="히어로 넘버를 입력하세요. 쉿! 비밀~"
            validText="4자리 숫자를 입력해주세요"
            initialValue=""
            className={styles.input}
          ></Input>
          <Button size="lg">히어로로 변신하러 가기</Button>
        </form>
      </div>
    </>
  );
}
