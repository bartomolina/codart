import { IABCollection } from "../global";
import { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getCollectionsDataFromFS } from "../lib/artblocks-cache";
import Card from "../components/card";

type Props = {
  aBCollections: Array<IABCollection>;
};

const Home = ({ aBCollections }: Props) => {
  const [collectionStatusFilter, setCollectionStatusFilter] = useState("Completed");
  const [scriptFilter, setScriptFilter] = useState("");

  const filteredCollections = useMemo(() => {
    let filteredCollections = [] as IABCollection[];
    if (collectionStatusFilter === "Completed") {
      filteredCollections = aBCollections.filter((collection) => collection.complete);
    } else {
      filteredCollections = aBCollections.filter((collection) => !collection.complete && collection.active);
      filteredCollections = filteredCollections.sort((a, b) => b.updatedAt - a.updatedAt);
      if (collectionStatusFilter === "Upcoming") {
        filteredCollections = filteredCollections.filter(
          (collection) => !collection.updatedAt || collection.updatedAt * 1000 > Date.now()
        );
      } else if (collectionStatusFilter === "Open") {
        filteredCollections = filteredCollections.filter(
          (collection) => collection.updatedAt && collection.updatedAt * 1000 <= Date.now()
        );
      }
    }

    if (scriptFilter) {
      filteredCollections = filteredCollections.filter(
        (collection) => collection.scriptTypeAndVersion === scriptFilter
      );
    }

    return filteredCollections;
  }, [aBCollections, collectionStatusFilter, scriptFilter]);

  const scriptTypes = useMemo(() => {
    return new Set(filteredCollections.map((c) => c.scriptTypeAndVersion));
  }, [filteredCollections]);

  return (
    <>
      <Head>
        <title>CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">Art Blocks</h1>
      </header>
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-8">
        <label htmlFor="status" className="sr-only">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="mt-1 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
          onChange={(event) => setCollectionStatusFilter(event.target.value)}
          value={collectionStatusFilter}
        >
          <option>Completed</option>
          <option>Open</option>
          <option>Upcoming</option>
        </select>
        <label htmlFor="library" className="sr-only">
          Library
        </label>
        <select
          id="library"
          name="scrlibraryipt"
          className="mt-1 ml-5 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
          onChange={(event) => setScriptFilter(event.target.value)}
          value={scriptFilter}
        >
          <option value="">library</option>
          {scriptTypes &&
            [...Array.from(scriptTypes)].map((scriptType) => <option key={scriptType}>{scriptType}</option>)}
        </select>
        <em className="ml-5 text-lg">{filteredCollections.length} Collections</em>
      </div>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredCollections.map((collection) => (
              <li
                key={collection.id}
                className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow hover:shadow-xl hover:-translate-y-1 transform transition"
              >
                <Card collection={collection} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getCollectionsDataFromFS();
  return {
    props: {
      aBCollections: data,
    },
    revalidate: 86400,
  };
};

export default Home;
