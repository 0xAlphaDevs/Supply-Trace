"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";



interface CreateJobForm {
    attestationId: string;
}

const VerifyForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateJobForm>({
        attestationId: "",
    });


    // const { data, isSuccess, isLoading, write } = useContractWrite({
    //     address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    //     abi: deworkContract.abi,
    //     functionName: "createJob",
    //     args: [],
    // });

    function handleClick() {
        // reset all state values
        setFormData({
            attestationId: "",
        });
    }

    const constructJobData = (
        attestationId: string,

    ) => {
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        const newJobData = {
            attestationId: attestationId,
        };
        return newJobData;
    };

    async function createJob() {
        try {
            // setIsLoading(true);
            const newJobData = constructJobData(
                formData.attestationId,
            );
            console.log(" Data: ", newJobData);

            // write({
            //     args: [
            //         newJobData.title,
            //         newJobData.description,
            //         newJobData.createdAt,
            //         newJobData.tags,
            //         Number(newJobData.budget) * 10 ** 18,
            //     ],
            // });
            //   const result = await saveJobData(formData.title);

            // setIsLoading(false);
        } catch (error) {
            console.error("Error submitting record:", error);
            // setIsLoading(false);
        }
    }

    const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("Creating request...");
        console.log("Form Data: ", formData);
        await createJob();
    };

    return (
        <div className="flex flex-col items-center text-left pt-24">
            <p className="text-4xl font-semibold py-4">Verify Product</p>
            <p className="font-light"> Enter Attestaion Id to verify a product. </p>

            <div className="sm:max-w-[50%] w-[40%]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-4">
                        {/* <Loader /> */}
                        <p>Verifying Product ...</p>
                    </div>
                ) : (
                    <>
                        {!isSuccess ? (
                            <div className="">
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

                                        <div className="inline-block text-center py-4"><Button onClick={handleClick} type="submit" className="bg-orange-400 hover:bg-orange-500" >Verify Product</Button></div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 items-center">
                                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                                <p>Verified product Successfully </p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default VerifyForm;

