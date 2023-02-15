import Head from "next/head";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

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
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  <span>About the project</span>
                  <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-indigo-500`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 space-y-5">
                  <p>
                    When I fell into the rabbit hole of crypto, one of the things I found more fascinating was NFTs, and
                    especially generative art. I believe that generative art has truly found its place in the blockchain
                    and it’s an excellent use case for crypto. I find it remarkable how the space has survived the ups
                    and downs of the markets and how it appears that the space is still as vibrant and moving forward.
                  </p>
                  <p>
                    Without doubt,{" "}
                    <a href="https://www.artblocks.io/" target="_blank" rel="noopener noreferrer">
                      ArtBlocks
                    </a>{" "}
                    is the reference in the generative art space. They’ve done an amazing job promoting and curating
                    artists. And without them, most probably it would’ve taken a few years more for the space to reach
                    to the levels it is right now.
                  </p>
                  <p>
                    This project is a way to celebrate and appreciate the work that Art Blocks has done in the past
                    years and the artists who published their work through them.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  <span>Why CodArt.io</span>
                  <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-indigo-500`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 space-y-5">
                  <p>
                    If you get interested in generative art (and more specifically Art Blocks) , there’s a few sites
                    that will help you navigate the space:
                  </p>
                  <p>
                    <ul>
                      <li>
                        <a href="https://www.artblocks.io/" target="_blank" rel="noopener noreferrer">
                          Art Blocks
                        </a>
                      </li>
                      <li>
                        <a href="https://artacle.io/" target="_blank" rel="noopener noreferrer">
                          Artacle
                        </a>
                        : If you’re interested in the trading side and information related to the secondary market.
                      </li>
                      <li>
                        <a href="https://gallery.so/" target="_blank" rel="noopener noreferrer">
                          Gallery
                        </a>
                        : A social network for NFT art that helps you discover net art and see what’s trending.
                      </li>
                      <li>
                        <a href="https://tender.art/" target="_blank" rel="noopener noreferrer">
                          Tender
                        </a>
                        : With some great articles and interviews about generative art and NFTs in general.
                      </li>
                    </ul>
                  </p>
                  <p>
                    However, given my technical background, I was especially interested in knowing how Art Blocks works
                    behind the scenes, how the Art Blocks contracts are structured, how to access the code behind the
                    collections, and how’s the art is generated. CodArt allows you to explore the Art Blocks
                    collections, and let you view and play with the code to see how the different outputs are generated.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  </>
);

export default About;
