import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
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

  const scri = "alert('hello');";

  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = "alert('hello');";
  //   script.async = true;
  
  //   document.body.appendChild(script);
  
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);

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
        <title>CodArt</title>
        <meta name="description" content="CodArt" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 space-x-8">
            <div className=" bg-white rounded">
              <CodeMirror
                value={code}
                height="800px"
                extensions={[javascript()]}
                // onChange={onChange}
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <script
            dangerouslySetInnerHTML={{
              __html: scri,
            }}
          ></script>
    </>
  );
};

export default CollectionItem;
