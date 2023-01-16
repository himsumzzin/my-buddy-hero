import { Link, Title } from '@/components/common';
import Image from 'next/image';
import styles from './ErrorPage.module.css';

export interface ErrorPageProps {
  title: string;
  description: string;
  redirectTo: string;
  redirectText: string;
}

export const ErrorPage = ({
  title,
  description,
  redirectTo,
  redirectText,
}: ErrorPageProps) => {
  return (
    <section className={styles.container}>
      <Title lv={1} className={styles.title}>
        {title}
      </Title>
      <Image
        src="/images/icons/logo-512x512.png"
        alt="로고 이미지"
        width={400}
        height={400}
        className={styles.image}
      />
      <p className={styles.description}>{description}</p>
      <Link href={redirectTo} size="lg" className={styles.link}>
        {redirectText}
      </Link>
    </section>
  );
};
