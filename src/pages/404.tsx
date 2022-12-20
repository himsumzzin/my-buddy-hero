import { Link, Title } from '@/components/common';
import Image from 'next/image';
import styles from './404.module.css';

export default function Custom404() {
  return (
    <section className={styles.container}>
      <Title lv={1} className={styles.title}>
        앗! 여기는 올바른 주소가 아니에요!
      </Title>
      <Image
        src="/images/icons/logo-512x512.png"
        alt="로고 이미지"
        width={400}
        height={400}
        className={styles.image}
      />
      <p className={styles.description}>
        주소가 잘못된 것 같아요. 다시 한 번 확인해주시겠어요?
      </p>
      <Link href="/" size="lg" className={styles.link}>
        메인 페이지로 돌아가기
      </Link>
    </section>
  );
}
