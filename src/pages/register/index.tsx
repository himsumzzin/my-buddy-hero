import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { Register } from '@/components/Register';

export default function HeroRegister() {
  return (
    <>
      <Head>
        <title>내 짝꿍 히어로</title>
      </Head>
      <AnimatePresence>
        <Register />
      </AnimatePresence>
    </>
  );
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
    props: { session },
  };
};
