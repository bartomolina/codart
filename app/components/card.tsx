import { IABCollection } from "../global";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  collection: IABCollection;
};

const Card = ({ collection }: Props) => {
  const [src, setSrc] = useState(`https://media.artblocks.io/thumb/${collection.projectId * 1000000}.png`);

  let date = collection.completedAt || collection.mintingDate || collection.activatedAt;

  return (
    <li className="flex space-x-5 overflow-hidden sm:rounded-lg sm:border border-y border-gray-300 shadow hover:shadow-xl hover:-translate-y-1 transform transition">
      <div className="bg-white w-full">
        <div className="h-full">
          <Link href={`/collections/${collection.id}`} className="h-full">
            <div className="mx-auto flex flex-col divide-y h-full">
              <div className="h-96 relative">
                <Image
                  fill
                  className="mx-auto object-contain p-5"
                  src={src}
                  sizes="345px"
                  alt={collection.name as string}
                  onError={() => {
                    if (src.includes("/thumb/")) {
                      setSrc(`https://media.artblocks.io/${collection.projectId * 1000000}.png`);
                    } else {
                      setSrc("/preview-error.png");
                    }
                  }}
                />
              </div>
              <div className="py-6 px-8 inset-y-0 right-0 flex flex-col justify-between relative h-40">
                <div className="flex justify-between items-baseline space-x-2">
                  <div>
                    <div className="font-semibold text-xl text-gray-900 leading-5">{collection.name}</div>
                    <div className="text-gray-700 text-lg leading-5 mt-1.5">{collection.artistName}</div>
                  </div>
                  <div className="text-xl text-gray-700">#{collection.projectId}</div>
                </div>
                <div className="mt-2 flex justify-between items-baseline text-gray-500 text-sm">
                  <div>
                    {collection.invocations}
                    {collection.invocations != collection.maxInvocations && ` / ${collection.maxInvocations}`}
                    {" minted"}
                  </div>
                  {date && <div>{new Date(date * 1000).toDateString()}</div>}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Card;
