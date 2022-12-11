import styles from './Input.module.css';
import { useId } from 'react';
import { useInput } from '@/hooks/useInput';
import { inputValidationRegex } from '@/utils';

export type InputProps = {
  /**
   * 어떤 인풋으로 사용할건지 양식을 선택하세요.<br>
   * 'id', 'password', 'mission', 'herocode', 'confirm', 'register' 종류가 있습니다<br>
   * 위의 종류에 해당하지 않는다면 name 에 주고싶은 값을 자유롭게 문자열로 입력하세요<br>
   * 자유롭게 입력한 문자열은 자동으로 인풋의 타입이 'text'로 지정됩니다.
   */
  name: string;
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
  validText?: string;
  /**
   * 인풋 밸류 스테이트 핸들러
   */
  /**
   * 초기값으로 사용될 value를 넣어주세요
   */
  initialValue: any;
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
  initialValue,
  className,
  ...restProps
}: InputProps) => {
  const inputId = useId();
  const { state, onChange } = useInput(initialValue);

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        id={inputId}
        name={name}
        type={name === 'password' || name === 'confirm' ? 'password' : 'text'}
        className={`${styles.lgInput} ${styles[size]} ${className}`}
        required
        autoComplete="false"
        onChange={onChange}
        value={state.value}
        pattern={
          inputValidationRegex[name] ? `${inputValidationRegex[name]}` : '.*'
        }
        maxLength={name === 'herocode' ? 4 : 40}
        {...restProps}
      />
      <label
        htmlFor={inputId}
        className={`${styles.lgLabel} ${size !== 'lg' ? 'srOnly' : ''}`}
      >
        {labelText}
      </label>
      {validText ? (
        <p className={`${state.isValid ? styles.noError : styles.error}`}>
          {validText}
        </p>
      ) : null}
    </div>
  );
};
