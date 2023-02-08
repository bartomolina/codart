import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { minify } from "terser";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { ArtblocksCollectionDocument, ArtblocksCollectionQuery, execute } from "../../.graphclient";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";

const CollectionItem = () => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const [collection, setCollection] = useState<ArtblocksCollectionQuery>();
  const [code, setCode] = useState("");
  const [tokenHash, setTokenHash] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  const tokenData = useMemo(() => {
    return `window.tokenData={hash: "${tokenHash}"};`;
  }, [tokenHash]);
  const p5script = `<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>`;

  const handleRun = (event: FormEvent) => {
    event.preventDefault();
    const wrappedCode = `${p5script}<script>${tokenData}${code}</script>`;
    document.getElementById("canvasIframe").srcdoc = wrappedCode;
  };

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    console.log(code);
    minify(code).then((result) =>
      router.push(
        {
          pathname: "/create",
          query: { script: result.code as string },
        },
        "/create"
      )
    );
  };

  useEffect(() => {
    if (projectId) {
      execute(ArtblocksCollectionDocument, { id: projectId }).then((result) => {
        setCollection(result?.data.project);
        console.log(result);

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
        <title>CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-44 pt-5">
          <div>
            <div className="flex">
              <div>
                <div className="mt-1">
                  <input
                    type="text"
                    id="hash"
                    name="hash"
                    value={tokenHash}
                    onChange={(event) => setTokenHash(event.target.value)}
                    className="mr-3 block max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleRun}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
              >
                Run
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="ml-3 rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
              >
                Create collection
              </button>
            </div>
          </div>
          <div className="grid grid-cols-8 space-x-8 mt-4">
            <div className="bg-white rounded col-span-5">
              <CodeMirror value={code} height="800px" extensions={[javascript()]} onChange={(code) => setCode(code)} />
            </div>
            <main>
              <iframe width={600} height={800} scrolling="no" className="overflow-hidden" id="canvasIframe" />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
