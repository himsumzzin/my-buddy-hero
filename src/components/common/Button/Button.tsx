import styles from './Button.module.css';

export type ButtonProps = {
  /**
   *버튼의 size 는 sm, md, lg 크기별로 prop을 내려주어 사용할 수 있습니다.
   */
  size: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * children 에는 로그인, 가입 등 버튼 내부의 텍스트를 적어줄 수 있습니다.
   */
  children: React.ReactNode;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
  /**
   * 나머지 버튼의 기본 속성 name, type, disabled 등이 올 수 있고,
   * onTouch 이벤트가 올 수 있습니다.
   */
  restProps?: unknown[];
};

export const Button = ({
  size,
  children,
  className,
  ...restProps
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};
