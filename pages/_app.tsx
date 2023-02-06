import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import client from "../lib/wagmi";
import { ArtblocksProvider } from "../components/collections-context";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="auto" mode="light">
        <ArtblocksProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ArtblocksProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </>
);

export default App;
