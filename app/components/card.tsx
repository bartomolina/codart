import { IABCollection } from "../global";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  collection: IABCollection;
};

const Card = ({ collection}: Props) => {
  const [src, setSrc] = useState(`https://media.artblocks.io/thumb/${collection.projectId * 1000000}.png`);

  let date = collection.completedAt || collection.mintingDate || collection.activatedAt;

  return (
    <div className="bg-white w-full">
      <div>
        <Link href={`/collections/${collection.id}`}>
          <div className="mx-auto divide-y">
            <div className="h-96 relative">
              <Image
                fill
                className="mx-auto object-contain p-5"
                src={src}
                sizes="345px"
                alt={collection.name as string}
                onError={() => setSrc("/preview-error.png")}
              />
            </div>
            <div className="py-7 px-8">
              <div className="flex justify-between items-baseline space-x-2">
                <div>
                  <div className="font-semibold text-xl text-gray-900 leading-5">{collection.name}</div>
                  <div className="text-gray-700 text-lg leading-5 mt-1.5">{collection.artistName}</div>
                </div>
                <div className="text-xl text-gray-700">#{collection.projectId}</div>
              </div>
              <div className="mt-4 flex justify-between items-baseline text-gray-500 text-sm">
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
  );
};

export default Card;
