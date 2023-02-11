import { createContext, useContext, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import LocalCodArtFactoryJSON from "../lib/localhost-codart-learn-factory-contract.json";
import GoerliCodArtFactoryJSON from "../lib/goerli-codart-learn-factory-contract.json";
import { ArtblocksCollectionsDocument, ArtblocksCollectionsQuery, execute, Project } from "../.graphclient";

const ArtBlocksContext = createContext({
  aBCollections: [],
  cACollections: [],
});

export const useArtBlocks = () => useContext(ArtBlocksContext);

export const ArtblocksProvider = ({ children }: React.PropsWithChildren) => {
  const [aBCollections, setABCollections] = useState([] as any);
  const [cACollections, setCACollections] = useState([] as any);

  let CodArtFactoryJSON = LocalCodArtFactoryJSON;
  if (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() == "goerli") {
    CodArtFactoryJSON = GoerliCodArtFactoryJSON;
  }

  const fetchCACollections = () => {
    let _CACollections = [];

    readContract({
      chainId: 5,
      address: CodArtFactoryJSON.address,
      abi: CodArtFactoryJSON.abi as any,
      functionName: "getInstances",
    }).then((data: any) => {
      // Transform returned array from ethers into an objects array
      data.map((collection: any) => {
        let _collection = {} as any;
        for (var key in collection) {
          if (isNaN(key as any)) _collection[key] = collection[key];
        }
        _CACollections = [..._CACollections, _collection];
      });

      setCACollections(_CACollections);
      console.log(_CACollections);
    });
  };

  useEffect(() => {
    fetchCACollections();
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

      setABCollections(result?.data.projects);
      console.log(result?.data.projects);
    });
  }, []);

  return <ArtBlocksContext.Provider value={{ cACollections, aBCollections }}>{children}</ArtBlocksContext.Provider>;
};
