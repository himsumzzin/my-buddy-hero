import { Input, Button } from '@/components/common';
import { useState } from 'react';
import styles from './HeroRegister.module.css';

export const HeroRegister = (props: any) => {
  const { onSubmit } = props;

  interface CustomElements extends HTMLFormControlsCollection {
    herotitle: HTMLInputElement;
    herodescription: HTMLInputElement;
    heroname: HTMLInputElement;
    herocode: HTMLInputElement;
  }

  interface SummaryForm extends HTMLFormElement {
    readonly elements: CustomElements;
  }

  const handleSubmit = (e: React.FormEvent<SummaryForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    onSubmit({
      title: elements.herotitle.value,
      description: elements.herodescription.value,
      name: elements.heroname.value,
      code: +elements.herocode.value,
    });
  };

  const { title, description, code, name } = props.initialValue;

  return (
    <div className={`${styles.container}`}>
      <h1 className={styles.title}>히어로 등록</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="herotitle"
          size="lg"
          labelText="히어로 칭호를 입력해주세요"
          validText="히어로 칭호를 입력해주세요"
          initialValue={title}
          className={styles.input}
        ></Input>
        <Input
          name="herodescription"
          size="lg"
          labelText="히어로에 대해서 설명해주세요!"
          validText="히어로에 대한 설명을 입력해주세요"
          initialValue={description}
          className={styles.input}
        ></Input>
        <Input
          name="heroname"
          size="lg"
          labelText="이름을 입력해주세요"
          validText="이름을 입력하세요"
          initialValue={name}
          className={styles.input}
        ></Input>
        <Input
          name="herocode"
          size="lg"
          labelText="히어로 넘버를 입력하세요. 쉿! 비밀~"
          validText="4자리 숫자를 입력해주세요"
          initialValue={code}
          className={styles.input}
        ></Input>
        <Button size="lg" disabled={false} className={styles.button}>
          히어로로 변신하러 가기
        </Button>
      </form>
    </div>
  );
};
