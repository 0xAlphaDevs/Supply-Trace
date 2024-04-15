import { Attestation } from "../types";
import { getAttestation } from "./getAttestation";

export async function verifyHistory(attestationId: string) {
  let chainOfAttestations = [];

  const attestation: Attestation = await getAttestation(attestationId);

  if (!attestation) {
    throw new Error("Attestation not found");
  } else {
    chainOfAttestations.push(attestation);

    if (!attestation.previousAttestationId) {
      return chainOfAttestations;
    } else {
      let previousAttestationId = attestation.previousAttestationId;
      while (previousAttestationId !== "") {
        const previousAttestation = await getAttestation(previousAttestationId);
        chainOfAttestations.push(previousAttestation);
        previousAttestationId = previousAttestation.previousAttestationId;
      }
      return chainOfAttestations;
    }
  }
}
