import styles from './Message.module.css';

export type MessageProps = {
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

export function Message({ error, className }: MessageProps) {
  return error !== '' ? (
    <p className={`${styles.error} ${className}`}>{error}</p>
  ) : null;
}
