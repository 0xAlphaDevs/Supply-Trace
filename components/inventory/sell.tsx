"use client"

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

// dropdown select product [product name] , [product serial no], grand total, [tax rate], sell to

interface CreateSellForm {
    productName: string;
    productSerialNo: string;
    productTotal: number;
    taxRate: number;
    sellTo: string
}
const Sell = ({ attestationId, productName, productSerialNo, productPrice, taxRate }: { attestationId: string, productName: string, productSerialNo: string, productPrice: number, taxRate: number }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateSellForm>({
        productName: productName,
        productSerialNo: productSerialNo,
        productTotal: productPrice,
        taxRate: taxRate,
        sellTo: "",
    });

    async function createSell() {
        try {
            // create attestaion and sell transaction here

            // on success show green tick and attestaion id and link to visit


        } catch (error) {
            console.error("Error submitting record:", error);
            // setIsLoading(false);
        }
    }

    const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("Selling Item...");
        console.log("Form Data: ", formData);
        await createSell();
    };


    return (
        <div className="flex flex-col items-center text-left">
            <p className="text-4xl font-semibold">Sell Product</p>
            <p className="font-light text-sm"> Enter details to sell a product. </p>

            <div className="mx-40">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-4">
                        {/* <Loader /> */}
                        <p>Selling Product ...</p>
                    </div>
                ) : (
                    <>
                        {!isSuccess ? (
                            <div className="">
                                <Separator className="my-4 bg-orange-200" />
                                <form onSubmit={handleSubmitRequest}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="productName" className="text-left">
                                                Product Name
                                            </Label>
                                            <Input
                                                id="productSerialNo"
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
                                                disabled
                                            />

                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="productSerialNo" className="text-left">
                                                Product Serial No
                                            </Label>
                                            <Input
                                                id="productSerialNo"
                                                placeholder="Enter product serial no"
                                                className="col-span-3"
                                                value={formData.productSerialNo}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        productSerialNo: e.target.value,
                                                    })
                                                }
                                                required
                                                disabled
                                            />

                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="grandTotal" className="text-left">
                                                Selling Price
                                            </Label>
                                            <Input
                                                id="grandTotal"
                                                type="number"
                                                placeholder="Enter product serial no"
                                                className="col-span-3"
                                                value={formData.productTotal}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        productTotal: e.target.value,
                                                    })
                                                }
                                                required
                                            />

                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="taxRate" className="text-left">
                                                Tax Rate
                                            </Label>
                                            <Input
                                                id="taxRate"
                                                type="number"
                                                placeholder="Enter tax rate"
                                                className="col-span-3"
                                                value={formData.taxRate}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        taxRate: e.target.value,
                                                    })
                                                }
                                                required
                                                disabled
                                            />

                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="sellTo" className="text-left">
                                                Sell to
                                            </Label>
                                            <Input
                                                id="sellTo"
                                                placeholder="Enter seller address"
                                                className="col-span-3"
                                                value={formData.sellTo}
                                                onChange={(e: { target: { value: any } }) =>
                                                    setFormData({
                                                        ...formData,
                                                        sellTo: e.target.value,
                                                    })
                                                }
                                                required
                                            />

                                        </div>
                                        <div className="inline-block text-center py-4"><Button type="submit" className="bg-orange-400 hover:bg-orange-500" >Sell</Button></div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 items-center">
                                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                                <p>Product sold Successfully </p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    )
}

export default Sell