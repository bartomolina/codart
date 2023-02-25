import { ICACollection } from "../global";
import { createContext, useContext, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import LocalCodArtFactoryJSON from "../lib/contracts/localhost-codart-factory-contract.json";
import GoerliCodArtFactoryJSON from "../lib/contracts/goerli-codart-factory-contract.json";

const CodArtContext = createContext({
  cALearnCollections: [] as ICACollection[],
  cACertificateCollections: [] as ICACollection[],
  fetchCACollections: () => {},
});

export const useCodArt = () => useContext(CodArtContext);

export const CodArtProvider = ({ children }: React.PropsWithChildren) => {
  const [cALearnCollections, setCALearnCollections] = useState([] as ICACollection[]);
  const [cACertificateCollections, setCACertificateCollections] = useState([] as ICACollection[]);

  let CodArtFactoryJSON = LocalCodArtFactoryJSON;
  if (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() == "goerli") {
    CodArtFactoryJSON = GoerliCodArtFactoryJSON;
  }

  const getCACollectionsByType = async (type: string) => {
    let _CACollections = [] as ICACollection[];
    return readContract({
      chainId: 5,
      address: CodArtFactoryJSON.address,
      abi: CodArtFactoryJSON.abi as any,
      functionName: type,
    }).then((data: any) => {
      // Transform returned array from ethers into an objects array
      data.map((collection: any) => {
        let _collection = {} as any;
        for (var key in collection) {
          if (isNaN(key as any)) _collection[key] = collection[key];
        }
        _CACollections = [..._CACollections, _collection];
      });

      return _CACollections;
    });
  };

  const fetchCACollections = () => {
    getCACollectionsByType("getLearnInstances").then((collections) => setCALearnCollections(collections));
    getCACollectionsByType("getCertificateInstances").then((collections) => setCACertificateCollections(collections));
  };

  useEffect(() => {
    fetchCACollections();
  }, []);

  return <CodArtContext.Provider value={{ cALearnCollections, cACertificateCollections, fetchCACollections }}>{children}</CodArtContext.Provider>;
};
