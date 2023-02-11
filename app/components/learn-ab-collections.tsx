import Card from "../components/card";

const LearnArtBlocksCollections = ({ filteredCollections }) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    {filteredCollections.map(
      (collection: Pick<Project, "id" | "name" | "updatedAt" | "curationStatus" | "artistName" | "scriptJSON">) => (
        <li
          key={collection.id}
          className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow hover:-translate-y-1 transform transition"
        >
          <Card collection={collection} />
        </li>
      )
    )}
  </ul>
);

export default LearnArtBlocksCollections;
