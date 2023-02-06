import { createClient, configureChains } from "wagmi";
import { goerli } from "wagmi/chains";
import { getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "WAGMI",
    alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API,
    chains: [goerli],
  })
);

export default client;
