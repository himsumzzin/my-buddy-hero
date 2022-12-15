import styles from './AuthInput.module.css';
import { ChangeEvent } from 'react';

export type AuthInputProps = {
  /**
   * 어떤 인풋으로 사용할건지 양식을 선택하세요.<br>
   * 인풋을 식별할 수 있는 고유 id를 자유롭게 설정해주세요
   */
  id: string;

  /**
   * 인풋의 타입을 입력해주세요 <br>
   * ex) text, password, email 등
   */
  type: string;

  /**
   * 사용할 인풋의 크기를 선택해주세요 <br>
   * 기본 크기는 lg 사이즈이고 sm, md 사이즈 인풋을 선택할 수 있습니다.
   */
  size: 'sm' | 'md' | 'lg';

  /**
   * 인풋에 미리 보여질 텍스트를 입력해주세요 <br>
   * ex) placeholder에 적을 단어를 적으면 됩니다.
   */
  labelText: string;

  /**
   * 인풋의 value를 설정해주세요 <br>
   * input value state를 외부에서 관리합니다. <br>
   * value의 값은 input의 value 프로퍼티 값으로 들어갑니다.
   */
  value: string;

  /**
   * onChange 이벤트의 동작을 설정해주세요 onChange 이벤트 발생시 실행됩니다. <br>
   * 인풋 컴포넌트 외부에서 input value state를 관리할 수 있도록 input value state를 변경하는 로직을 넣어줍니다. <br>
   * 첫번째 매개변수에는 앞서 설정한 id props가 들어가고
   * 두번째 매개변수에는 input의 value값이 들어갑니다. <br>
   * 이 함수에 input value state를 변경하는 로직이 들어가야 input에 입력이 가능합니다.
   */
  handleChange: (id: string, value: string) => void;

  /**
   * 인풋의 최대 길이를 설정해주세요 <br>
   * 기본값은 40입니다.
   * ex) 4
   */
  maxLength?: number;

  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
  restProps?: unknown[];

  /**
   * 에러메세지를 children으로 받아옵니다.
   */
  children: React.ReactNode;
};

export const AuthInput = ({
  id,
  type,
  size,
  labelText,
  value,
  handleChange,
  maxLength,
  className,
  children,
  ...restProps
}: AuthInputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.value);
  };
  console.log(restProps);
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <input
        id={id}
        type={type}
        className={`${styles.lgInput} ${styles[size]} ${className ?? ''}`}
        autoComplete="false"
        value={value}
        onChange={onChange}
        maxLength={maxLength ?? 40}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={`${styles.lgLabel} ${size !== 'lg' ? 'srOnly' : ''} ${
          value ? styles.top : ''
        }`}
      >
        {labelText}
      </label>
      {children}
    </div>
  );
};
