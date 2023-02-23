import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { remark } from "remark";
import html from "remark-html";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const CollectionItem = () => {
  const router = useRouter();
  const { data: collection, error } = useSWR(`/api/collection/${router.query.id}`, fetcher);
  const [src, setSrc] = useState("");
  const [description, setDescription] = useState("");

  const date = useMemo(() => {
    if (collection) {
      return collection.completedAt || collection.mintingDate || collection.activatedAt;
    }
  }, [collection]);

  useEffect(() => {
    if (collection) {
      setSrc(`https://media.artblocks.io/thumb/${collection.projectId * 1000000}.png`);
      remark()
        .use(html)
        .process(collection.description)
        .then((markdown) => setDescription(markdown.toString()));
    }
  }, [collection]);

  return (
    <>
      <Head>
        <title>CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">{collection?.name}</h1>
      </header>
      <div className="bg-gray-100 pb-14">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 space-x-8">
            <div>
              {collection && src && (
                <Image
                  width={350}
                  height={350}
                  className="w-auto h-auto"
                  src={src}
                  alt={collection?.name as string}
                  onError={() => setSrc("/preview-error.png")}
                />
              )}
              <div className="mx-0.5 mt-3 divide-y-2">
                <div className="mb-4">
                  <div className="flex justify-between items-baseline space-x-2 font-semibold text-2xl text-gray-900 mr-4">
                    <div>by {collection?.artistName}</div>
                    <div>#{collection?.projectId}</div>
                  </div>
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
                    {date && <div>{new Date(date * 1000).toUTCString()}</div>}
                  </div>
                  <div className="mt-3 text-gray-500">
                    <div>{collection?.scriptType}</div>
                    <div>{collection?.license}</div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href={`/create/${collection?.id}`}
                      className="w-full text-center rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                    >
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
