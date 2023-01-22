import Head from "next/head";
import CollectionDetails from "../components/collection-details";
import CollectionsList from "../components/collections";

const Home = () => (
  <>
    <Head>
      <title>CodArt</title>
      <meta name="description" content="CodArt" />
    </Head>
    <div className="bg-gray-100">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <header className="pb-44 pt-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">CodArt Art Blocks Explorer</h1>
        </header>
      </div>
    </div>
  </>
);

export default Home;
