import { getAttestation } from "./getAttestation";
import { Attestation } from "@ethsign/sp-sdk";

export async function verifyHistory(attestationId: string) {
  let chainOfAttestations = [];

  const attestation: Attestation = await getAttestation(attestationId);

  if (!attestation) {
    throw new Error("Attestation not found");
  } else {
    chainOfAttestations.push(attestation);

    if (!attestation.linkedAttestationId) {
      // console.log("no linked attestation id");
      return chainOfAttestations;
    } else {
      let linkedAttestationId = attestation.linkedAttestationId;
      while (linkedAttestationId !== "") {
        const previousAttestation = await getAttestation(linkedAttestationId);
        // console.log("previous attestation: ", previousAttestation);

        if (previousAttestation) {
          // console.log(" updating chain of attestations");
          chainOfAttestations.push(previousAttestation);
          linkedAttestationId = previousAttestation.linkedAttestationId
            ? previousAttestation.linkedAttestationId
            : "";
        }
      }
    }
    return chainOfAttestations;
  }
}
