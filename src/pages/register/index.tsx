import { Register } from '@/components/Register';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function HeroRegister() {
  return <Register></Register>;
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
