import { IABCollection } from "../global";
import fs from "fs";
import { resolve } from "path";
import { ArtblocksCollectionsDocument, execute } from "../.graphclient";

const readFile = fs.promises.readFile;
const writeFile = fs.promises.writeFile;

const cacheFile = resolve("./data/cache");

const fetchABCollections = async (): Promise<Array<IABCollection>> => {
  let projects: Array<IABCollection> = [];
  return execute(ArtblocksCollectionsDocument, {})
    .then((result) => {
      projects = result?.data.projects as IABCollection[];
      projects.map((collection) => {
        if (collection?.minterConfiguration?.startTime) {
          collection.updatedAt = collection.minterConfiguration.startTime;
        }
        if (!collection.scriptTypeAndVersion && collection.scriptJSON) {
          collection.scriptTypeAndVersion = JSON.parse(collection.scriptJSON).type;
        }
        if (collection.scriptTypeAndVersion) {
          collection.scriptTypeAndVersion = collection.scriptTypeAndVersion.replace("p5js", "p5");
          collection.scriptTypeAndVersion = collection.scriptTypeAndVersion.replace("threejs", "three");
          collection.scriptTypeAndVersion = collection.scriptTypeAndVersion.replace("paperjs", "paper");
          collection.scriptTypeAndVersion = collection.scriptTypeAndVersion.replace("tonejs", "tone");
          if (collection.scriptTypeAndVersion.indexOf("@") >= 0) {
            collection.scriptTypeAndVersion = collection.scriptTypeAndVersion.substr(
              0,
              collection.scriptTypeAndVersion.indexOf("@")
            );
          }
          collection.scriptLength = collection.script?.length;
        }
      });
    })
    .then(() => projects);
};

const getCollectionsDataFromFS = async () => {
  let aBCollections: Array<IABCollection> = [];
  const refreshCacheSeconds = 86400;
  let refreshCache = false;

  if (fs.existsSync(cacheFile)) {
    const fileStats = fs.statSync(cacheFile);

    const secondsSinceLastUpdate = (new Date().getTime() - new Date(fileStats.mtime).getTime()) / 1000;
    console.log(`Seconds since cache update: ${secondsSinceLastUpdate}; refreshCacheSeconds: ${refreshCacheSeconds}`);

    if (secondsSinceLastUpdate > refreshCacheSeconds) {
      refreshCache = true;
    }

    // Fetch collections from cache
    if (!refreshCache) {
      try {
        aBCollections = JSON.parse(await readFile(cacheFile, "utf8"));
        console.log("Successfully fetched collections from cache");
      } catch {
        console.log("No cached data found");
      }
    }
  }

  // Fetch collections from The Graph
  if (aBCollections.length === 0) {
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

export default getCollectionsDataFromFS;
