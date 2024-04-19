"use client"

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import AttestationHistoryCard from './attestationHistoryCard'
// import { verifyHistory } from "@/lib/helpers/verifyHistory";
import { Link } from "lucide-react";
import { Separator } from "../ui/separator";
import { Attestation } from "@ethsign/sp-sdk";
import {
    SignProtocolClient,
    EvmChains,
    SpMode,
    OnChainClientOptions,
    Schema,
} from "@ethsign/sp-sdk";
import { sepolia } from "viem/chains";

const ViewHistory = ({ attestationId }: { attestationId: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    async function fetchHistory() {
        try {
            const res = await verifyHistory(attestationId);
            setHistory(res); // Update state with fetched history data
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching history:", error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        fetchHistory();
    }, []);

    return (
        <div className='flex flex-col items-center gap-4'>
            <p className='flex justify-center text-2xl font-semibold'>Attestation History</p>
            <Separator className=" bg-orange-200" />
            {/* //Skeleton */}
            {isLoading && (
                <div className='flex flex-col justify-center items-center gap-4 pt-8'>
                    <div className="flex items-center">
                        <Skeleton className="h-44 w-[620px] rounded-3xl bg-slate-200" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton className="h-12 w-12 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex items-center">
                        <Skeleton className="h-44 w-[620px] rounded-3xl bg-slate-200" />
                    </div>
                </div>
            )}

            {/* Render AttestationHistoryCard for each history item */}
            {!isLoading && history.map((item, index) => (
                <React.Fragment key={index}>
                    <AttestationHistoryCard
                        timestamp={item.attestTimestamp}
                        attester={item.attester}
                        productName={item.data.productName}
                        productSerialNo={item.data.productSerialNo}
                        previousAttestationId={item.data.previousAttestationId}
                    />
                    {/* Render chain symbol between cards except for the last one */}
                    {index !== history.length - 1 && <span><Link className="font-bold text-slate-500 h-10 w-10" /></span>}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ViewHistory

// helper function

async function verifyHistory(attestationId: string) {
    let chainOfAttestations = [];

    try {
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
    } catch (error) {
        return chainOfAttestations;
    }
}


async function getAttestation(
    attestationId: string
): Promise<Attestation> {
    const spMode = SpMode.OnChain;
    const options: OnChainClientOptions = {
        chain: EvmChains.sepolia,
        rpcUrl: sepolia.rpcUrls.default.http[0],
    };

    const signProtocolClient = new SignProtocolClient(spMode, options);
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