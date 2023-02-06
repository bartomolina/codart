import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../.graphclient";

type Props = {
  collection: Pick<Project, "script" | "id" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON">;
};

const Card = ({ collection }: Props) => {
  const [src, setSrc] = useState(`https://media.artblocks.io/thumb/${collection.projectId}000000.png`);

  return (
    <div className="bg-white w-full">
      <div className="pt-8 pb-5 mb-3">
        <div className="mx-auto divide-y">
          <Link href={`/collections/${collection.id}`}>
            <Image
              width={285}
              height={285}
              className="mx-auto"
              src={src}
              alt={collection.name as string}
              onError={() => setSrc("/preview-error.png")}
            />
          </Link>
          <div className="mt-5 pt-3 px-8">
            <div className="flex justify-between items-baseline space-x-2">
              <div className="font-semibold text-xl text-gray-900 leading-5">{collection.name}</div>
              <div className="text-xl text-gray-700">#{collection.projectId}</div>
            </div>
            <div className="text-gray-700 text-lg">{collection.artistName}</div>
            <div className="mt-4 flex justify-between items-baseline text-gray-500 text-sm">
              <div>
                {collection.invocations}
                {collection.invocations != collection.maxInvocations && ` / ${collection.maxInvocations}`}
                {" minted"}
              </div>
              {collection.updatedAt && (
                <div>
                  {new Date(collection.updatedAt * 1000).toDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
