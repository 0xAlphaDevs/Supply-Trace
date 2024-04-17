"use client"

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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


interface CreateSellNewItemForm {
    productName: string;
    productSerialNo: string;
    grandTotal: number;
    taxRate: number;
    sellTo: string
}
// dropdown select product, [product name] , [product serial no], grand total, [tax rate], sell to

const SellNewItem = ({ attestationId }: { attestationId: string }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<CreateSellNewItemForm>({
        productName: "",
        productSerialNo: "",
        grandTotal: 0,
        taxRate: 0,
        sellTo: "",
    });

    function handleClick() {
        // reset all state values
        setFormData({
            productName: "",
            productSerialNo: "",
            grandTotal: 0,
            taxRate: 0,
            sellTo: "",
        });
    }

    const constructSellNewItem = (
        productName: string,
        productSerialNo: string,
        grandTotal: number,
        taxRate: number,
        sellTo: string,
    ) => {
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        const newSellNewItemData = {
            productName: productName,
            productSerialNo: productSerialNo,
            grandTotal: grandTotal,
            taxRate: taxRate,
            sellTo: sellTo,
        };
        return newSellNewItemData;
    };

    async function createSellNewItem() {
        try {
            // setIsLoading(true);
            const newSellNewItemData = constructSellNewItem(
                formData.productName,
                formData.productSerialNo,
                formData.grandTotal,
                formData.taxRate,
                formData.sellTo
            );
            console.log(" Data: ", newSellNewItemData);

            // write({
            //     args: [
            //         newSellNewItemData.title,
            //         newSellNewItemData.description,
            //         newSellNewItemData.createdAt,
            //         newSellNewItemData.tags,
            //         Number(newSellNewItemData.budget) * 10 ** 18,
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
        console.log("Selling new item...");
        console.log("Form Data: ", formData);
        await createSellNewItem();
    };


    return (
        <div className='px-8 flex justify-between'>
            <p> Inventory</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircledIcon className="mt-0.5" />
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
                                                    />

                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="grandTotal" className="text-left">
                                                        Grand Total
                                                    </Label>
                                                    <Input
                                                        id="grandTotal"
                                                        type="number"
                                                        placeholder="Enter product serial no"
                                                        className="col-span-3"
                                                        value={formData.grandTotal}
                                                        onChange={(e: { target: { value: any } }) =>
                                                            setFormData({
                                                                ...formData,
                                                                grandTotal: e.target.value,
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
                                                    />

                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="sellTo" className="text-lrft">
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
                                                <div className="inline-block text-center py-4"><Button onClick={handleClick} type="submit" className="bg-orange-400 hover:bg-orange-500" >Sell</Button></div>
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