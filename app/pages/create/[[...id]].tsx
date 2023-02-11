// @ts-nocheck
import { IABCollection, ICACollectionInfo } from "../../global";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { minify } from "terser";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import libraries from "../../lib/utils";
import { useArtBlocks } from "../../components/collections-context";
// @ts-ignore
import prettier from "prettier/esm/standalone.mjs";
// @ts-ignore
import parserBabel from "prettier/esm/parser-babel.mjs";
import EditorCommands from "../../components/editor-commands";

const CollectionItem = () => {
  const router = useRouter();
  const projectId = router.query.id ? (router.query.id[0] as string) : undefined;
  const [collection, setCollection] = useState<IABCollection | ICACollectionInfo | undefined>();
  const { cACollections, aBCollections } = useArtBlocks();
  const [code, setCode] = useState(`function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
  }`);
  const [tokenId, setTokenId] = useState("0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [hash, setHash] = useState(ethers.utils.hexlify(ethers.utils.randomBytes(32)));
  const [library, setLibrary] = useState<keyof typeof libraries>("p5");
  const isAB = projectId?.includes("-");

  const libraryScript = `<script src="${libraries[library] as string}"></script>`;

  const generateOutput = () => {
    if (document) {
      const tokenData = `window.tokenData={"tokenId": "${tokenId}", "hash": "${hash}", "hashes": ["${hash}"]};`;
      const wrappedCode = `${libraryScript}<script>${tokenData}${code}</script>`;
      // @ts-ignore
      document.getElementById("canvasIframe").srcdoc = wrappedCode;
    }
  };

  const handleRun = (event: FormEvent) => {
    event.preventDefault();
    generateOutput();
  };

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    minify(code).then((result) =>
      router.push(
        {
          pathname: "/create/new",
          query: { script: result.code as string },
        },
        "/create/new"
      )
    );
  };

  useEffect(() => {
    if (router.isReady && projectId) {
      let _collection;
      let formattedCode;

      if (isAB && aBCollections.length) {
        _collection = aBCollections.find((c) => c.id === projectId);
        if (_collection) {
          formattedCode = _collection.script;
        }
      } else if (!isAB && cACollections.length) {
        const _cACollection = cACollections.find((c) => c._address === projectId);
        if (_cACollection && _cACollection.info) {
          _collection = _cACollection.info;
          formattedCode = _collection.code;
        }
      }
      if (_collection && cACollections.length) {
        setCollection(_collection);
        console.log(_collection);

        try {
          formattedCode = prettier.format(formattedCode, {
            parser: "babel",
            plugins: [parserBabel],
          });
        } catch {}

        setCode(formattedCode);
      }
    }
  }, [router.isReady, cACollections, aBCollections]);

  const updateHash = (_hash: string) => {
    setHash(_hash);
    if (autoRefresh) {
      generateOutput();
    }
  };

  return (
    <>
      <Head>
        <title>CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">
          {collection?.name ? collection.name : "Create"}
        </h1>
      </header>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto 2xl:max-w-7xl 2xl:px-0 lg:px-8 pb-44 pt-5">
          <div>
            <EditorCommands
              {...{
                collection,
                hash,
                updateHash,
                tokenId,
                invocations: collection?.invocations,
                setTokenId,
                handleRun,
                autoRefresh,
                setAutoRefresh,
                library,
                setLibrary,
                handleCreate,
              }}
            />
          </div>
          <div className="grid grid-cols-8 gap-5 mt-4">
            <div className="bg-white rounded col-span-5">
              <CodeMirror
                value={code}
                height="800px"
                theme={dracula}
                extensions={[javascript()]}
                onChange={(code) => setCode(code)}
              />
            </div>
            <iframe
              scrolling="no"
              style={{ overflow: "hidden" }}
              className="overflow-hidden w-full h-full col-span-3"
              id="canvasIframe"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
