import Head from "next/head";
import CollectionDetails from "../components/collection-details";
import CollectionsList from "../components/collections";

export default function Home() {
  return (
    <>
      <Head>
        <title>Art Blocks x B.M.</title>
        <meta name="description" content="Web3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Art Blocks x B.M.</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            👋
          </div>
        </div>
      </main>
    </>
  );
}
