import { IABCollection } from "../../global";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

type Props = {
  collection: IABCollection;
};

const CollectionItem = ({ collection }: Props) => {

  let date = collection.completedAt || collection.mintingDate || collection.activatedAt;

  return (
    <>
      <Head>
        <title>CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">{collection?.name}</h1>
      </header>
      <div className="bg-gray-100 pb-14">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 space-x-4">
            test
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("------------ SSP START ------------");
  console.time("ssp");
  // const data = await getCollectionDataFromFS(context.query.id as string);
  console.timeEnd("ssp");
  console.log("------------ SSP END ------------");

  return {
    props: {
      collection: [],
    },
  };
};

export default CollectionItem;
