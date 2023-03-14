import { IABCollection, ICACollection } from "../../global";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { minify } from "terser";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import useSWR from "swr";
import { libraries, defaultCode } from "../../lib/utils";
import { useCodArt } from "../../components/collections-context";
// @ts-ignore
import prettier from "prettier/esm/standalone.mjs";
// @ts-ignore
import parserBabel from "prettier/esm/parser-babel.mjs";
import { getABCollection } from "../../lib/artblocks";
import EditorCommands from "../../components/editor-commands";

const CollectionItem = () => {
  const router = useRouter();
  const { cACollections } = useCodArt();
  const [collection, setCollection] = useState<IABCollection | ICACollection | undefined>();
  const [code, setCode] = useState(defaultCode);
  const [wordWrap, setWordWrap] = useState(true);
  const [tokenId, setTokenId] = useState("0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [minter, setMinter] = useState("Owner");
  const [hash, setHash] = useState(ethers.utils.hexlify(ethers.utils.randomBytes(32)));
  const [library, setLibrary] = useState<keyof typeof libraries>("p5");

  const projectId = useMemo(() => (router.query.id ? (router.query.id[0] as string) : undefined), [router.query.id]);
  const isAB: boolean = useMemo(() => (projectId?.includes("-") ? true : false), [projectId]);
  const libraryScript = useMemo(() => `<script src="${libraries[library] as string}"></script>`, [library]);
  const { data: aBCollection } = useSWR(
    () => (router.query.id && router.query.id[0] && isAB ? router.query.id[0] : null),
    getABCollection
  );
  const invocations = useMemo(() => {
    return aBCollection?.invocations;
  }, [aBCollection]);

  const generateOutput = (_hash: string) => {
    if (document) {
      const tokenData = `window.tokenData={"tokenId": "${tokenId}", "hash": "${_hash}", "hashes": ["${_hash}"], "minter": "${minter}"};`;
      const wrappedCode = `<html><head>${libraryScript}</head><body style="margin: 0px">${
        code.includes("createCanvas") ? "" : "<canvas />"
      }<script>${tokenData}${code}</script></body></html>`;
      // @ts-ignore
      document.getElementById("canvasIframe").srcdoc = wrappedCode;
    }
  };

  const handleRun = (event: FormEvent) => {
    event.preventDefault();
    generateOutput(hash);
  };

  const updateHash = (_hash: string) => {
    setHash(_hash);
    if (autoRefresh) {
      generateOutput(_hash);
    }
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
    if (projectId) {
      let _collection;

      if (isAB && aBCollection) {
        _collection = aBCollection;
        formattedCode = _collection.script;
        if (_collection?.scriptType === "p5" || _collection?.scriptType === "three") {
          setLibrary(_collection?.scriptType);
        }
      } else if (!isAB) {
        const _cACollection = cACollections.find((c) => c._address === projectId);
        if (_cACollection) {
          _collection = _cACollection;
          formattedCode = _collection.code;
        }
      }
      if (_collection) {
        setCollection(_collection);

        try {
          formattedCode = prettier.format(formattedCode, {
            parser: "babel",
            plugins: [parserBabel],
          });
        } catch {}
      }
    }
    setCode(formattedCode);
  }, [projectId, aBCollection, cACollections]);

  return (
    <>
      <Head>
        <title>Editor - CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl px-6 lg:px-8 pt-4 pb-8">
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
                  minter,
                  setMinter,
                  tokenId,
                  invocations,
                  setTokenId,
                  handleRun,
                  autoRefresh,
                  setAutoRefresh,
                  wordWrap,
                  setWordWrap,
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
                  extensions={[...(wordWrap ? [EditorView.lineWrapping] : []), javascript()]}
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

export default CollectionItem;
