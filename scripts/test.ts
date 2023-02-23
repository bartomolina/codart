import { ethers } from "hardhat";

const codArtLearnFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  const codArtLearnFactory = await ethers.getContractAt("CodArtLearnFactory", codArtLearnFactoryAddress);

  const createCodArtLearnTx = await codArtLearnFactory.createCodArtLearn("GenArt0", "GA0", 100, 0, "p5", "code");
  const receipt = await createCodArtLearnTx.wait();
  console.log(receipt.events[3].args._instance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});