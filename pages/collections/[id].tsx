import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
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
          setCollection(result?.data.project);
          setSrc(`https://media.artblocks.io/thumb/${result?.data.project.projectId}000000.png`);
          return remark().use(html).process(result?.data.project.description);
        })
        .then((result) => {
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
              <div className="mx-0.5 mt-3 divide-y-2">
                <div className="mb-4">
                  <div className="flex justify-between items-baseline space-x-2 font-semibold text-2xl text-gray-900 mr-4">
                    <div>{collection?.name}</div>
                    <div>#{collection?.projectId}</div>
                  </div>
                  <div className="-mt-0.5 text-xl text-gray-700">{collection?.artistName}</div>
                  <a
                    href={collection?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-500"
                  >
                    {collection?.website}
                  </a>
                </div>
                <div className="pt-4">
                  <div className="text-gray-500">
                    <div>
                      {collection?.invocations}
                      {collection?.invocations != collection?.maxInvocations && ` / ${collection?.maxInvocations}`}
                      {" minted"}
                    </div>
                    {collection?.minterConfiguration?.startTime && (
                      <div>{new Date(collection?.minterConfiguration.startTime * 1000).toUTCString()}</div>
                    )}
                  </div>
                  <div className="mt-3 text-gray-500">
                    <div>{collection?.scriptTypeAndVersion}</div>
                    <div>{collection?.license}</div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href={`/editor/${collection?.id}`}
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2">
                      Open in editor
                    </Link>
                  </div>
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
