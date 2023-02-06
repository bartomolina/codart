import { useMemo, useState } from "react";
import Head from "next/head";
import { useArtBlocks } from "../../components/collections-context";
import Card from "../../components/card";

const Collections = () => {
  const [collectionStatusFilter, setCollectionStatusFilter] = useState("Completed");
  const [scriptFilter, setScriptFilter] = useState("");
  const { collections } = useArtBlocks();

  let scriptTypes;

  const filteredCollections = useMemo(() => {
    let filteredCollections;
    if (collectionStatusFilter === "Completed") {
      filteredCollections = collections.filter((collection) => collection.complete);
    } else {
      filteredCollections = collections.filter((collection) => !collection.complete && collection.active);
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

    scriptTypes = new Set(filteredCollections.map((c) => c.scriptTypeAndVersion));

    if (scriptFilter) {
      filteredCollections = filteredCollections.filter(
        (collection) => collection.scriptTypeAndVersion === scriptFilter
      );
    }

    return filteredCollections;
  }, [collections, collectionStatusFilter, scriptFilter]);

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
              className="mt-1 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              onChange={(event) => setCollectionStatusFilter(event.target.value)}
              value={collectionStatusFilter}
            >
              <option>Completed</option>
              <option>Open</option>
              <option>Upcoming</option>
            </select>
            <label htmlFor="script" className="sr-only">
              Status
            </label>
            <select
              id="script"
              name="script"
              className="mt-1 ml-5 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              onChange={(event) => setScriptFilter(event.target.value)}
              value={scriptFilter}
            >
              <option value="">script</option>
              {[...scriptTypes].map((scriptType) => (
                <option key={scriptType}>{scriptType}</option>
              ))}
            </select>
            <em className="ml-5 text-lg">{filteredCollections.length} Collections</em>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredCollections.map(
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
