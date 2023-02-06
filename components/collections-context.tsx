import { createContext, useContext, useEffect, useState } from "react";
import { ArtblocksCollectionsDocument, ArtblocksCollectionsQuery, execute, Project } from "../.graphclient";

const ArtBlocksContext = createContext({
  collections: [],
});

export const useArtBlocks = () => useContext(ArtBlocksContext);

export const ArtblocksProvider = ({ children }: React.PropsWithChildren) => {
  const [collections, setCollections] = useState([] as any);

  useEffect(() => {
    execute(ArtblocksCollectionsDocument, {}).then((result) => {
      result?.data.projects.map((collection) => {
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
          collection.script = collection.script?.length;
        }
      });

      setCollections(result?.data.projects);
      console.log(result?.data.projects);
    });
  }, []);

  return <ArtBlocksContext.Provider value={{ collections }}>{children}</ArtBlocksContext.Provider>;
};
