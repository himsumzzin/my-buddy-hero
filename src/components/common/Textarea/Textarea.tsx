import { useId } from 'react';
import styles from './Textarea.module.css';

export type TextareaProps = {
  /**
   * form 요소에서 Textarea 컴포넌트의 textarea 요소를 참조할 때 사용합니다.
   */
  name: string;
  placeholder?: string;
  /**
   * label의 value로 사용될 값입니다. 접근성을 준수하기 위해 필수 속성으로 지정하였습니다.
   */
  labelValue: string;
  /**
   * label요소를 시각적으로 숨길지 결정합니다. 기본값은 false입니다.
   */
  hiddenLabel: boolean;
  restProps?: unknown[];
};

export const Textarea = ({
  name,
  placeholder,
  labelValue,
  hiddenLabel,
  ...restProps
}: TextareaProps) => {
  const textareaId = useId();

  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${hiddenLabel ? 'srOnly' : ''}`}
        htmlFor={textareaId}
      >
        {labelValue}
      </label>
      <textarea
        className={styles.Textarea}
        name={name}
        id={textareaId}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
};

Textarea.defaultProps = {
  hiddenLabel: false,
};
