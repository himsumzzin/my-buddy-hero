import styles from './Input.module.css';
import { useState, useId } from 'react';

export type InputProps = {
  /**
   * 어떤 인풋으로 사용할건지 양식을 선택하세요.
   *
   */
  name: 'id' | 'password' | 'mission' | 'herocode' | 'confirm' | 'register';
  /**
   * 사용할 인풋의 크기를 선택해주세요 <br>
   * 기본 크기는 lg 사이즈이고 sm, md 사이즈 인풋을 선택할 수 있습니다.
   */
  size: 'sm' | 'md' | 'lg';
  /**
   * 인풋에 미리 보여질 텍스트를 입력해주세요 <br>
   * ex) placeholder에 적을 단어를 적으면 됨
   */
  labelText: string;
  /**
   * 인풋의 유효성 검사 후 띄울 에러메세지를 입력해주세요.
   */
  validText: string;
  /**
   * 인풋 밸류 스테이트
   */
  inputVal: string;
  /**
   * 인풋 밸류 스테이트 핸들러
   */
  handler: (value: string) => void;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
  restProps?: unknown[];
};

export const Input = ({
  name,
  size,
  labelText,
  validText,
  inputVal,
  handler,
  className,
  ...restProps
}: InputProps) => {
  const [valid, setValid] = useState(true);

  const inputId = useId();

  const validateInput = (inputVal: string) => {
    const validationRegex = {
      id: /^[a-z]+[a-z0-9]{5,19}$/g,
      password:
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
      confirm: /.*/g,
      mission: /.*/g,
      herocode: /^[0-9]{3,4}$/g,
      register: /.*/g,
    };
    setValid(validationRegex[name].test(inputVal));
  };

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <input
        id={inputId}
        name={name}
        type={name === 'password' || name === 'confirm' ? 'password' : 'text'}
        className={`${styles.lgInput} ${styles[size]}`}
        required
        autoComplete="false"
        onChange={(e) => {
          handler(e.target.value);
          validateInput(inputVal);
        }}
        value={inputVal}
        maxLength={name === 'herocode' ? 4 : 40}
        {...restProps}
      />
      <label
        htmlFor={inputId}
        className={`${styles.lgLabel} ${
          size === 'sm' ? styles.smLabel : size === 'md' ? styles.mdLabel : ''
        }`}
      >
        {labelText}
      </label>
      <p className={`${valid ? styles.noError : styles.error}`}>{validText}</p>
    </div>
  );
};

Input.defaultProps = {
  validText: '',
};
