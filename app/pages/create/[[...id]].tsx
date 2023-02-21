// @ts-nocheck
import { IABCollection, ICACollectionInfo } from "../../global";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { minify } from "terser";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import libraries from "../../lib/utils";
import { useCodArt } from "../../components/collections-context";
// @ts-ignore
import prettier from "prettier/esm/standalone.mjs";
// @ts-ignore
import parserBabel from "prettier/esm/parser-babel.mjs";
import { getCollectionDataFromFS } from "../../lib/artblocks-cache";
import EditorCommands from "../../components/editor-commands";

const defaultCode = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`;

type Props = {
  aBCollection: IABCollection;
};

const CollectionItem = ({ aBCollection }: Props) => {
  const router = useRouter();
  const projectId = router.query.id ? (router.query.id[0] as string) : undefined;
  const [collection, setCollection] = useState<IABCollection | ICACollectionInfo | undefined>();
  const { cACollections } = useCodArt();
  const [code, setCode] = useState(defaultCode);
  const [tokenId, setTokenId] = useState("0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [hash, setHash] = useState(ethers.utils.hexlify(ethers.utils.randomBytes(32)));
  const [library, setLibrary] = useState<keyof typeof libraries>("p5");
  const isAB = projectId?.includes("-");

  const libraryScript = `<script src="${libraries[library] as string}"></script>`;

  const generateOutput = (_hash) => {
    if (document) {
      const tokenData = `window.tokenData={"tokenId": "${tokenId}", "hash": "${_hash}", "hashes": ["${_hash}"]};`;
      const wrappedCode = `<html><head>${libraryScript}</head><body><script>${tokenData}${code}</script></body></html>`;
      // @ts-ignore
      document.getElementById("canvasIframe").srcdoc = wrappedCode;
    }
  };

  const handleRun = (event: FormEvent) => {
    event.preventDefault();
    generateOutput(hash);
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
    setCollection(undefined);
    let formattedCode = defaultCode;
    if (router.isReady && projectId) {
      let _collection;

      if (isAB && aBCollection) {
        _collection = aBCollection;
        if (_collection) {
          formattedCode = _collection.script;
        }
        if (_collection?.scriptType === "p5" || _collection?.scriptType === "three") {
          setLibrary(_collection?.scriptType);
        }
      } else if (!isAB && cACollections.length) {
        const _cACollection = cACollections.find((c) => c._address === projectId);
        if (_cACollection && _cACollection.info) {
          _collection = _cACollection.info;
          formattedCode = _collection.code;
        }
      }
      if (_collection) {
        setCollection(_collection);
        console.log(_collection);

        try {
          formattedCode = prettier.format(formattedCode, {
            parser: "babel",
            plugins: [parserBabel],
          });
        } catch {}
      }
    }
    setCode(formattedCode);
  }, [router, cACollections, isAB, projectId]);

  const updateHash = (_hash: string) => {
    setHash(_hash);
    if (autoRefresh) {
      generateOutput(_hash);
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
      <div className="bg-gray-100 pb-14">
        {router.isReady && (!isAB || (isAB && collection)) && (
          <div className="mx-auto 2xl:max-w-7xl 2xl:px-0 lg:px-8 pt-5">
            <div>
              <EditorCommands
                {...{
                  isAB,
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
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data = [];
  if (context.query.id) {
    data = await getCollectionDataFromFS(context.query.id[0] as string);
  }
  return {
    props: {
      aBCollection: data,
    },
  };
};

export default CollectionItem;
