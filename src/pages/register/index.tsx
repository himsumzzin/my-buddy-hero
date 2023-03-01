import { GetStaticProps } from 'next';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { Register } from '@/components/Register';

export default function HeroRegister() {
  return (
    <>
      <Head>
        <title>나만의 히어로를 만들어보세요</title>
      </Head>
      <AnimatePresence>
        <Register />
      </AnimatePresence>
    </>
  );
}
HeroRegister.auth = {
  entrance: 'loggedIn',
  redirection: '/login', // redirect to this url
};
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
