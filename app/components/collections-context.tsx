import { ICACollection } from "../global";
import { createContext, useContext, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import LocalCodArtFactoryJSON from "../lib/contracts/localhost-codart-factory-contract.json";
import GoerliCodArtFactoryJSON from "../lib/contracts/goerli-codart-factory-contract.json";

const CodArtContext = createContext({
  cACollections: [] as ICACollection[],
  fetchCACollections: () => {},
});

export const useCodArt = () => useContext(CodArtContext);

export const CodArtProvider = ({ children }: React.PropsWithChildren) => {
  const [cACollections, setCACollections] = useState([] as ICACollection[]);

  let CodArtFactoryJSON = LocalCodArtFactoryJSON;
  if (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() == "goerli") {
    CodArtFactoryJSON = GoerliCodArtFactoryJSON;
  }

  const getCACollectionsByType = async (type: string, propertyType: string) => {
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
        for (var key in collection.info) {
          if (isNaN(key as any)) _collection[key] = collection.info[key];
        }
        _collection["_address"] = collection["_address"];
        _collection["type"] = propertyType;
        _CACollections = [..._CACollections, _collection];
      });

      return _CACollections;
    });
  };

  const fetchCACollections = () => {
    let _CACollections = [] as ICACollection[];
    getCACollectionsByType("getLearnInstances", "Learn")
      .then((collections) => {
        _CACollections = collections;
      })
      .then(() => {
        return getCACollectionsByType("getCertificateInstances", "Certificate").then((collections) => {
          _CACollections = _CACollections.concat(collections);
        });
      })
      .then(() => {
        setCACollections(_CACollections);
      });
  };

  useEffect(() => {
    fetchCACollections();
  }, []);

  return <CodArtContext.Provider value={{ cACollections, fetchCACollections }}>{children}</CodArtContext.Provider>;
};
