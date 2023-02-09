const EditorCommands = ({
  collection,
  hash,
  setHash,
  tokenId,
  setTokenId,
  handleRun,
  handleCreate,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-5">
          <div className="flex justify-between">
            <div className="flex-row">
              <div className="flex text-sm">
                <label htmlFor="tokenId" className="flex font-medium text-gray-700 items-center">
                  Token ID
                </label>
                <div className="ml-3">
                  <input
                    type="number"
                    name="tokenId"
                    id="tokenId"
                    value={tokenId}
                    onChange={(event) => setTokenId(event.target.value)}
                    className="block w-32 h-7 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex text-sm mt-3">
                <label htmlFor="hash" className="flex font-medium text-gray-700 items-center">
                  Hash
                </label>
                <div className="ml-3">
                  <input
                    type="text"
                    name="hash"
                    id="hash"
                    value={hash}
                    onChange={(event) => setHash(event.target.value)}
                    className="block w-[560px] h-7 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex-row">
              <div>Run</div>
              <div>Create collection</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* <div className="flex">
        <div>
          <div className="mt-1">
            <input
              type="text"
              id="hash"
              name="hash"
              value={tokenHash}
              onChange={(event) => setTokenHash(event.target.value)}
              className="mr-3 block max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleRun}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
        >
          Run
        </button>
        <button
          type="button"
          onClick={handleCreate}
          className="ml-3 rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
        >
          Create collection
        </button>
      </div> */}
    </>
  );
};

export default EditorCommands;
