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
      <div className="pt-10 pb-5 px-5 mb-3">
        <div className="w-64 mx-auto">
          <Link href={`/collections/${collection.id}`}>
            <Image
              width={255}
              height={255}
              className="mx-auto"
              src={src}
              alt={collection.name as string}
              onError={() => setSrc("/preview-error.png")}
            />
          </Link>
          <div className="mx-0.5 mt-3">
            <div className="font-semibold text-lg text-gray-900">{collection.name}</div>
            <div className="-mt-1 text-sm text-gray-500">{collection.artistName}</div>
            <div className="-mt-1 text-sm text-gray-500">#{collection.projectId}</div>
            <div className="-mt-1 text-sm text-gray-500">{collection.complete ? "Completed" : "Upcoming"}</div>
            <div className="-mt-1 text-sm text-gray-500">{collection.minterConfiguration?.minter?.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
