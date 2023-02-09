import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { minify } from "terser";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { ArtblocksCollectionDocument, ArtblocksCollectionQuery, execute } from "../../.graphclient";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import EditorCommands from "../../components/editor-commands";

const CollectionItem = () => {
  const router = useRouter();
  const projectId = router.query.id as string;
  const [collection, setCollection] = useState<ArtblocksCollectionQuery>();
  const [code, setCode] = useState("");
  const [tokenId, setTokenId] = useState("370000131");
  const [hash, setHash] = useState("0xdd22acb08068ae31347cc3669e0cbbf76fc6cf868592245ecc4783f5f83a098b");

  const tokenData = useMemo(() => {
    return `window.tokenData={"tokenId": "${tokenId}", "hash": "${hash}", "hashes": ["${hash}"]};`;
  }, [hash]);
  const p5url = "https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js";
  const p5script = `<script src="${p5url}"></script>`;

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
        console.log(result?.data.project);

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
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">{collection?.name}</h1>
      </header>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto 2xl:max-w-7xl 2xl:px-0 lg:px-8 pb-44 pt-5">
          <div>
            <EditorCommands
              {...{ collection, hash, setHash, tokenId, setTokenId, handleRun, handleCreate }}
            />
          </div>
          <div className="grid grid-cols-8 gap-8 mt-4">
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
