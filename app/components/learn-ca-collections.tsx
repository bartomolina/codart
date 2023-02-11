import { ICACollection } from "../global";
import { useRouter } from "next/router";

type Props = {
  cACollections: ICACollection[];
};

const LearnCodArtCollections = ({ cACollections }: Props) => {
  const router = useRouter();

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3 pl-6 text-left text-sm font-semibold text-gray-900">
              Name
            </th>
            <th scope="col" className="py-3 text-left text-sm font-semibold text-gray-900">
              Artist
            </th>
            <th scope="col" className="py-3 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
            <th scope="col" className="py-3 text-left text-sm font-semibold text-gray-900">
              Library
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {cACollections.map((collection) => (
            <tr
              key={collection._address}
              className="h-16 hover:bg-gray-50 hover:cursor-pointer"
              onClick={() =>
                router.push({
                  pathname: `/create/${collection._address}`,
                })
              }
            >
              <td className="pl-6">
                <div className="font-semibold text-xl text-gray-800">{collection.info.name}</div>
              </td>
              <td>
                <div className="text-gray-500">{collection.info.artist}</div>
              </td>
              <td>
                <div className="text-sm text-gray-500">{collection.info.description}</div>
              </td>
              <td>
                <div className="text-sm text-gray-500">{collection.info._library}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LearnCodArtCollections;
