import { IABCollection, ICACollection, ICACollectionInfo } from "../global";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { readContract } from "@wagmi/core";
import { ethers } from "ethers";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../components/notifications-context";
import ArtblocksJSON from "../lib/contracts/artblocks-contract.json";
import { libraries } from "../lib/utils";

type Props = {
  isAB: boolean;
  collection: IABCollection | ICACollectionInfo | undefined;
  hash: string;
  updateHash: (hash: string) => void;
  tokenId: string;
  invocations: number;
  setTokenId: (tokenId: string) => void;
  handleRun: (event: FormEvent) => void;
  autoRefresh: boolean;
  setAutoRefresh: (autoRefresh: boolean) => void;
  library: string;
  setLibrary: Dispatch<SetStateAction<keyof typeof libraries>>;
  handleCreate: (event: FormEvent) => void;
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
    if (collection && isAB) {
      if (parseInt(tokenId) + 1 > invocations) {
        alert("Token ID must be lower than the items minted");
        return;
      }
      readContract({
        chainId: 1,
        // @ts-ignore
        address: collection.contractAddress,
        abi: ArtblocksJSON.abi as any,
        functionName: "tokenIdToHash",
        // @ts-ignore
        args: [collection.projectId * 1000000 + parseInt(tokenId)],
      })
        .then((hash: any) => {
          updateHash(hash);
        })
        .catch((error) => {
          console.log(error);
          showError("Error fetching Hash from Token ID", error.message);
        });
    }
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
                    onChange={(e) => setLibrary(e.target.value as keyof typeof libraries)}
                    className="block text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option>p5</option>
                    <option>three</option>
                  </select>
                </div>
                {!isAB && (
                  <div className="flex items-center">
                    <input
                      id="autoRefresh"
                      aria-describedby="autoRefresh"
                      name="autoRefresh"
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                    />
                    <label htmlFor="autoRefresh" className="ml-3 font-medium text-gray-700">
                      Auto-refresh
                    </label>
                  </div>
                )}
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
                    className="h-auto p-0 text-sm rounded-lg border-2 border-black font-semibold bg-white px-3 text-gray-900 shadow-md hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 hover:drop-shadow hover:-translate-y-0.5 active:translate-y-0 transform transition"
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
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
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
                  className="h-7 text-sm rounded-lg border-2 border-black font-semibold bg-white px-2 text-gray-900 shadow-md hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 hover:drop-shadow hover:-translate-y-0.5 active:translate-y-0 transform transition"
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
                  <PlayCircleIcon className="h-16 w-16 text-green-400 hover:-translate-y-0.5 active:translate-y-0 transform transition" aria-hidden="true" />
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
