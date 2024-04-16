import signProtocolClient from "../signProtocolClient";
import { Attestation, AttestationResult } from "@ethsign/sp-sdk";
import { ProductAttestationSchema } from "../types";

export async function createAttestation(
  product: ProductAttestationSchema,
  wallet: string,
  previousAttestationId?: string
): Promise<AttestationResult> {
  // Get attestation using SignProtocolClient
  try {
    const res: AttestationResult = await signProtocolClient.createAttestation({
      data: product,
      schemaId: "1",
      indexingValue: wallet,
      linkedAttestationId: previousAttestationId ? previousAttestationId : "",
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
}
