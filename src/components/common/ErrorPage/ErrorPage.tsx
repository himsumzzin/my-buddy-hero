import { Link, Title } from '@/components/common';
import Image from 'next/image';
import styles from './ErrorPage.module.css';

export interface ErrorPageProps {
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
}

export const ErrorPage = ({
  title,
  description,
  linkTo,
  linkText,
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
      <Link href={linkTo} size="lg" className={styles.link}>
        {linkText}
      </Link>
    </section>
  );
};
