import Document, { Html, Head, Main, NextScript } from 'next/document';

import { setCssVariables, VARIABLES } from 'utils/setCssVariables';

import type { DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/nexaBlack.woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/bonVoyage.woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/openSans400.woff2"
            crossOrigin="anonymous"
          />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <script
            dangerouslySetInnerHTML={{
              __html: `(${setCssVariables.toString()})({variables:${JSON.stringify(
                VARIABLES,
              )}})`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
