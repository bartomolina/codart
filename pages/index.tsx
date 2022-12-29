import Head from "next/head";
import CollectionDetails from "../components/collection-details";
import CollectionsList from "../components/collections";

export default function Home() {
  return (
    <>
      <Head>
      <title>Art Blocks x B.M. - Home</title>
        <meta name="description" content="Art Blocks x B.M." />
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
