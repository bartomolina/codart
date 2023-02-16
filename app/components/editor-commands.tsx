import { IABCollection } from "../global";
import { FormEvent } from "react";
import { readContract } from "@wagmi/core";
import { ethers } from "ethers";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../components/notifications-context";
import ArtblocksJSON from "../lib/artblocks-contract.json";

type Props = {
  isAB: boolean,
  collection: IABCollection;
  hash: string;
  updateHash: (hash: string) => {};
  tokenId: string;
  invocations: number;
  setTokenId: (tokenId: string) => {};
  handleRun: (event: FormEvent) => {};
  autoRefresh: boolean;
  setAutoRefresh: (autoRefresh: boolean) => {};
  library: string;
  setLibrary: (library: string) => {};
  handleCreate: (event: FormEvent) => {};
};

const EditorCommands = ({
  isAB,
  collection,
  hash,
  updateHash,
  tokenId,
  invocations,
  setTokenId,
  handleRun,
  autoRefresh,
  setAutoRefresh,
  library,
  setLibrary,
  handleCreate,
}: Props) => {
  const { showError } = useNotifications();

  const handleFetchHashFromToken = (event: FormEvent) => {
    if (parseInt(tokenId) + 1 > invocations) {
      alert("Token ID must be lower than the items minted");
      return;
    }
    readContract({
      chainId: 1,
      address: collection.contract.id,
      abi: ArtblocksJSON.abi as any,
      functionName: "tokenIdToHash",
      args: [parseInt(collection.projectId) * 1000000 + parseInt(tokenId)],
    })
      .then((hash: any) => {
        updateHash(hash);
      })
      .catch((error) => {
        console.log(error);
        showError("Error fetching Hash from Token ID", error.message);
      });
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-5">
          <div className="flex justify-between">
            <div className="flex-row w-full pr-5">
              <div className="flex text-sm space-x-3">
                <label htmlFor="tokenId" className="flex font-medium text-gray-700 items-center">
                  Library
                </label>
                <div className="flex items-center">
                  <select
                    id="library"
                    name="library"
                    value={library}
                    onChange={(e) => setLibrary(e.target.value)}
                    className="block text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option>p5</option>
                    <option>three</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="autoRefresh"
                    aria-describedby="autoRefresh"
                    name="autoRefresh"
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="autoRefresh" className="ml-3 font-medium text-gray-700">
                    Auto-refresh
                  </label>
                </div>
              </div>
              {isAB && (
                <div className="flex text-sm mt-3 space-x-3">
                  <label htmlFor="tokenId" className="flex font-medium text-gray-700 items-center">
                    TokenID
                  </label>
                  <div>
                    <input
                      type="number"
                      name="tokenId"
                      id="tokenId"
                      value={tokenId}
                      onChange={(event) => setTokenId(event.target.value)}
                      className="h-7 block w-24 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <em className="flex items-center">({invocations} Minted)</em>
                  <button
                    type="button"
                    onClick={(e) => handleFetchHashFromToken(e)}
                    className="h-7 p-0 text-sm rounded-lg bg-indigo-600 px-3 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                  >
                    Fetch hash from Token
                  </button>
                  <div className="flex items-center">
                    <input
                      id="autoRefresh"
                      aria-describedby="autoRefresh"
                      name="autoRefresh"
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="autoRefresh" className="ml-3 font-medium text-gray-700">
                      Auto-refresh
                    </label>
                  </div>
                </div>
              )}
              <div className="flex text-sm mt-3 space-x-3">
                <label htmlFor="hash" className="flex font-medium text-gray-700 items-center">
                  Hash
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    name="hash"
                    id="hash"
                    value={hash}
                    onChange={(event) => updateHash(event.target.value)}
                    className="inline w-full h-7 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => updateHash(ethers.utils.hexlify(ethers.utils.randomBytes(32)))}
                  className="h-7 text-sm rounded-lg bg-indigo-600 px-3 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                >
                  <ArrowPathIcon className="inline -mt-1 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex text-sm mt-3">
                <button type="button" onClick={(event) => handleCreate(event)} className="text-sm hover:underline">
                  Create new collection
                  <ArrowTopRightOnSquareIcon className="inline ml-1 h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-36 justify-end">
                <button type="button" onClick={handleRun}>
                  <PlayCircleIcon className="h-16 w-16 text-green-400" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default EditorCommands;
