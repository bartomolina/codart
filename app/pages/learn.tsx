import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useArtBlocks } from "../components/collections-context";
import Card from "../components/card";

const Learn = () => {
  const router = useRouter();
  const minChars = router.query.minChars;
  const maxChars = router.query.maxChars;
  const { collections } = useArtBlocks();

  const filteredCollections = useMemo(() => {
    return collections.filter((collection) => {
      return  collection.script > minChars && collection.script <= maxChars && collection.scriptTypeAndVersion === "p5";
    });
  }, [collections, minChars, maxChars]);

  return (
    <>
      <Head>
        <title>Learn - CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">Learn</h1>
      </header>
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-8 text-center">
        <div className="flex flex-row space-x-8">
          <Link
            href={{ pathname: "/learn", query: { minChars: "0",  maxChars: "2000" } }}
            className="rounded-lg py-3 px-8 text-white shadow-md bg-gradient-to-r from-yellow-500 to-red-500 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2  hover:-translate-y-0.5 transform transition"
          >
            <span className="block font-bold text-xl">AB p5 Level 1</span>
            <span className="block text-sm">&lt; 2,000 chars</span>
          </Link>
          <Link
            href={{ pathname: "/learn", query: { minChars: "2000", maxChars: "3000" } }}
            className="rounded-lg py-3 px-8 text-white shadow-md bg-gradient-to-r from-red-500 to-blue-500 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 hover:-translate-y-0.5 transform transition"
          >
            <span className="block font-bold text-xl">AB p5 Level 2</span>
            <span className="block text-sm">&lt; 3,000 chars</span>
          </Link>
          <Link
            href={{ pathname: "/learn", query: { minChars: "3000", maxChars: "4000" } }}
            className="rounded-lg py-3 px-8 text-white shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 hover:-translate-y-0.5 transform transition"
          >
            <span className="block font-bold text-xl">AB p5 Level 3</span>
            <span className="block text-sm">&lt; 4,000 chars</span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredCollections.map(
              (
                collection: Pick<Project, "id" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON">
              ) => (
                <li
                  key={collection.id}
                  className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow hover:-translate-y-1 transform transition"
                >
                  <Card collection={collection} />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Learn;
