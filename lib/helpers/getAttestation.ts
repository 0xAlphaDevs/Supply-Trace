import { getContract } from "viem";
import { spContractAbi } from "../abis/SignProtocolAbi";
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export async function getAttestation(attestationId: string) {
  const contract = getContract({
    address: "0x878c92FD89d8E0B93Dc0a3c907A2adc7577e39c5",
    abi: spContractAbi,
    client: publicClient,
  });

  //@ts-ignore
  const res = await contract.read.getAttestation([attestationId]);
  console.log(res);
  return res;
}
