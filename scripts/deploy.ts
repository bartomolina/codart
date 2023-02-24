import { ethers, artifacts } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function main() {
  const CodArtFactory = await ethers.getContractFactory("CodArtFactory");
  const CodArtLearn = await ethers.getContractFactory("CodArtLearn");
  const CodArtCertificate = await ethers.getContractFactory("CodArtCertificate");

  const codArtFactory = await CodArtFactory.deploy();
  await codArtFactory.deployed();

  console.log(`CodArtFactory deployed to ${codArtFactory.address}`);

  const CodArtFactoryData = {
    address: codArtFactory.address,
    abi: codArtFactory.interface.format("json"),
  };

  const CodArtLearnData = {
    abi: CodArtLearn.interface.format("json"),
  };

  const CodArtCertificateData = {
    abi: CodArtCertificate.interface.format("json"),
  };

  const networkName = hre.network.name;

  fs.writeFileSync(
    `./app/lib/contracts/${networkName}-codart-factory-contract.json`,
    JSON.stringify(CodArtFactoryData)
  );
  fs.writeFileSync("./app/lib/contracts/codart-learn-contract.json", JSON.stringify(CodArtLearnData));
  fs.writeFileSync("./app/lib/contracts/codart-certificate-contract.json", JSON.stringify(CodArtCertificateData));

  if (networkName === "goerli") {
    console.log("Waiting to verify on Etherscan");
    await delay(30000);

    await hre.run("verify:verify", {
      address: codArtFactory.address,
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
