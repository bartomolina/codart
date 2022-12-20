import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArtblocksCuratedQueryDocument, ArtblocksCuratedQueryQuery, execute } from "../.graphclient";

export default function Home() {
  const [data, setData] = useState<ArtblocksCuratedQueryQuery>();

  useEffect(() => {
    execute(ArtblocksCuratedQueryDocument, {}).then((result) => {
      setData(result?.data);
    });
  }, [setData]);

  return (
    <>
      <Head>
        <title>Artblocks</title>
        <meta name="description" content="Web3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Explorer</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div>
              <fieldset>
                {data && (
                  <form>
                    <label>Data</label>
                    <br />
                    <textarea value={JSON.stringify(data, null, 2)} readOnly rows={25} />
                  </form>
                )}
              </fieldset>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
