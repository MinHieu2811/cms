import { Html, Head, Main, NextScript } from 'next/document';
import NextDocument from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@/theme';
export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/logo.ico" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
