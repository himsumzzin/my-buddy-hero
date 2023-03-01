import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from '@/components';
import Head from 'next/head';
import { NextComponentType, NextPageContext } from 'next';
import { AuthEnabledComponentConfig } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../../public/fonts/style.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

type AppAuthProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>;
};
interface IAuth {
  entrance:
    | 'notLoggedIn'
    | 'loggedIn'
    | 'sessionLoggedIn'
    | 'notSessionLoggedIn'
    | 'notEntered';
  redirection: string;
  secondRedirection?: string;
}
export default function App({ Component, pageProps }: AppAuthProps) {
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
              <Auth auth={Component.auth as IAuth}>
                <Component {...pageProps} />
              </Auth>
            </>
          </SessionProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}

export type AuthProps = {
  auth: IAuth;
  children: ReactNode;
};
function Auth({ auth, children }: AuthProps): any {
  const router = useRouter();
  const { status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  const adminId = sessionStorage.getItem('admin');
  switch (auth.entrance) {
    case 'notEntered':
      if (status === 'authenticated')
        router.replace(auth.redirection as string);
      else router.replace(auth.secondRedirection as string);
      break;
    case 'loggedIn':
      if (status === 'authenticated') return children;
      else router.replace(auth.redirection as string);
      break;
    case 'notLoggedIn':
      if (status === 'unauthenticated') return children;
      else router.replace(auth.redirection as string);
      break;
    case 'sessionLoggedIn':
      if (adminId) return children;
      else router.replace(auth.redirection as string);
      break;
    case 'notSessionLoggedIn':
      if (!adminId) return children;
      else router.replace(auth.redirection as string);
      break;
  }
}
