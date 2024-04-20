"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { Product } from "@/lib/types";
import { useAccount } from "wagmi";
import { createProduct } from "@/lib/helpers/createProduct";
import Spinner from "../spinner";
import { useToast } from "../ui/use-toast";

interface CreateProductForm {
  productName: string;
  productSerialNo: string;
  productPrice: number;
  taxRate: number;
}

const CreateProductForm = () => {
  const { toast } = useToast();

  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<CreateProductForm>({
    productName: "",
    productSerialNo: "",
    productPrice: 0,
    taxRate: 0,
  });

  async function saveProduct() {
    try {
      // setIsLoading(true);
      const product: Product = {
        productName: formData.productName,
        productSerialNo: formData.productSerialNo,
        productPrice: Number(formData.productPrice) as number,
        taxRate: Number(formData.taxRate) as number,
        vendorWalletAddress: address as string,
      };
      console.log(" Data: ", product);
      setIsLoading(true);
      try {
        const res = await createProduct(product);

        if (res) {
          toast({
            title: "Product created Successfully",
            variant: "default",
            className: "bg-green-600 text-white",
          });
        }

        // show success message
        setIsLoading(false);
      } catch (error) {
        // display error alert
        toast({
          title: "OOPS! There was an error",
          variant: "error",
        });
      }

      setFormData({
        productName: "",
        productSerialNo: "",
        productPrice: 0,
        taxRate: 0,
      });
    } catch (error) {
      console.error("Error submitting record:", error);
      // setIsLoading(false);
    }
  }

  const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Creating product...");
    await saveProduct();
  };

  return (
    <div className="flex flex-col items-center text-left pt-16">
      <p className="text-4xl font-semibold py-4">Create New Product</p>
      <p className="font-light"> Enter details for a new product to sell. </p>

      <div className="sm:max-w-[50%] w-[40%]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex justify-center items-center p-4">
              <Spinner />
            </div>
            <p className="text-xl ">Creating Product ...</p>
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
                      <Label htmlFor="productSerialNo" className="text-right">
                        Product Serial No.
                      </Label>
                      <Input
                        id="productSerialNo"
                        placeholder="Enter product serial no."
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
                      <Label htmlFor="productPrice" className="text-right">
                        Product Price
                      </Label>
                      <Input
                        id="productPrice"
                        type="number"
                        placeholder="Enter selling price of product"
                        className="col-span-3"
                        //@ts-ignore
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
                        placeholder="Enter tax rate(%)"
                        className="col-span-3"
                        //@ts-ignore
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
                    <div className="inline-block text-center py-4">
                      <Button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-300"
                      >
                        Create Product
                      </Button>
                    </div>
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
