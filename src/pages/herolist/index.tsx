import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Nav, HeroCard, Slide } from '@/components/common';
import styles from '@styles/Herolist.module.css';
import { useGetHeroList } from '@/apis/heroList';
import { BeatLoader } from 'react-spinners';

export default function Herolist() {
  const router = useRouter();
  const groupId = '1';
  const { data: heroList } = useGetHeroList(groupId);

  if (heroList === undefined) {
    return <BeatLoader />;
  }

  return (
    <>
      <Head>
        <title>멋진 히어로들을 확인하세요!</title>
      </Head>
      <div className={styles.container}>
        <Nav linkTo="hero" currentPage={router?.asPath} />
        <Slide direction="right">
          <ul className={styles.listContainer}>
            {heroList.map((hero) => (
              <li key={hero.id}>
                <HeroCard hero={hero}></HeroCard>
              </li>
            ))}
          </ul>
        </Slide>
      </div>
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
