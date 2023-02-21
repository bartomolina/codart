import Head from "next/head";
import Image from "next/image";

const About = () => (
  <>
    <Head>
      <title>About - CodArt.io</title>
      <meta name="description" content="CodArt" />
    </Head>
    <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 pt-4 pb-8">
      <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">About</h1>
    </header>
    <div className="bg-gray-100 pb-14">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb- pt-5">
        <div className="mx-auto w-full rounded-lg bg-white py-8 px-20">
          <h2 className="text-2xl font-semibold mt-0 mb-5 text-gray-800">About the project</h2>
          <div className="text-lg font-light text-gray-700 space-y-5">
            <p>
              When I fell into the rabbit hole of crypto, one of the things that captivated me were NFTs, and especially
              generative art. I believe that generative art has truly found its place in the blockchain and it&apos;s an
              excellent use case for crypto. I find it remarkable how the space has survived the ups and downs of the
              markets and how it appears that the space is still as vibrant and moving forward.
            </p>
            <p>
              Without doubt,{" "}
              <a href="https://www.artblocks.io/" target="_blank" rel="noopener noreferrer" className="underline">
                ArtBlocks
              </a>{" "}
              is the reference in the generative art space. They&apos;ve done an amazing job promoting and curating
              artists. And without them, most probably it would&apos;ve taken a few more years for the space to reach to
              the levels it is right now.
            </p>
            <p>
              This project is a way to celebrate and appreciate the work that Art Blocks and the artists who published
              their work through them have done in the past years.
            </p>
          </div>
          <h2 className="text-2xl font-semibold mt-10 mb-5 text-gray-800">Why CodArt.io</h2>
          <div className="text-lg font-light text-gray-700 space-y-5">
            <p>
              If you get interested in generative art (and more specifically Art Blocks) , there&apos;s a few sites that
              will help you navigate the space:
            </p>
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
                <a
                  href="https://www.youtube.com/channel/UCJ3do9nWP6qaJkcbxZaJZ4w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Youtube
                </a>{" "}
                channel and their{" "}
                <a href="https://github.com/ArtBlocks" target="_blank" rel="noopener noreferrer" className="underline">
                  GitHub
                </a>{" "}
                are a great place to start. You can find some great information in the Art Block&apos;s{" "}
                <a href="https://t.co/NyvH1S1yvM" target="_blank" rel="noopener noreferrer" className="underline">
                  discord
                </a>{" "}
                too.
              </li>
              <li>
                <a href="https://artacle.io/" target="_blank" rel="noopener noreferrer" className="underline">
                  Artacle
                </a>
                : If you&apos;re interested in the trading side and everything related to the secondary market.
              </li>
              <li>
                <a href="https://gallery.so/" target="_blank" rel="noopener noreferrer" className="underline">
                  Gallery
                </a>
                : A social network for NFT art, great for discovering new art and see what&apos;s trending.
              </li>
              <li>
                <a href="https://tender.art/" target="_blank" rel="noopener noreferrer" className="underline">
                  Tender
                </a>
                : Great articles and interviews about generative art and NFTs in general.
              </li>
            </ul>
            <p>
              However, given my technical background, I was especially interested in knowing how Art Blocks works
              internally: How the Art Blocks contracts are structured, how to access the code behind the collections,
              and how the art is generated. CodArt allows you to explore the Art Blocks collections, and let you view
              and play with the code to see how the different outputs are generated.
            </p>
          </div>
          <h2 className="text-2xl font-semibold mt-10 mb-5 text-gray-800">How Art Blocks contracts work</h2>
          <div className="text-lg font-light text-gray-700 space-y-5">
            <p>
              This is just a quick summary on how the collections and tokens are stored in the Art Blocks contracts. For
              more detailed information about the different Art Blocks contracts, referer to{" "}
              <a
                href="https://betterprogramming.pub/why-art-blocks-uses-javascript-in-its-smart-contract-e252ceb4cf93/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                this post
              </a>
              .
            </p>
            <p>
              All the Art block collections are stored in the same contract. Since its launch there has been three
              versions of the{" "}
              <a
                href="https://github.com/ArtBlocks/artblocks-contracts#deployed-contract-details"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Art Blocks Core contract
              </a>
              :
            </p>
            <table className="mx-auto">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Contract Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Address
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Collections
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AB Core V0</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <a
                      href="https://etherscan.io/address/0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a
                    </a>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">0-2</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AB Core V1</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <a
                      href="https://etherscan.io/address/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270
                    </a>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">3-373</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AB Core V3</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <a
                      href="https://etherscan.io/address/0x99a9B7c1116f9ceEB1652de04d5969CcE509B069"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      0x99a9B7c1116f9ceEB1652de04d5969CcE509B069
                    </a>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">374-Current</td>
                </tr>
              </tbody>
            </table>
            <p>
              But how are the different collections stored in the same contract? Let&apos;s take the item #195 of
              Renders Game, one of the latest Art Block collections, as an example. If you open the item in{" "}
              <a
                href="https://opensea.io/assets/ethereum/0x99a9b7c1116f9ceeb1652de04d5969cce509b069/415000195"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OpenSea
              </a>{" "}
              and check out the item details or the address bar you&apos;ll notice the address of the Art Blocks Core
              contract, in this case pointing to the latest the AB Core V3. and the Token ID: 415000195. The Token ID is
              formed by the collection ID (415 which corresponds to Renders Game) and the Token ID within the collection
              (#195).
            </p>
            <Image
              width={780}
              height={780}
              className="mx-auto p-5"
              src={"/415000195-OpenSea.png"}
              alt={"415000195 OpenSea"}
            />
            <p>
              Now, we can head to the{" "}
              <a
                href="https://etherscan.io/address/0x99a9B7c1116f9ceEB1652de04d5969CcE509B069#readContract"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                AB Core V3 contract in etherscan
              </a>{" "}
              and call the tokenURI function with the token ID 415000195. We&apos;ll get an address on the Art Blocks
              API pointing to the JSON file holding the token metadata (including the URL to the still image of the
              item), which is what OpenSea uses to display the token information:
            </p>
            <div className="margin-auto flex">
              <Image
                width={480}
                height={480}
                className="mx-auto p-5"
                src={"/415000195-tokenURI.png"}
                alt={"415000195 token URI"}
              />
              <Image
                width={480}
                height={480}
                className="mx-auto p-5"
                src={"/415000195-Metadata.png"}
                alt={"415000195 Metadata"}
              />
            </div>
            <p>
              Both the token metadata and the link to the image are hosted on the Art Blocks servers. Some may argue
              that Art Blocks could use a decentralized storage like IPFS to store this information, but in reality, and
              this is something specific for generative art NFTs, even in the case that the Art Blocks servers become
              unavailable, the code to be able to reproduce the image will be still accessible on-chain.{" "}
              <a
                href="https://medium.com/the-link-art-blocks/how-on-chain-is-art-blocks-5ccd553dd370"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                This is a good post
              </a>{" "}
              about Art Blocks and decentralization if you&apos;re interested in this topic.
            </p>
            <p>
              So how can you access the script and the token hash (the random number generated at the time of minting
              that will produce the unique output)? Back to the AB Core V3 contract in etherscan, we can retrieve the
              collection script and the token hash with the functions <em>tokenIdToHash</em> and{" "}
              <em>projectScriptByIndex</em> respectively:
            </p>
            <div className="margin-auto flex">
              <Image
                width={480}
                height={480}
                className="mx-auto p-5"
                src={"/415000195-hash.png"}
                alt={"415000195 Hash"}
              />
              <Image
                width={480}
                height={480}
                className="mx-auto p-5"
                src={"/415000195-script.png"}
                alt={"415000195 Script"}
              />
            </div>
            <p>
              Generally, the script includes a placeholder for the token Hash (you can search for <em>tokenData</em> in
              the script). Also, the <em>projectScriptDetails</em> function returns the library used by the project:
            </p>
            <Image
              width={480}
              height={480}
              className="mx-auto p-5"
              src={"/415000195-scripttype.png"}
              alt={"415000195 Script Type and Version"}
            />
            <p>
              And that&apos;s all the information you need to be able to recreate a specific output for a given token
              ID. With a simple html page, you could import the required library, the script from the collection and the
              token hash, and generate the output as seen in OpenSea.
            </p>
            <p>It&apos;s worth noting that the majority of the projets use p5.js:</p>
            <table className="mx-auto">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    library
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Collections
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">p5</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">275</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">js</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">80</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">three</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">40</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">others</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">34</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
