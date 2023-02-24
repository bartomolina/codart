# About the project

When I fell into the rabbit hole of crypto, one of the things that captivated me were NFTs, and especially generative art. I believe that generative art has truly found its place in the blockchain and it's an excellent use case for crypto. I find it remarkable how the space has survived the ups and downs of the markets and how it appears that the space is still as vibrant and moving forward.

Without doubt, [ArtBlocks](https://www.artblocks.io/) is the reference in the generative art space. They've done an amazing job promoting and curating artists. And without them, most probably it would've taken a few more years for the space to reach to the levels it is right now.

I built this site as a final project for the [UNIC NFTs And Metaverse course](https://www.unic.ac.cy/openmetaverse/mooc-nfts-metaverse/) and the [Alchemy's Ethereum Bootcamp](https://university.alchemy.com/) and as a way to celebrate and appreciate the work that Art Blocks and the artists who published their work through them have done in the past years.

# Why CodArt.io

If you get interested in generative art (and more specifically Art Blocks) , there's a few sites that will help you navigate the space:

- [Art Blocks](https://www.artblocks.io/): The official Art Blocks [documentation](https://docs.artblocks.io/), their [Youtube](https://www.youtube.com/channel/UCJ3do9nWP6qaJkcbxZaJZ4w) channel and their [GitHub](https://github.com/ArtBlocks) are a great place to start. You can find some great information in the Art Block's [discord](https://t.co/NyvH1S1yvM) too.
- [Artacle](https://artacle.io/): If you're interested in the trading side and everything related to the secondary market.
- [Gallery](https://gallery.so/): A social network for NFT art, great for discovering new art and see what's trending.
- [Tender](https://tender.art/): Great articles and interviews about generative art and NFTs in general.

However, given my technical background, I was especially interested in knowing how Art Blocks works internally: How the Art Blocks contracts are structured, how to access the code behind the collections, and how the art is generated. CodArt allows you to explore the Art Blocks collections, and let you view and play with the code to see how the different outputs are generated.

# How Art Blocks contracts work

This is just a quick summary on how the collections and tokens are stored in the Art Blocks contracts. For more detailed information about the different Art Blocks contracts, referer to [this post](https://betterprogramming.pub/why-art-blocks-uses-javascript-in-its-smart-contract-e252ceb4cf93).

All the Art block collections are stored in the same contract. Since its launch there has been three versions of the [Art Blocks Core contract](https://github.com/ArtBlocks/artblocks-contracts#deployed-contract-details):

| Contract Name | Address                                    | Collections |
|---------------|--------------------------------------------|-------------|
| AB Core V0    | [0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a](https://etherscan.io/address/0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a) | 0-2         |
| AB Core V1    | [0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270](https://etherscan.io/address/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270) | 3-373       |
| AB Core V3    | [0x99a9B7c1116f9ceEB1652de04d5969CcE509B069](https://etherscan.io/address/0x99a9B7c1116f9ceEB1652de04d5969CcE509B069) | 374-Current |

But how are the different collections stored in the same contract? Let's take the item #195 of Renders Game, one of the latest Art Block collections, as an example. If you open the item in [OpenSea](https://opensea.io/assets/ethereum/0x99a9b7c1116f9ceeb1652de04d5969cce509b069/415000195) and check out the item details or the address bar you'll notice the address of the Art Blocks Core contract, in this case pointing to the latest the AB Core V3. and the Token ID: 415000195. The Token ID is formed by the collection ID (415 which corresponds to Renders Game) and the Token ID within the collection (#195).

![415000195 OpenSea](https://www.codart.io/415000195-OpenSea.png)

Now, we can head to the [AB Core V3 contract in etherscan](https://etherscan.io/address/0x99a9B7c1116f9ceEB1652de04d5969CcE509B069#readContract) and call the tokenURI function with the token ID 415000195. We'll get an address on the Art Blocks API pointing to the JSON file holding the token metadata (including the URL to the still image of the item), which is what OpenSea uses to display the token information:

![415000195 token URI](https://www.codart.io/415000195-tokenURI.png)

![415000195 Metadata](https://www.codart.io/415000195-Metadata.png)

Both the token metadata and the link to the image are hosted on the Art Blocks servers. Some may argue that Art Blocks could use a decentralized storage like IPFS to store this information, but in reality, and this is something specific for generative art NFTs, even in the case that the Art Blocks servers become unavailable, the code to be able to reproduce the image will be still accessible on-chain. [This is a good post](https://medium.com/the-link-art-blocks/how-on-chain-is-art-blocks-5ccd553dd370) about Art Blocks and decentralization if you're interested in this topic.

So how can you access the script and the token hash (the random number generated at the time of minting that will produce the unique output)? Back to the AB Core V3 contract in etherscan, we can retrieve the collection script and the token hash with the functions tokenIdToHash and projectScriptByIndex respectively:

![415000195 Hash](https://www.codart.io/415000195-hash.png)

![415000195 Script](https://www.codart.io/415000195-script.png)

Generally, the script includes a placeholder for the token Hash (you can search for tokenData in the script). Also, the projectScriptDetails function returns the library used by the project:

![415000195 Script Type and Version](https://www.codart.io/415000195-scripttype.png)

And that's all the information you need to be able to recreate a specific output for a given token ID. With a simple html page, you could import the required library, the script from the collection and the token hash, and generate the output as seen in OpenSea.

It's worth noting that the majority of the projets use p5.js:

| library | Collections |
|---------|-------------|
| p5      | 275         |
| js      | 80          |
| three   | 40          |
| others  | 34          |

# CodArt

CodArt allows you to explore the Art Blocks collections, retrieve and run the scripts associated with the collections and see the different outputs for the tokens minted.

With CodArt you can also create and deploy your own generative art collections, either based on an existing collection, or writing your own scripts from scratch.

## Project structure

The project is divided in two parts:

1. The project's root is based on the [Hardhat](https://hardhat.org/) starter template. The smart contracts are located under the **/contracts** folder.
2. The **/app** folder contains the DApp, based on [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Running locally

You can run the project locally by following these steps:

1. Clone the repo:
```
git clone https://github.com/bartomolina/codart.git
```
2. Install dependencies (both in the root folder and the apps folder):
```
npm i
```
3. Set your local envirnoment variables on the **.env** and **/app/.env.local** files. Use the **.evn.example** and **/app/.env.local.example** files as a guide.
4. Start a hardhat node, run the scripts to deploy the smart contracts and load the mock data:
```
npx hardhat node
npx hardhat run scripts/deploy.ts
```
5. Start the DApp under the **/app** folder:
```
npm run dev
```

# TODO

- [ ] Allow minting CodArt projects
- [ ] Extend preview to other libraries (currently only working with p5 / three)
- [ ] CodArt certificates
- [ ] Deploy to mainnet

# License

[![CC0](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)