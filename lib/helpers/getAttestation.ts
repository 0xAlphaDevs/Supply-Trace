import { getContract } from "viem";
import { spContractAbi } from "../abis/SignProtocolAbi";
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia } from "viem/chains";
import { Attestation } from "../types";

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

  try {
    const res = await contract.read.getAttestation([attestationId]);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }

  // test
  // const attestations: Attestation[] = [
  //   { previousAttestationId: "", data: "This is the first attestation" },
  //   { previousAttestationId: "0", data: "This is person 1 attesting" },
  //   { previousAttestationId: "1", data: "This is person 2 attesting" },
  //   { previousAttestationId: "2", data: "This is person 3 attesting" },
  // ];

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(attestations[Number(attestationId)]);
  //   }, 1000);
  // });
}
