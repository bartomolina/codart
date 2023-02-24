import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { libraries } from "../../lib/utils";
import LocalCodArtFactoryJSON from "../../lib/contracts/localhost-codart-learn-factory-contract.json";
import GoerliCodArtFactoryJSON from "../../lib/contracts/goerli-codart-learn-factory-contract.json";
import { useNotifications } from "../../components/notifications-context";
import { useCodArt } from "../../components/collections-context";

const Create = () => {
  const router = useRouter();
  const script = router.query.script as string;
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "GenArt0",
    symbol: "GA0",
    description: "Basic shapes",
    artist: "bartomolina.eth",
    maxSupply: 0,
    price: 0,
    _library: "p5",
    code: script ? script : "function setup(){createCanvas(400,400)}function draw(){background(220)}",
  });
  const { showNotification, showError } = useNotifications();
  const { fetchCACollections } = useCodArt();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingTx, setIsWaitingTx] = useState(false);

  const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  let CodArtFactoryJSON = LocalCodArtFactoryJSON;
  if (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() == "goerli") {
    CodArtFactoryJSON = GoerliCodArtFactoryJSON;
  }

  const clearForm = () => {
    setFormData({
      name: "",
      symbol: "",
      description: "",
      artist: "",
      maxSupply: 0,
      price: 0,
      _library: "p5",
      code: "",
    });
  };

  const handleSubmit = (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    writeContract({
      mode: "recklesslyUnprepared",
      address: CodArtFactoryJSON.address,
      // @ts-ignore
      abi: CodArtFactoryJSON.abi,
      functionName: "createCodArtLearn",
      args: [
        {
          name: formData.name,
          symbol: formData.symbol,
          description: formData.description,
          artist: formData.artist,
          maxSupply: formData.maxSupply,
          price: ethers.utils.parseEther(formData.price.toString()),
          _library: formData._library,
          libraryURL: libraries[formData._library as keyof typeof libraries],
          code: formData.code,
        },
      ],
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
        fetchCACollections();
        // @ts-ignore
        showNotification("Collection created", tx.transactionHash);
      })
      .catch((error) => {
        setIsLoading(false);
        showError("Error creating collection", error.message);
      });
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
        <title>Create - CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">Create</h1>
      </header>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 pb-12 pt-5">
          <form action="#" method="POST">
            <div className="md:grid md:grid-cols-3 ">
              <div className="md:mb-0 mb-3 font-semibold">Collection information</div>
              <div className="md:col-span-2">
                <div className="overflow-hidden shadow rounded-md">
                  <div className="bg-white px-4 p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                          Symbol
                        </label>
                        <input
                          type="text"
                          id="symbol"
                          name="symbol"
                          value={formData.symbol}
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
                          Artist
                        </label>
                        <input
                          type="text"
                          id="artist"
                          name="artist"
                          value={formData.artist}
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          // @ts-ignore
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
                          Max. Supply
                        </label>
                        <input
                          type="number"
                          id="supply"
                          name="supply"
                          value={formData.maxSupply}
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price (ETH)
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          step="0.0001"
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
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
            <div className="md:grid md:grid-cols-3 ">
              <div className="md:mb-0 my-3 font-semibold">Code</div>
              <div className="col-span-2">
                <div className="overflow-hidden shadow rounded-md">
                  <div className="bg-white px-4 p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-3">
                        <label htmlFor="library" className="block text-sm font-medium text-gray-700">
                          Library
                        </label>
                        <select
                          id="library"
                          name="library"
                          value={formData._library}
                          // @ts-ignore
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>p5</option>
                        </select>
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                          Code
                        </label>
                        <textarea
                          id="code"
                          name="code"
                          rows={7}
                          value={formData.code}
                          // @ts-ignore
                          onChange={handleFormChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
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
                {isConnected ? (isWaitingTx ? "Processing..." : "Create collection") : "Connect wallet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
