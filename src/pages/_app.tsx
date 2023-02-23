import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from '@/components';
import '../../public/fonts/style.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
