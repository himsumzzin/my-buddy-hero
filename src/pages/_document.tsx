import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko-KR">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        {/* Primary Meta Tags */}
        <meta name="keywords" content="mybuddyhero, buddy, hero, 우리반, 영웅, 히어로, 우리반 영웅" />
        <meta name="title" content="My Buddy Hero" />
        <meta name="description" content="히어로 역할 놀이를 통한 교육 서비스" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/images/icons/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <title>My Buddy Hero</title>

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="My Buddy Hero" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mybuddyhero.com/" />
        <meta property="og:image" content="/images/icons/ogImage.jpg" />
        <meta property="og:description" content="히어로 역할 놀이를 통한 교육 서비스, 손쉽게 설치해서 사용해보세요" />

        {/* Open Graph / Twitter */}
        <meta property="twitter:title" content="My Buddy Hero" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:image" content="/images/icons/ogImage.jpg" />
        <meta property="twitter:description" content="히어로 역할 놀이를 통한 교육 서비스, 손쉽게 설치해서 사용해보세요" />

        {/* favicon device image link */}
        <link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/android-icon-192x192.png" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="portal-dialog" />
      </body>
    </Html>
  );
}
