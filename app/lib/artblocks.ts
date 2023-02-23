import { IABCollection } from "../global";
import { ArtblocksCollectionsDocument, ArtblocksCollectionDocument, execute } from "../.graphclient";

export const getABCollection = async (id: string): Promise<IABCollection> => {
  return execute(ArtblocksCollectionDocument, {id}).then((result) => 
  {
    return result?.data.project as IABCollection
  });
}

export const getABCollections = async (): Promise<Array<IABCollection>> => {
  let projects: Array<IABCollection> = [];
  return execute(ArtblocksCollectionsDocument, {})
    .then((result) => {
      projects = result?.data.projects as IABCollection[];
      projects.map((collection) => {
        // Flatten properties
        collection.contractAddress = collection.contract?.id || null;
        collection.mintingDate = collection.minterConfiguration?.startTime || null;
        collection.scriptLength = collection.script?.length || null;
        collection.script = null;
        collection.description = null;
        collection.scriptType = collection.scriptTypeAndVersion;

        // Parse numbers
        collection.activatedAt = parseInt(collection.activatedAt) || null;
        collection.completedAt = parseInt(collection.completedAt) || null;
        collection.invocations = parseInt(collection.invocations) || null;
        collection.maxInvocations = parseInt(collection.maxInvocations) || null;
        collection.projectId = parseInt(collection.projectId);
        collection.mintingDate = parseInt(collection.mintingDate) || null;
        collection.updatedAt = parseInt(collection.updatedAt) || null;

        if (!collection.scriptType && collection.scriptJSON) {
          collection.scriptType = JSON.parse(collection.scriptJSON).type;
        }
        if (collection.scriptType) {
          collection.scriptType = collection.scriptType.replace("p5js", "p5");
          collection.scriptType = collection.scriptType.replace("threejs", "three");
          collection.scriptType = collection.scriptType.replace("paperjs", "paper");
          collection.scriptType = collection.scriptType.replace("tonejs", "tone");
          if (collection.scriptType.indexOf("@") >= 0) {
            collection.scriptType = collection.scriptType.substr(0, collection.scriptType.indexOf("@"));
          }
        }
      });

      projects = projects.sort((a, b) => {
        const bDate = b.completedAt || b.mintingDate || b.activatedAt;
        const aDate = a.completedAt || a.mintingDate || a.activatedAt;
        return bDate - aDate;
      });
    })
    .then(() => projects);
};
