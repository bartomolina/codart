import Head from "next/head";
import CollectionDetails from "../components/CollectionInfo";
import CollectionsList from "../components/CollectionsList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Art Blocks Explorer</title>
        <meta name="description" content="Web3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Art Blocks Explorer</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-1-title">
                  <CollectionsList />
                </section>
              </div>
              {/* Right column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">
                  <CollectionDetails />
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
