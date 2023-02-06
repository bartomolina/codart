import { createClient, configureChains } from "wagmi";
import { hardhat } from "wagmi/chains";
import { getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "WAGMI",
    alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API,
    chains: [hardhat],
  })
);

export default client;
