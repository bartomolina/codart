import { ICACollection } from "../../global";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import CodArtLearnJSON from "../../lib/contracts/codart-learn-contract.json";
import CodArtCertificateJSON from "../../lib/contracts/codart-certificate-contract.json";
import { useCodArt } from "../../components/collections-context";
import { useNotifications } from "../../components/notifications-context";

const Mint = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const { cACollections } = useCodArt();
  const [collection, setCollection] = useState<ICACollection | undefined>();
  const { showNotification, showError } = useNotifications();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingTx, setIsWaitingTx] = useState(false);
  const [minter, setMinter] = useState("");

  const projectId = useMemo(() => (router.query.id ? (router.query.id as string) : undefined), [router.query.id]);

  useEffect(() => {
    setCollection(undefined);
    if (projectId) {
      const _cACollection = cACollections.find((c) => c._address === projectId);
      if (_cACollection) {
        setCollection(_cACollection);
      }
    }
  }, [projectId, cACollections]);

  const clearForm = () => {
    setMinter("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (collection) {
      setIsLoading(true);
      writeContract({
        mode: "recklesslyUnprepared",
        address: collection._address,
        // @ts-ignore
        abi: collection.type === "Learn" ? CodArtLearnJSON.abi : CodArtCertificateJSON.abi,
        functionName: "safeMint",
        args: collection.type === "Learn" ? [] : [minter],
        overrides: {
          value: collection.price,
        },
      })
        // @ts-ignore
        .then((hash, wait) => {
          setIsWaitingTx(true);
          return waitForTransaction(hash);
        })
        .then((tx) => {
          setIsLoading(false);
          setIsWaitingTx(false);
          clearForm();
          // @ts-ignore
          console.log(tx);
          showNotification(
            "Minting completed",
            tx.hash,
            // @ts-ignore
            `https://testnets.opensea.io/assets/goerli/${collection._address}/${parseInt(tx.logs[0].topics[3], 16)}`,
            "View in OpenSea (you may get a 404, refresh after a few seconds)"
          );
        })
        .catch((error) => {
          setIsLoading(false);
          showError("Error minting", error.message);
        });
    }
  };

  // To prevent hydration errors:
  // https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, [hasMounted]);
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>Mint - CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">{`Mint: ${collection?.name}`}</h1>
      </header>
      <div className="bg-gray-100 pb-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 pb-12 pt-5">
          <form action="#" method="POST">
            <div className="md:grid md:grid-cols-3 ">
              <div className="md:mb-0 mb-3 font-semibold">Mint</div>
              <div className="md:col-span-2">
                <div className="overflow-hidden shadow rounded-md">
                  <div className="bg-white px-4 p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <div id="price" className="mt-1 block w-full">
                          <span>{collection?.price ? ethers.utils.formatEther(collection.price) : "0"}</span>
                          <Image
                            src="/eth-diamond-black.png"
                            alt="ETH"
                            width={10}
                            height={15}
                            className="ml-1 inline align-baseline"
                          />
                        </div>
                      </div>
                      {collection?.type === "Certificate" && (
                        <div className="col-span-6">
                          <label htmlFor="minter" className="block text-sm font-medium text-gray-700">
                            Minter (Min. 3 letters)
                          </label>
                          <input
                            type="text"
                            id="minter"
                            name="minter"
                            value={minter}
                            onChange={(e) => setMinter(e.currentTarget.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <div className="flex justify-end md:mt-0 mt-5">
              <button
                type="button"
                disabled={!isConnected || isLoading}
                onClick={handleSubmit}
                className={
                  isConnected && !isLoading
                    ? "rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                    : "rounded-lg bg-indigo-200 px-3 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                }
              >
                {isConnected ? (isWaitingTx ? "Processing..." : "Mint") : "Connect wallet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mint;
