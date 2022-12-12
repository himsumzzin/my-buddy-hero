import { Button } from '@/components/common';
import styles from './Photo.module.css';

export default function Photo() {
  return (
    <div className={styles.container}>
      <div className={styles.camera}>
        <p className={styles.cameraTitle}>히어로 사진찍기</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button size="md">다시 찍기</Button>
        <Button size="md">완료</Button>
      </div>
    </div>
  );
}
