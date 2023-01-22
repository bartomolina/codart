import Image from "next/image";
import { Project } from "../.graphclient";

type Props = {
  collection: Pick<Project, "script" | "id" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON">;
};

const Card = ({ collection }: Props) => (
  <div className="bg-white divide-y w-full">
    <div className="pt-5 px-5 mb-3">
      <Image
        width={200}
        height={200}
        className="inline-block"
        src={`https://media.artblocks.io/thumb/${collection.projectId}000000.png`}
        alt={collection.name as string}
      />
      <div>{collection.name}</div>
    </div>
  </div>
);

export default Card;
