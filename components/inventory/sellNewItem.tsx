"use client"

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from '../ui/button'
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useAccount } from "wagmi";
import { isAddress } from "viem";
import { Transaction } from "@/lib/types";
import { createAttestation } from "@/lib/helpers/createAttestation";
import { AttestationResult } from "@ethsign/sp-sdk";
import Spinner from "../spinner";

interface CreateSellNewItemForm {
    productName: string;
    productSerialNo: string;
    productTotal: number | null;
    taxRate: number | null;
    sellTo: string
}
// dropdown select product, [product name] , [product serial no], grand total, [tax rate], sell to

const SellNewItem = ({ attestationId }: { attestationId: string }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("Loading ...")
    const [isSuccess, setIsSuccess] = useState(false);


    const [error, setError] = useState('')

    const [formData, setFormData] = useState<CreateSellNewItemForm>({
        productName: "",
        productSerialNo:
            "",
        productTotal: null,
        taxRate: null,
        sellTo: "",
    });

    const { address } = useAccount()

    function validateInputs() {
        return (isAddress(formData.sellTo as string) && Number(formData.productTotal) > 0)
    }

    async function createSell() {
        try {
            const transaction: Transaction = {
                attestation: {
                    previousAttestationId: attestationId,
                    productName: formData.productName,
                    productSerialNo: formData.productSerialNo,
                    soldBy: address as string,
                    boughtBy: formData.sellTo as string,
                    grandTotal: formData.productTotal as number,
                    taxRate: formData.taxRate as number, // 10%
                },
                attestationId: attestationId,
                from: address as string,
                to: formData.sellTo as string,
                archived: false,
                transactionValue: Number(formData.productTotal),
                timestamp: new Date(),
            }

            // create attestaion and sell transaction here
            await createAttestation(transaction.attestation, address as string, attestationId).then((attestation: AttestationResult) => {
                console.log("Attestation: ", attestation);
                setIsSuccess(true)
                setIsLoading(false)

            })

            // if (attestationId !== "") {
            //     console.log("Updating transaction");
            //     await updateTransaction(attestationId)
            // }

            // // save transaction obj to db
            // const res = await createTransaction({ ...transaction, attestationId: "105" })
            // console.log("saved transaction to database : ", res)

            // setIsSuccess(true)
            // setIsLoading(false)

            // on success show green tick and attestaion id and link to visit


        } catch (error) {
            console.error("Error submitting record:", error);
            setIsLoading(false);
        }
    }

    const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("Selling Item...");
        if (validateInputs()) {
            console.log("Form Data: ", formData);
            setIsLoading(true)
            // setIsSuccess(true)
            await createSell();
        }
        else {
            setError("Please enter valid ETH address and selling price")
        }

    };


    return (
        <div className='px-8 flex justify-between'>
            <p className="text-4xl text-center font-semibold"> Inventory</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-300"><PlusCircledIcon className="mt-0.5" />
                        <span className="w-2"> </span>Sell New Item</Button>
                </DialogTrigger>

                <DialogContent className="max-w-[60%]">
                    <DialogHeader className="flex flex-col items-center">
                        <DialogTitle className="text-4xl font-semibold">Sell new item</DialogTitle>
                        <DialogDescription>
                            Enter details to sell a product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mx-40">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-4">
                                <Spinner />
                                <p>{loadingMessage}</p>
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
                                                    <Select
                                                        onValueChange={(value: string) =>
                                                            setFormData({
                                                                ...formData,
                                                                productName: value,
                                                            })
                                                        }
                                                        required
                                                        name="userType"
                                                    >
                                                        <SelectTrigger className="col-span-3">
                                                            <SelectValue placeholder="Select product name" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="product1">
                                                                    Product 1
                                                                </SelectItem>
                                                                <SelectItem value="product2">Product 2</SelectItem>
                                                                <SelectItem value="product3">Product 3</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="productSerialNo" className="text-right">
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
                                                    />

                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="grandTotal" className="text-right">
                                                        Grand Total
                                                    </Label>
                                                    <Input
                                                        id="grandTotal"
                                                        type="number"
                                                        placeholder="Enter product serial no"
                                                        className="col-span-3"
                                                        // @ts-ignore
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
                                                    <Label htmlFor="taxRate" className="text-right">
                                                        Tax Rate
                                                    </Label>
                                                    <Input
                                                        id="taxRate"
                                                        type="number"
                                                        placeholder="Enter tax rate"
                                                        className="col-span-3"
                                                        // @ts-ignore
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
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="sellTo" className="text-right">
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
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default SellNewItem