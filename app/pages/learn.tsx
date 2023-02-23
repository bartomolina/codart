import { IABCollection } from "../global";
import { useMemo } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getABCollections } from "../lib/artblocks";
import { useCodArt } from "../components/collections-context";
import LearnArtBlocksCollections from "../components/learn-ab-collections";
import LearnCodArtCollections from "../components/learn-ca-collections";

type Props = {
  aBCollections: Array<IABCollection>;
};

const Learn = ({ aBCollections }: Props) => {
  const router = useRouter();
  const { cACollections } = useCodArt();
  const minChars = router.query.minChars || 0;
  const maxChars = router.query.maxChars || 0;

  const filteredCollections = useMemo(() => {
    return aBCollections.filter((collection) => {
      return (
        collection.scriptLength > minChars &&
        collection.scriptLength <= maxChars &&
        collection.scriptType === "p5"
      );
    });
  }, [aBCollections, minChars, maxChars]);

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
        <div className="flex flex-row justify-around space-x-8">
          <Link
            href={{ pathname: "/learn", query: { minChars: "0", maxChars: "2000" } }}
            className="rounded-lg py-3 px-8 text-white shadow-md bg-gradient-to-r from-yellow-500 to-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 hover:drop-shadow-xl hover:-translate-y-0.5 transform transition"
          >
            <span className="block font-bold text-xl">AB p5 Level 1</span>
            <span className="block text-sm">&lt; 2,000 chars</span>
          </Link>
          <Link
            href={{ pathname: "/learn", query: { minChars: "2000", maxChars: "3000" } }}
            className="rounded-lg py-3 px-8 text-white shadow-md bg-gradient-to-r from-red-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 hover:drop-shadow-xl hover:-translate-y-0.5 transform transition"
          >
            <span className="block font-bold text-xl">AB p5 Level 2</span>
            <span className="block text-sm">&lt; 3,000 chars</span>
          </Link>
          <Link
            href={{ pathname: "/learn", query: { minChars: "3000", maxChars: "4000" } }}
            className="rounded-lg py-3 px-8 text-white shadow-md bg-gradient-to-r from-blue-500 to-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 hover:drop-shadow-xl hover:-translate-y-0.5 transform transition"
          >
            <span className="block font-bold text-xl">AB p5 Level 3</span>
            <span className="block text-sm">&lt; 4,000 chars</span>
          </Link>
          <Link
            href={{ pathname: "/learn", query: { codart: "learn" } }}
            className="rounded-lg py-5 px-8   text-white shadow-md bg-gradient-to-r from-gray-400 to-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 hover:drop-shadow-xl hover:-translate-y-0.5 transform transition"
          >
            <Image className="bg-white" src={"/codart.png"} alt="CodArt" width={156} height={36} quality={100} />
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 pb-14">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          {router.query.codart ? (
            <LearnCodArtCollections cACollections={cACollections} />
          ) : (
            <LearnArtBlocksCollections filteredCollections={filteredCollections} />
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getABCollections();
  return {
    props: {
      aBCollections: data,
    },
    revalidate: 7 * 24 * 60 * 60,
  };
};

export default Learn;
