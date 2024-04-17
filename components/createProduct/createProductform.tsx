"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

interface CreateJobForm {
    productName: string;
    productPrice: number;
    taxRate: number;
}

const CreateProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateJobForm>({
        productName: "",
        productPrice: 0,
        taxRate: 0,
    });

    // const { data, isSuccess, isLoading, write } = useContractWrite({
    //     address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    //     abi: deworkContract.abi,
    //     functionName: "createProductForm",
    //     args: [],
    // });

    function handleClick() {
        // reset all state values
        setFormData({
            productName: "",
            productPrice: 0,
            taxRate: 0,
        });
    }

    const constructProductForm = (
        productName: string,
        productPrice: number,
        taxRate: number,
    ) => {
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        const newProductFormData = {
            productName: productName,
            productPrice: productPrice,
            taxRate: taxRate,
        };
        return newProductFormData;
    };

    async function createProductForm() {
        try {
            // setIsLoading(true);
            const newProductFormData = constructProductForm(
                formData.productName,
                formData.productPrice,
                formData.taxRate,
            );
            console.log(" Data: ", newProductFormData);

            // write({
            //     args: [
            //         newProductFormData.title,
            //         newProductFormData.description,
            //         newProductFormData.createdAt,
            //         newProductFormData.tags,
            //         Number(newProductFormData.budget) * 10 ** 18,
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
        console.log("Creating product form...");
        console.log("Form Data: ", formData);
        await createProductForm();
    };

    return (
        <div className="flex flex-col items-center text-left pt-16">
            <p className="text-4xl font-semibold py-4">Create New Product</p>
            <p className="font-light"> Enter details for a new product to sell. </p>

            <div className="sm:max-w-[50%] w-[40%]">
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
                                            <Label htmlFor="productName" className="text-right">
                                                Product Name
                                            </Label>
                                            <Input
                                                id="productName"
                                                placeholder="Enter product name"
                                                className="col-span-3"
                                                value={formData.productName}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        productName: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="productPrice" className="text-right">
                                                Product Price
                                            </Label>
                                            <Input
                                                id="productPrice"
                                                type="number"
                                                placeholder="Enter product productPrice"
                                                className="col-span-3"
                                                value={formData.productPrice}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        productPrice: e.target.value,
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
                                        <div className="inline-block text-center py-4"><Button onClick={handleClick} type="submit" className="bg-orange-400 hover:bg-orange-500" >Create Product</Button></div>
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

