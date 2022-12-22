import '../../public/fonts/style.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from '@/components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
