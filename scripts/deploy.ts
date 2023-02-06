import { ethers, artifacts } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const CodArtLearnFactory = await ethers.getContractFactory("CodArtLearnFactory");
  const CodArtLearn = await ethers.getContractFactory("CodArtLearn");

  const codArtLearnFactory = await CodArtLearnFactory.deploy();
  await codArtLearnFactory.deployed();

  console.log(`CodArtLearnFactory deployed to ${codArtLearnFactory.address}`);

  const CodArtLearnFactoryData = {
    address: codArtLearnFactory.address,
    abi: codArtLearnFactory.interface.format("json"),
  };

  const CodArtLearnData = {
    abi: CodArtLearn.interface.format("json"),
  };

  const networkName = hre.network.name;

  fs.writeFileSync(`./app/lib/${networkName}-codart-learn-factory-contract.json`, JSON.stringify(CodArtLearnFactoryData));
  fs.writeFileSync("./app/lib/codart-learn-contract.json", JSON.stringify(CodArtLearnData));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
