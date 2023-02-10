import { readContract } from "@wagmi/core";
import { ethers } from "ethers";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../components/notifications-context";
import ArtblocksJSON from "../lib/artblocks-contract.json";

const EditorCommands = ({
  collection,
  hash,
  setHash,
  tokenId,
  setTokenId,
  handleRun,
  autoRefresh,
  setAutoRefresh,
  handleCreate,
}: Props) => {
  const { showError } = useNotifications();

  const handleFetchHashFromToken = (event: FormEvent) => {
    readContract({
      chainId: 1,
      address: collection.contract.id,
      abi: ArtblocksJSON.abi as any,
      functionName: "tokenIdToHash",
      args: [tokenId],
    })
      .then((hash: any) => {
        setHash(hash);
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
            <div className="flex-row w-full pr-10">
              <div className="flex text-sm">
                <label htmlFor="tokenId" className="flex font-medium text-gray-700 items-center">
                  TokenID
                </label>
                <div className="ml-3">
                  <input
                    type="number"
                    name="tokenId"
                    id="tokenId"
                    value={tokenId}
                    onChange={(event) => setTokenId(event.target.value)}
                    className="block w-24 h-7 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => handleFetchHashFromToken(e, autoRefresh)}
                  className="h-7 text-sm ml-3 rounded-lg bg-indigo-600 px-3 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                >
                  Fetch hash from TokenID
                </button>
                <button
                  type="button"
                  onClick={(e) => setHash(ethers.utils.hexlify(ethers.utils.randomBytes(32)))}
                  className="h-7 text-sm ml-3 rounded-lg bg-indigo-600 px-3 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                >
                  Random hash
                </button>
                <div className="ml-3 flex items-center">
                  <input
                    id="autoRefresh"
                    aria-describedby="autoRefresh"
                    name="autoRefresh"
                    type="checkbox"
                    checked={autoRefresh}
                    onClick={(e) => setAutoRefresh(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="autoRefresh" className="ml-3 font-medium text-gray-700">
                    Auto-refresh
                  </label>
                </div>
              </div>
              <div className="flex text-sm mt-3">
                <label htmlFor="hash" className="flex font-medium text-gray-700 items-center">
                  Hash
                </label>
                <div className="ml-3 w-full">
                  <input
                    type="text"
                    name="hash"
                    id="hash"
                    value={hash}
                    onChange={(event) => setHash(event.target.value)}
                    className="inline w-full h-7 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex-row">
              <div className="flex w-36 justify-end">
                <button type="button" onClick={handleRun}>
                  <PlayCircleIcon className="h-12 w-12 text-green-400" aria-hidden="true" />
                </button>
              </div>
              <div>
                <button type="button" onClick={(event) => handleCreate(event)} className="text-sm hover:underline">
                  Create collection
                  <ArrowTopRightOnSquareIcon className="inline ml-1 h-3 w-3" aria-hidden="true" />
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
