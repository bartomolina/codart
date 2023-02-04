import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Editor from "react-simple-code-editor";
import { ArtblocksCollectionDocument, ArtblocksCollectionQuery, execute } from "../../.graphclient";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";

const CollectionItem = () => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const [collection, setCollection] = useState<ArtblocksCollectionQuery>();
  const [src, setSrc] = useState("/preview-error.png");
  const [code, setCode] = useState(`function add(a, b){return a + b;}`);

  useEffect(() => {
    if (projectId) {
      execute(ArtblocksCollectionDocument, { id: projectId }).then((result) => {
        setCollection(result?.data.project);
        console.log(result);
        setSrc(`https://media.artblocks.io/thumb/${result?.data.project.projectId}000000.png`);

        const formattedCode = prettier.format(result?.data.project.script, {
          parser: "babel",
          plugins: [parserBabel],
        });

        setCode(formattedCode);
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
          <div className="grid grid-cols-4">
            <div>
              {collection && (
                <Image
                  width={255}
                  height={255}
                  src={src}
                  alt={collection?.name as string}
                  onError={() => setSrc("/preview-error.png")}
                />
              )}
              <div className="mx-0.5 mt-3">
                <div className="font-semibold text-lg text-gray-900">{collection?.name}</div>
                <div className="-mt-1 text-sm text-gray-500">{collection?.artistName}</div>
                <div className="-mt-1 text-sm text-gray-500">{collection?.artistName}</div>
              </div>
            </div>

            {collection && (
              <div className="col-span-3 bg-white rounded">
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
