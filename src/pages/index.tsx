import Herolist from '@/pages/herolist';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return <div className={styles.container}></div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/herolist',
      permanent: false,
    },
  };
};
