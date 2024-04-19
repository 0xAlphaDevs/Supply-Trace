"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
// import { verifyHistory } from "@/lib/helpers/verifyHistory";
import AttestationHistoryCard from "../inventory/attestationHistoryCard";
import { CrossIcon, Link, X } from "lucide-react";
import Spinner from "../spinner";
import { Attestation } from "@ethsign/sp-sdk";
import {
    SignProtocolClient,
    EvmChains,
    SpMode,
    OnChainClientOptions,
    Schema,
} from "@ethsign/sp-sdk";
import { sepolia } from "viem/chains";

interface CreateJobForm {
    attestationId: string;
}

const VerifyForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateJobForm>({
        attestationId: "",
    });
    const [history, setHistory] = useState<any[]>([]);

    async function verifyProductHistory() {
        try {
            const res = await verifyHistory(formData.attestationId)
            console.log(res);
            setHistory(res);
            setIsSuccess(true)
            setIsLoading(false)

        } catch (error) {
            console.error("Error submitting record:", error);
            // setIsLoading(false);
        }
    }

    const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsLoading(true)
        console.log("Verifying ...");
        console.log("Form Data: ", formData);
        await verifyProductHistory();
    };

    return (
        <div className="flex flex-col items-center justify-center text-left mt-32">
            <div className="sm:max-w-[70%] w-[100%]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex justify-center items-center p-4">
                            <Spinner />
                        </div>
                        <p className="text-xl ">Verifying Product ...</p>
                    </div>
                ) : (
                    <>
                        {!isSuccess ? (
                            <div className="flex flex-col items-center">
                                <p className="text-4xl font-semibold">Verify Product</p>
                                <p className="font-light"> Enter Attestaion Id to verify a product. </p>
                                <Separator className="my-4 bg-orange-200" />
                                <form onSubmit={handleSubmitRequest}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="attestationId" className="text-right">
                                                Attestation Id
                                            </Label>
                                            <Input
                                                id="attestationId"
                                                placeholder="Enter attestation Id"
                                                className="col-span-3"
                                                value={formData.attestationId}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        attestationId: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="inline-block text-center py-4"><Button type="submit" className="bg-orange-400 hover:bg-orange-500" >Verify Product</Button></div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 items-center justify-center ">
                                {history.length === 0 ? <> <X className="w-20 h-20 text-red-500" />
                                    <p className="font-semibold text-lg mb-10">Product attestation history not found </p>
                                    <Button onClick={() => setIsSuccess(false)} className="bg-orange-500 hover:bg-orange-300" >Verify another Product</Button>
                                </>
                                    :
                                    <>
                                        <CheckCircledIcon className="w-20 h-20 text-green-500" />
                                        <p className="font-semibold text-lg text-green-600">Verified product Successfully </p>
                                        <Button onClick={() => setIsSuccess(false)} className="bg-orange-500 hover:bg-orange-300" >Verify another Product</Button>
                                        {/* Render AttestationHistoryCard for each history item */}
                                        <p className="p-2 text-xl font-light">🔗 Here is the chain of attestation history 🔗</p>
                                        <p className=" text-xl font-light">Total Attestations found: {history.length} </p>
                                        {history.map((item, index) => (
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
                                        ))}</>}

                            </div>

                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default VerifyForm;

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