import Head from "next/head";

const About = () => (
  <>
    <Head>
      <title>About - CodArt.io</title>
      <meta name="description" content="CodArt" />
    </Head>
    <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
      <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">About</h1>
    </header>
    <div className="bg-gray-100">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-44 pt-5">
        <div className="mx-auto w-full rounded-lg bg-white p-8">
          <h2 className="text-2xl font-semibold mt-0 mb-5 text-gray-800">About the project</h2>
          <div className="text-lg font-light text-gray-700 space-y-5">
            <p>
              When I fell into the rabbit hole of crypto, one of the things I found more fascinating was NFTs, and
              especially generative art. I believe that generative art has truly found its place in the blockchain and
              it's an excellent use case for crypto. I find it remarkable how the space has survived the ups and downs
              of the markets and how it appears that the space is still as vibrant and moving forward.
            </p>
            <p>
              Without doubt,{" "}
              <a href="https://www.artblocks.io/" target="_blank" rel="noopener noreferrer" className="underline">
                ArtBlocks
              </a>{" "}
              is the reference in the generative art space. They've done an amazing job promoting and curating artists.
              And without them, most probably it would've taken a few more years for the space to reach to the levels it
              is right now.
            </p>
            <p>
              This project is a way to celebrate and appreciate the work that Art Blocks has done in the past years and
              the artists who published their work through them.
            </p>
          </div>
          <h2 className="text-2xl font-semibold mt-10 mb-5 text-gray-800">Why CodArt.io</h2>
          <div className="text-lg font-light text-gray-700 space-y-5">
            <p>
              If you get interested in generative art (and more specifically Art Blocks) , there's a few sites that will
              help you navigate the space:
            </p>
            <p>
              <ul className="list-disc list-inside ml-5 space-y-3">
                <li>
                  <a href="https://www.artblocks.io/" target="_blank" rel="noopener noreferrer" className="underline">
                    Art Blocks
                  </a>
                  : The official Art Blocks{" "}
                  <a href="https://docs.artblocks.io/" target="_blank" rel="noopener noreferrer" className="underline">
                    documentation
                  </a>
                  , their{" "}
                  <a href="https://www.youtube.com/channel/UCJ3do9nWP6qaJkcbxZaJZ4w" target="_blank" rel="noopener noreferrer" className="underline">
                    Youtube
                  </a>{" "}
                  channel and their{" "}
                  <a href="https://github.com/ArtBlocks" target="_blank" rel="noopener noreferrer" className="underline">
                    GitHub
                  </a>{" "}
                  are a great place to start.
                </li>
                <li>
                  <a href="https://artacle.io/" target="_blank" rel="noopener noreferrer" className="underline">
                    Artacle
                  </a>
                  : If you're interested in the trading side and information related to the secondary market.
                </li>
                <li>
                  <a href="https://gallery.so/" target="_blank" rel="noopener noreferrer" className="underline">
                    Gallery
                  </a>
                  : A social network for NFT art that helps you discover net art and see what's trending.
                </li>
                <li>
                  <a href="https://tender.art/" target="_blank" rel="noopener noreferrer" className="underline">
                    Tender
                  </a>
                  : With some great articles and interviews about generative art and NFTs in general.
                </li>
              </ul>
            </p>
            <p>
              However, given my technical background, I was especially interested in knowing how Art Blocks works behind
              the scenes, how the Art Blocks contracts are structured, how to access the code behind the collections,
              and how the art is generated. CodArt allows you to explore the Art Blocks collections, and let you view
              and play with the code to see how the different outputs are generated.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
