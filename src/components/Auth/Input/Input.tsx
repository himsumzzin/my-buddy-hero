import { cloneElement, ReactElement } from 'react';
import styles from './Input.module.css';
import { useId } from 'react';

interface IFieldProps {
  name: string;
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type InputProps = {
  /**
   * 어떤 인풋으로 사용할 건지 양식을 선택하세요.<br>
   * useForm 훅의 매개변수로 넣은 initialValues의 key와 짝을 맞춰 넣어주세요.<br>
   * ex) initialValues가 { id: '', password: '' } 이면 현재 사용하는 Input컴포넌트가 어떤 input인지에 따라 id 혹은 password를 넣어주세요.<br>
   */
  name: string;
  /**
   * input의 type을 설정해주세요.<br>
   * ex) text, password
   */
  type: string;
  /**
   * 사용할 인풋의 크기를 선택해주세요 <br>
   * lg <br>
   * - 가장 큰 input <br>
   * - placeholder 대용으로 label 사용 <br>
   * - lg일 때만 input이 focus되거나 value가 있을 경우 label 좌상단으로 이동 <br>
   * <br>
   *
   * md <br>
   * - 중간 사이즈 input (271px) <br>
   * - label 사용으로 placeholer 사용 안함 <br>
   * <br>
   *
   * sm <br>
   * - 작은 사이즈 input (200px) <br>
   * - label 사용으로 placeholer 사용 안함 <br>
   */
  size: 'sm' | 'md' | 'lg';
  /**
   * 인풋에 미리 보여질 텍스트를 입력해 주세요. <br>
   * placeholder가 존재할 경우 sr-only 처리됩니다. <br>
   * ex) placeholder에 적을 단어를 적으면 됩니다.
   */
  labelText: string;
  /**
   * Input 컴포넌트의 border-radius를 결정한다. <br>
   * rec : 8px <br>
   * round : 100px
   */
  border: 'rec' | 'round';
  /**
   * getFieldProps 함수를 통해서 Input 컴포넌트에 기본적으로 필요한 요소들을 설정합니다. <br>
   * useForm 사용시 return 값인 getFieldProps을 props로 내려줍니다. <br>
   * getFieldProps(name)의 return은 값은 name, value, onBlur, onChange입니다. <br>
   * name : input의 name <br>
   * value : input의 value <br>
   * onBlur : onBlur 이벤트 발생시 호출되는 함수 <br>
   * onChange : onChange 이벤트 발생시 호출되는 함수
   */
  getFieldProps?: (name: string) => IFieldProps;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
  /**
   * input의 maxLength를 설정 <br>
   * props를 지정해주지 않으면 default 값은 40입니다.
   */
  maxLength?: number;
  /**
   * input의 placeholder를 설정 <br>
   * placeholder가 있다면 label은 sr-only처리 됩니다.
   */
  placeholder?: string;
  children?: ReactElement<any>;
};

export function Input({
  name,
  size,
  labelText,
  getFieldProps,
  className,
  children,
  maxLength,
  placeholder,
  border,
  ...props
}: InputProps) {
  const inputId = useId();
  if (!getFieldProps) return null;
  const { value } = getFieldProps(name);

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        id={inputId}
        className={`${styles.input} ${styles[size]} ${styles[border]} ${className}`}
        autoComplete="false"
        maxLength={maxLength}
        placeholder={placeholder}
        min="1"
        {...props}
        {...getFieldProps(name)}
      />
      <label
        htmlFor={inputId}
        className={`${styles.label} ${placeholder ? 'srOnly' : ''} ${
          size === 'lg' && value ? styles.top : ''
        }`}
      >
        {labelText}
      </label>
      {children ? cloneElement(children, { name }) : null}
    </div>
  );
}
Input.defaultProps = { maxLength: 40 };
