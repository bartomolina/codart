import { useEffect, useState } from "react";
import Head from "next/head";
import { ArtblocksCollectionsDocument, ArtblocksCollectionsQuery, execute, Project } from "../../.graphclient";
import Card from "../../components/card";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [collectionStatus, setCollectionStatus] = useState("Completed");

  useEffect(() => {
    console.log("Test");

    execute(ArtblocksCollectionsDocument, {}).then((result) => {
      let filteredCollections = result?.data.projects.filter((collection) => collection.complete);
      if (collectionStatus === "Completed") {
      } else {
        filteredCollections = result?.data.projects.filter((collection) => !collection.complete && collection.active);
        filteredCollections = filteredCollections.sort(
          (a, b) => b.minterConfiguration?.startTime - a.minterConfiguration?.startTime
        );
        if (collectionStatus === "Upcoming") {
          filteredCollections = filteredCollections.filter(
            (collection) => !collection.minterConfiguration?.startTime || collection.minterConfiguration?.startTime * 1000 > Date.now()
          );
        } else if (collectionStatus === "Open") {
          filteredCollections = filteredCollections.filter(
            (collection) => collection.minterConfiguration?.startTime && collection.minterConfiguration?.startTime * 1000 <= Date.now()
          );
        }
      }
      setCollections(filteredCollections);
      console.log(filteredCollections);
    });
  }, [collectionStatus]);

  return (
    <>
      <Head>
        <title>CodArt</title>
        <meta name="description" content="CodArt" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          <div className="mb-5">
            <label htmlFor="status" className="sr-only">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setCollectionStatus(event.target.value)}
              value={collectionStatus}
            >
              <option>Completed</option>
              <option>Open</option>
              <option>Upcoming</option>
            </select>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {collections.map(
              (
                collection: Pick<Project, "id" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON">
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
