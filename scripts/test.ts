import { ethers } from "hardhat";

const codArtFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  const codArtFactory = await ethers.getContractAt("CodArtFactory", codArtFactoryAddress);

  const createCodArtLearnTx = await codArtFactory.createCodArtLearn({
    name: "Learn",
    symbol: "GAL0",
    artist: "bartomolina.eth",
    description: "Generative Art",
    maxSupply: 100,
    price: 0,
    _library: "p5",
    libraryURL: "https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.min.js",
    code: "code",
  });
  const receiptLearn = await createCodArtLearnTx.wait();
  console.log(receiptLearn.events[3].args._instance);

  const createCodArtCertificateTx = await codArtFactory.createCodArtCertificate({
    name: "Certificate",
    symbol: "GAC0",
    artist: "bartomolina.eth",
    description: "Generative Art",
    maxSupply: 100,
    price: 100000000000000,
    _library: "p5",
    libraryURL: "https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.min.js",
    code: "code",
  });
  const receiptCertificate = await createCodArtCertificateTx.wait();
  console.log(receiptCertificate.events[3].args._instance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
