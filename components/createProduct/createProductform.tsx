"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

interface CreateJobForm {
    name: string;
    price: number;
    taxRate: number;
}

const CreateProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateJobForm>({
        name: "",
        price: 0,
        taxRate: 0,
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
            name: "",
            price: 0,
            taxRate: 0,
        });
    }

    const constructJobData = (
        name: string,
        price: number,
        taxRate: number,
    ) => {
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        const newJobData = {
            name: name,
            price: price,
            taxRate: taxRate,
        };
        return newJobData;
    };

    async function createJob() {
        try {
            // setIsLoading(true);
            const newJobData = constructJobData(
                formData.name,
                formData.price,
                formData.taxRate,
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
        <div className="flex flex-col items-center text-left pt-16">
            <p className="text-4xl font-semibold py-4">Create New Product</p>
            <p className="font-light"> Enter details to create a new job. </p>

            <div className="sm:max-w-[50%] w-[30%]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-4">
                        {/* <Loader /> */}
                        <p>Creating Product ...</p>
                    </div>
                ) : (
                    <>
                        {!isSuccess ? (
                            <div className="">
                                <Separator className="my-4 bg-orange-200" />
                                <form onSubmit={handleSubmitRequest}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter product name"
                                                className="col-span-3"
                                                value={formData.name}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="price" className="text-right">
                                                Price
                                            </Label>
                                            <Input
                                                id="price"
                                                placeholder="Enter product price"
                                                className="col-span-3"
                                                value={formData.price}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        price: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="taxRate" className="text-right">
                                                Tax Rate
                                            </Label>
                                            <Input
                                                id="taxRate"
                                                type="number"
                                                placeholder="Enter product amount"
                                                className="col-span-3"
                                                value={formData.taxRate}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        taxRate: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="inline-block text-center py-4"><Button type="submit" className="bg-orange-400 hover:bg-orange-500" >Create</Button></div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 items-center">
                                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                                <p>Product created Successfully </p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default CreateProductForm;

