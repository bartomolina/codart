import { IABCollection } from "../global";
import fs from "fs";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";
import { ArtblocksCollectionsDocument, execute } from "../.graphclient";

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

const readFile = fs.promises.readFile;
const writeFile = fs.promises.writeFile;

const cacheFile = resolve("./data/cache");

const prepareStoreCollectionInDB = (collection: IABCollection) => {
  return {
    projectId: collection.projectId,
    activatedAt: collection.activatedAt,
    active: collection.active,
    artistName: collection.artistName,
    complete: collection.complete,
    completedAt: collection.completedAt,
    contractAddress: collection.contractAddress,
    description: collection.description,
    id: collection.id,
    invocations: collection.invocations,
    license: collection.license,
    maxInvocations: collection.maxInvocations,
    mintingDate: collection.mintingDate,
    name: collection.name,
    paused: collection.paused,
    script: collection.script,
    scriptJSON: collection.scriptJSON,
    scriptLength: collection.scriptLength,
    scriptType: collection.scriptType,
    scriptTypeAndVersion: collection.scriptTypeAndVersion,
    updatedAt: collection.updatedAt,
    website: collection.website,
  };
};

const fetchABCollections = async (): Promise<Array<IABCollection>> => {
  let projects: Array<IABCollection> = [];
  await global.prisma.collection.deleteMany({ where: {} });
  return execute(ArtblocksCollectionsDocument, {})
    .then((result) => {
      projects = result?.data.projects as IABCollection[];
      projects.map((collection) => {
        // Flatten properties
        collection.contractAddress = collection.contract?.id || null;
        collection.mintingDate = collection.minterConfiguration?.startTime || null;
        collection.scriptLength = collection.script?.length || null;
        collection.scriptType = collection.scriptTypeAndVersion;

        // Parse numbers
        collection.activatedAt = parseInt(collection.activatedAt) || null;
        collection.completedAt = parseInt(collection.completedAt) || null;
        collection.invocations = parseInt(collection.invocations) || null;
        collection.maxInvocations = parseInt(collection.maxInvocations) || null;
        collection.projectId = parseInt(collection.projectId);
        collection.mintingDate = parseInt(collection.mintingDate) || null;
        collection.updatedAt = parseInt(collection.updatedAt) || null;

        if (!collection.scriptType && collection.scriptJSON) {
          collection.scriptType = JSON.parse(collection.scriptJSON).type;
        }
        if (collection.scriptType) {
          collection.scriptType = collection.scriptType.replace("p5js", "p5");
          collection.scriptType = collection.scriptType.replace("threejs", "three");
          collection.scriptType = collection.scriptType.replace("paperjs", "paper");
          collection.scriptType = collection.scriptType.replace("tonejs", "tone");
          if (collection.scriptType.indexOf("@") >= 0) {
            collection.scriptType = collection.scriptType.substr(0, collection.scriptType.indexOf("@"));
          }
        }
      });

      projects = projects.sort((a, b) => {
        const bDate = b.completedAt || b.mintingDate || b.activatedAt;
        const aDate = a.completedAt || a.mintingDate || a.activatedAt;
        return bDate - aDate;
      });

      console.log("------------ STORING COLLECTIONS IN DB ------------");

      const data = projects.map((collection) => prepareStoreCollectionInDB(collection));
      global.prisma.collection
        .createMany({ data })
        .then(() => console.log("------------ COMPLETED STORING COLLECTIONS IN DB ------------"));
    })
    .then(() => projects);
};

export const getCollectionDataFromFS = async (id: string) => {
  // console.log("------------ DB READ START ------------");
  // console.time("db");
  // const collection = await global.prisma.collection.findFirst({
  //   where: {
  //     id,
  //   },
  // });
  // console.timeEnd("db");
  // console.log("------------ DB READ END ------------");

  // return collection;
  return [];
};

export const getCollectionsDataFromFS = async () => {
  let aBCollections: Array<IABCollection> = [];
  console.log("CODART: Fetching Art Blocks collections");
  const refreshCacheSeconds = 7 * 24 * 60 * 60;
  let refreshCache = false;

  if (fs.existsSync(cacheFile)) {
    const fileStats = fs.statSync(cacheFile);

    const secondsSinceLastUpdate = (new Date().getTime() - new Date(fileStats.mtime).getTime()) / 1000;
    console.log(
      `CODART: Seconds since cache update: ${secondsSinceLastUpdate}; refreshCacheSeconds: ${refreshCacheSeconds}`
    );

    if (secondsSinceLastUpdate > refreshCacheSeconds) {
      refreshCache = true;
    }

    // Fetch collections from cache
    if (!refreshCache) {
      try {
        aBCollections = JSON.parse(await readFile(cacheFile, "utf8"));
        console.log("CODART: Successfully fetched collections from cache");
      } catch {
        console.log("CODART: No cached data found");
      }
    }
  }

  // Fetch collections from The Graph
  if (aBCollections.length === 0 || refreshCache) {
    try {
      console.time("Caching collections");
      aBCollections = await fetchABCollections();
      writeFile(cacheFile, JSON.stringify(aBCollections), "utf8")
        .then(() => {
          console.timeEnd("Caching collections");
        })
        .catch((e) => {
          console.timeEnd("Caching collections");
        });
    } catch (err) {
      console.warn("Error fetching collections and caching data");
    }
  }

  return aBCollections;
};
