import { ICACollection } from "../global";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

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
            <th scope="col" className="py-3 text-left text-sm font-semibold text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {cACollections.map((collection) => (
            <tr key={collection._address} className="h-16 hover:bg-gray-50">
              <td className="pl-6">
                <div className="font-semibold text-xl text-gray-800">
                  <Link href={`/create/${collection._address}`} className="hover:underline">
                    {collection.info.name}
                  </Link>
                </div>
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
              <td>
                <a
                  href={`https://testnets.opensea.io/assets/goerli/${collection._address}/0`}
                  target="_blank"
                >
                  <Image src={"/opensea-logo.png"} alt={collection.info.name} width={25} height={25} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LearnCodArtCollections;
