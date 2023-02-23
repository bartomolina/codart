import { ICACollection } from "../global";
import { createContext, useContext, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import LocalCodArtFactoryJSON from "../lib/contracts/localhost-codart-learn-factory-contract.json";
import GoerliCodArtFactoryJSON from "../lib/contracts/goerli-codart-learn-factory-contract.json";

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

  const fetchCACollections = () => {
    let _CACollections = [] as ICACollection[];

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
    });
  };

  useEffect(() => {
    fetchCACollections();
  }, []);

  return (
    <CodArtContext.Provider value={{ cACollections, fetchCACollections }}>
      {children}
    </CodArtContext.Provider>
  );
};
