import { getContract } from "viem";
import { spContractAbi } from "../abis/SignProtocolAbi";
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia } from "viem/chains";
import { ProductAttestationSchema } from "../types";
import signProtocolClient from "../signProtocolClient";
import { Attestation } from "@ethsign/sp-sdk";

export async function getAttestation(
  attestationId: string
): Promise<Attestation> {
  // Get attestation using SignProtocolClient
  try {
    const res: Attestation = await signProtocolClient.getAttestation(
      attestationId
    );
    if (res.schemaId == "0x25") {
      return res;
    } else {
      throw new Error("Attestation not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
}
