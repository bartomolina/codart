import { truncateEthAddress } from "../lib/utils";

const LearnCodArtCollections = ({ cACollections }) => (
  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Name
          </th>
          {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Symbol
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Arbiter
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Beneficiary
          </th>
          <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
            Status
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Actions</span>
          </th> */}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {cACollections.map((collection) => (
          <tr key={collection.addr} className="h-24">
            <td className="py-4 pl-4 text-sm sm:pl-6">
              <div className="flex items-center">
                <div className="font-semibold text-xl text-gray-800">{collection.name}</div>
              </div>
            </td>
            {/* <td className="px-3 py-4 text-xl text-gray-500">
              <div className="text-gray-600 space-x-1">
                <span>{ethers.utils.formatEther(goal.value)}</span>
                <Image
                  src="/eth-diamond-black.png"
                  alt="ETH"
                  width={9}
                  height={15}
                  className="inline align-baseline opacity-80"
                />
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="font-mono text-gray-800">{formatAddress(goal.arbiter)}</div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="font-mono text-gray-800">{formatAddress(goal.beneficiary)}</div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <GoalStatus goal={goal} />
            </td>
            <td className="relative py-2 pl-3 pr-4 text-right text-xl font-medium sm:pr-6">
              {waitingApproval(goal) && (
                <div className="space-x-3 flex justify-center">
                  <button
                    type="button"
                    onClick={(e) => handleApproval(e, goal.addr, "approve")}
                    disabled={isLoading}
                    className={
                      !isLoading
                        ? "rounded-md bg-green-500 py-2 px-3 text-white shadow-sm hover:bg-green-400 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
                        : "rounded-md bg-green-200 py-2 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
                    }
                  >
                    {"👍"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleApproval(e, goal.addr, "reject")}
                    disabled={isLoading}
                    className={
                      !isLoading
                        ? "rounded-md bg-red-500 py-2 px-3 text-white shadow-sm hover:bg-red-400 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                        : "rounded-md bg-red-200 py-2 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                    }
                  >
                    {"👎"}
                  </button>
                </div>
              )}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LearnCodArtCollections;
