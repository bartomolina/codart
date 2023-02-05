import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import client from "../lib/wagmi";

import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js" strategy="beforeInteractive" />
    <Script src="https://unpkg.com/prettier@2.8.3/esm/standalone.mjs" />
    <Script src="https://unpkg.com/prettier@2.8.3/esm/parser-babel.mjs" />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="auto" mode="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConnectKitProvider>
    </WagmiConfig>
  </>
);

export default App;
