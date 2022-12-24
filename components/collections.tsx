import { useState, useEffect } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { ArtblocksCuratedQueryDocument, ArtblocksCuratedQueryQuery, execute } from "../.graphclient";

const CollectionsList = () => {
  const [data, setData] = useState<ArtblocksCuratedQueryQuery>();

  // useEffect(() => {
  //   execute(ArtblocksCuratedQueryDocument, {}).then((result) => {
  //     setData(result?.data);
  //   });
  // }, [setData]);

  return (
    <>
      <h2 className="sr-only" id="section-1-title">
        Art Blocks Curated
      </h2>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <ul>
            <li>Collection #1</li>
            <li>Collection #2</li>
            <li>Collection #3</li>
            <li>Collection #4</li>
          </ul>
        </div>
      </div>
      <div className="hidden">
        <fieldset>
          {data && (
            <form>
              <label>Data</label>
              <br />
              <textarea value={JSON.stringify(data, null, 2)} readOnly rows={25} />
            </form>
          )}
        </fieldset>
      </div>
    </>
  );
};

export default CollectionsList;
