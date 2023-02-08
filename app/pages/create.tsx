import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { ethers } from "ethers";
import LocalCodArtFactoryJSON from "../lib/localhost-codart-learn-factory-contract.json";
import GoerliCodArtFactoryJSON from "../lib/goerli-codart-learn-factory-contract.json";
import { useNotifications } from "../components/notifications-context";
import { useRouter } from "next/router";

const codeStart = '<html><head><script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script><script>tokenData={hash: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"};';
const codeEnd = '</script></head><body><main></main></body></html>';

const Create = () => {
  const router = useRouter();
  const script = router.query.script as string;
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({
    type: "Learn",
    name: "GenArt0",
    symbol: "GA0",
    supply: 0,
    price: 0,
    library: "p5",
    code: script ? script : '<html><head><script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script><script>function setup(){createCanvas(100, 100);background(220);}</script></head><body><main></main></body></html>',
  });
  const { showNotification, showError } = useNotifications();
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
      type: "Learn",
      name: "",
      symbol: "",
      supply: 0,
      price: 0,
      library: "p5",
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
        formData.name,
        formData.symbol,
        formData.supply,
        ethers.utils.parseEther(formData.price.toString()),
        formData.library,
        `${codeStart}${formData.code}${codeEnd}`,
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
        // @ts-ignore
        console.log("Done!");
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
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">Create</h1>
      </header>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-44 pt-5">
          <form className="space-y-8 divide-y divide-gray-200 w-fit">
            <div className="flex flex-row space-x-20">
              <div>
                <div>
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">Collection</h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <div className="mt-1">
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Learn</option>
                        <option>Certification</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                      Symbol
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="symbol"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
                      Max. Supply
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="supply"
                        name="supply"
                        value={formData.supply}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.0001"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">Code</h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="library" className="block text-sm font-medium text-gray-700">
                      Library
                    </label>
                    <div className="mt-1">
                      <select
                        id="library"
                        name="library"
                        value={formData.library}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>p5</option>
                        <option>p6</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                      Code
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="code"
                        name="code"
                        rows={14}
                        value={formData.code}
                        onChange={handleFormChange}
                        className="block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-5 justify-end">
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
