import {
  useId,
  ReactElement,
  JSXElementConstructor,
  cloneElement,
} from 'react';
import styles from './Textarea.module.css';

interface IFieldProps {
  name: string;
  value: string;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export type TextareaProps = {
  /**
   * 어떤 textarea로 사용할 건지 양식을 선택하세요.<br>
   * useForm 훅의 매개변수로 넣은 initialValues의 key와 짝을 맞춰 넣어주세요.<br>
   * ex) initialValues가 { title: '', description: '' } 이면 현재 사용하는 Textarea컴포넌트가 어떤 Textarea인지에 따라 title 혹은 description를 넣어주세요.<br>
   */
  name: string;

  className?: string;

  placeholder?: string;
  /**
   * label의 value로 사용될 값입니다. 접근성을 준수하기 위해 필수 속성으로 지정하였습니다.
   */
  labelText: string;
  /**
   * label요소를 시각적으로 숨길지 결정합니다. 기본값은 false입니다.
   */
  hiddenLabel?: boolean;
  /**
   * getFieldProps 함수를 통해서 Textarea 컴포넌트에 기본적으로 필요한 요소들을 설정합니다. <br>
   * useForm 사용시 return 값인 getFieldProps을 props로 내려줍니다. <br>
   * getFieldProps(name)의 return은 값은 name, value, onBlur, onChange입니다. <br>
   * name : Textarea의 name <br>
   * value : Textarea의 value <br>
   * onBlur : onBlur 이벤트 발생시 호출되는 함수 <br>
   * onChange : onChange 이벤트 발생시 호출되는 함수
   */
  getFieldProps?: (name: string) => IFieldProps;
  children?: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const Textarea = ({
  name,
  className,
  labelText,
  hiddenLabel,
  getFieldProps,
  children,
  ...props
}: TextareaProps) => {
  const textareaId = useId();
  if (!getFieldProps) return null;
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <label
        className={`${styles.label} ${hiddenLabel ? 'srOnly' : ''}`}
        htmlFor={textareaId}
      >
        {labelText}
      </label>
      <textarea
        className={styles.Textarea}
        id={textareaId}
        {...props}
        {...getFieldProps(name)}
      />
      {children ? cloneElement(children, { name }) : null}
    </div>
  );
};

Textarea.defaultProps = {
  hiddenLabel: false,
};
