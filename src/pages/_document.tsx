import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GTM_ID } from '../libs/gtm';
import { AppConfig } from '../utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />{' '}
          <meta name="theme-color" content="#18181b" />
          <meta name="msapplication-navbutton-color" content="#18181b" />
          <meta name="color-scheme" content="light dark" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
            key="viewport"
          />
          <meta
            name="description"
            content="Obtenha uma logo incrível para sua empresa em minutos com nosso serviço de criação de logos com IA e designers. Ganhe prévias gratuitas e sem compromisso e tenha uma visualização instantânea de como sua logo ficará. Acesse agora e transforme a identidade visual de sua marca!"
          />
        </Head>
        <body className="dark" style={{ height: '100%' }}>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
