import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import { ArtblocksCollectionDocument, ArtblocksCollectionQuery, execute } from "../../.graphclient";

const CollectionItem = () => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const [collection, setCollection] = useState<ArtblocksCollectionQuery>();
  const [src, setSrc] = useState("/preview-error.png");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (projectId) {
      execute(ArtblocksCollectionDocument, { id: projectId })
        .then((result) => {
          console.log(result);
          setCollection(result?.data.project);
          setSrc(`https://media.artblocks.io/thumb/${result?.data.project.projectId}000000.png`);
          return remark().use(html).process(result?.data.project.description);
        })
        .then((result) => {
          console.log(result.toString());
          setDescription(result.toString());
        });
    }
  }, [projectId]);

  return (
    <>
      <Head>
        <title>CodArt</title>
        <meta name="description" content="CodArt" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 space-x-4">
            <div>
              {collection && (
                <Image
                  width={350}
                  height={350}
                  src={src}
                  alt={collection?.name as string}
                  onError={() => setSrc("/preview-error.png")}
                />
              )}
              <div className="mx-0.5 mt-3">
                <div className="font-semibold text-2xl text-gray-900">
                  {collection?.name} <span className="ml-2">#{collection?.projectId}</span>
                </div>
                <div className="-mt-0.5 text-xl text-gray-700">{collection?.artistName}</div>
                <div className="mt-4 text-gray-500">
                  <div>
                    {collection?.invocations}
                    {collection?.invocations != collection?.maxInvocations && ` / ${collection?.maxInvocations}`}
                    {" minted"}
                  </div>
                  {collection?.minterConfiguration?.startTime && (
                    <div>{new Date(collection?.minterConfiguration.startTime * 1000).toUTCString()}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-2 markdown text-lg" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
