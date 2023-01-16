import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Nav, HeroCard, Slide } from '@/components/common';
import { useHeroes, useMissions } from '@/hooks';
import styles from './herolist.module.css';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Herolist() {
  const router = useRouter();
  const { heroList, initHeroeList } = useHeroes();
  const { initMissionList } = useMissions();

  useEffect(() => {
    initHeroeList();
    initMissionList();
  }, []);

  return (
    <>
      <Head>
        <title>멋진 히어로들을 확인하세요!</title>
      </Head>
      <div className={styles.container}>
        <Nav
          buttonName="히어로 추가"
          onButtonClick={() => {
            router.replace('/register');
          }}
          currentPage={router?.asPath}
        />
        <Slide direction="right">
          <ul className={styles.listContainer}>
            {heroList &&
              heroList.map((hero) => (
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
