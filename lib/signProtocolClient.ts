import {
  SignProtocolClient,
  EvmChains,
  SpMode,
  OnChainClientOptions,
  Schema,
} from "@ethsign/sp-sdk";
import { sepolia } from "viem/chains";

const spMode = SpMode.OnChain;
const options: OnChainClientOptions = {
  chain: EvmChains.sepolia,
  rpcUrl: sepolia.rpcUrls.default.http[0],
};

const signProtocolClient = new SignProtocolClient(spMode, options);

export default signProtocolClient;
