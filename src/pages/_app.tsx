import '../../public/fonts/style.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from '@/components';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <SessionProvider session={pageProps.session}>
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
              />
            </Head>
            <Component {...pageProps} />
          </>
        </SessionProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
