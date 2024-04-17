"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { verifyHistory } from "@/lib/helpers/verifyHistory";



interface CreateJobForm {
    attestationId: string;
}

const VerifyForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateJobForm>({
        attestationId: "",
    });


    async function verifyProductHistory() {
        try {
            const res = await verifyHistory(formData.attestationId)
            console.log(res);
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
        <div className="flex flex-col items-center text-left pt-24">

            <div className="sm:max-w-[50%] w-[40%]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-4">
                        {/* <Loader /> */}
                        <p>Verifying Product ...</p>
                    </div>
                ) : (
                    <>
                        {!isSuccess ? (
                            <div className="flex flex-col items-center text-left">
                                <p className="text-4xl font-semibold py-4">Verify Product</p>
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
                            <div className="flex flex-col gap-4 items-center">
                                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                                <p>Verified product Successfully </p>
                                <Button onClick={() => setIsSuccess(false)} className="bg-orange-400 hover:bg-orange-500" >Verify another Product</Button>
                                <p className="text-lg font-thin">All attestation history displayed below</p>
                            </div>

                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default VerifyForm;

