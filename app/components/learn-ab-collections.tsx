import { IABCollection } from "../global";
import Card from "../components/card";

type Props = {
  filteredCollections: IABCollection[];
};

const LearnArtBlocksCollections = ({ filteredCollections }: Props) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    {filteredCollections.map((collection) => (
      <Card key={collection.id} collection={collection} />
    ))}
  </ul>
);

export default LearnArtBlocksCollections;
