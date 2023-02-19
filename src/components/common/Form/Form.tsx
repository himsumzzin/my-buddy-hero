import { ReactNode } from 'react';
import styles from './Form.module.css';

export type FormProps = {
  /**
   * form 요소의 legend에 들어갈 설명을 입력합니다.
   */
  description: string;
  /**
   * onSubmit 이벤트 발생시 실행될 함수입니다.
   * useForm 훅의 리턴값인 handleSubmit를 props로 내려줍니다.
   */
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
  children: ReactNode;
};

export function Form({
  description,
  children,
  handleSubmit,
  className,
}: FormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={`${styles.formContainer} ${className ?? ''}`}>
        <legend className="sr-only">{description}</legend>
        {children}
      </fieldset>
    </form>
  );
}
