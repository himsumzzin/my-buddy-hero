import styles from './ErrorMessage.module.css';

export type ErrorMessageProps = {
  /**
   * 에러메세지를 나타냅니다. <br>
   * string으로 넣어주면 됩니다.
   */
  error: string;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
};

export function ErrorMessage({ error, className }: ErrorMessageProps) {
  return error !== '' ? (
    <p className={`${styles.error} ${className}`}>{error}</p>
  ) : null;
}
