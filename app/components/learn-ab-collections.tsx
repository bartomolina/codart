import { IABCollection } from "../global";
import Card from "../components/card";

type Props = {
  filteredCollections: IABCollection[],
};

const LearnArtBlocksCollections = ({ filteredCollections }: Props) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    {filteredCollections.map(
      (collection) => (
        <li
          key={collection.id}
          className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow hover:shadow-xl hover:-translate-y-1 transform transition"
        >
          <Card collection={collection} />
        </li>
      )
    )}
  </ul>
);

export default LearnArtBlocksCollections;
