import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArtblocksCollectionDocument, ArtblocksCollectionQuery, execute } from "../../.graphclient";
// import CodeEditor from "@uiw/react-textarea-code-editor";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const CollectionItem = () => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const [collection, setCollection] = useState<ArtblocksCollectionQuery>();
  const [src, setSrc] = useState("/preview-error.png");
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  useEffect(() => {
    console.log(projectId);
    if (projectId) {
      execute(ArtblocksCollectionDocument, { id: projectId }).then((result) => {
        console.log("Collection: ", result);
        setCollection(result?.data.project);
        console.log(result?.data.project.projectId);
        setSrc(`https://media.artblocks.io/thumb/${result?.data.project.projectId}000000.png`);
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
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-4">
            <div>
              {collection && (
                <Image
                  width={255}
                  height={255}
                  src={src}
                  alt={(collection?.name as string)}
                  onError={() => setSrc("/preview-error.png")}
                />
              )}
            </div>
            {/* <div className="col-span-3">{collection?.script}</div> */}
            <div className="col-span-3">
              <Editor
                value={collection?.script}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
