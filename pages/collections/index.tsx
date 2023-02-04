import { useEffect, useState } from "react";
import Head from "next/head";
import { ArtblocksCollectionsDocument, ArtblocksCollectionsQuery, execute, Project } from "../../.graphclient";
import Card from "../../components/card";

const Collections = () => {
  const [collections, setCollections] = useState<ArtblocksCollectionsQuery>();

  useEffect(() => {
    execute(ArtblocksCollectionsDocument, {}).then((result) => {
      console.log("Collections: ", result.data.projects);
      setCollections(result?.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>CodArt</title>
        <meta name="description" content="CodArt" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {collections?.projects.filter(collection => collection.complete).map(
                (
                  collection: Pick<
                    Project,
                    "script" | "id" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON"
                  >
                ) => (
                  <li
                    key={collection.id}
                    className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow"
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

export default Collections;
