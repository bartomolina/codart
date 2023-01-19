import Head from "next/head";
import CollectionDetails from "../components/collection-details";
import CollectionsList from "../components/collections";

const Home = () => (
  <>
    <Head>
      <title>Art Blocks Explorer - Home</title>
      <meta name="description" content="Art Blocks x B.M." />
    </Head>
    <div className="bg-gray-100">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="p-4 md:pt-8 sm:px-0 md:grid md:grid-cols-8 gap-3">
          <header>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Art Blocks x B.M.</h1>
          </header>
        </div>
      </div>
    </div>
  </>
);

export default Home;
