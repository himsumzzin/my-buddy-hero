import styles from './Button.module.css';

export type ButtonProps = {
  /**
   *버튼의 size 는 sm, md, lg 크기별로 prop을 내려주어 사용할 수 있습니다.
   */
  size: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * children 에는 로그인, 가입 등 버튼 내부의 텍스트를 적어줄 수 있습니다.
   */
  children?: React.ReactNode;
  /**
   * 버튼의 onClick 이벤트를 줄 수 있습니다.
   */
  onClick?: (props: any) => any;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
  /**
   * 문자열로 disabled를 주면 버튼이 비활성화 됩니다.
   */
  disabled?: boolean;
  /**
   * 나머지 버튼의 기본 속성 name, type, disabled 등이 올 수 있고,
   * onTouch 이벤트가 올 수 있습니다.
   */
  [key: string]: unknown;
};

export const Button = ({
  size,
  children,
  onClick,
  className,
  disabled,
  ...restprops
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...restprops}
    >
      {children}
    </button>
  );
};
