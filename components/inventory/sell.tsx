"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useAccount } from "wagmi";
import { isAddress } from "viem";
import { Product, Transaction } from "@/lib/types";
import {
  SignProtocolClient,
  EvmChains,
  SpMode,
  OnChainClientOptions,
  Schema,
} from "@ethsign/sp-sdk";
import { AttestationResult } from "@ethsign/sp-sdk";
import Spinner from "../spinner";
import { Badge } from "../ui/badge";
import { ProductAttestationSchema } from "@/lib/types";
import { useToast } from "../ui/use-toast";

interface CreateSellNewItemForm {
  productName: string;
  productSerialNo: string;
  productPrice: number;
  taxRate: number;
  sellTo: string;
}

const Sell = ({
  attestationId,
  productName,
  productSerialNo,
  productPrice,
  taxRate,
}: {
  attestationId: string;
  productName: string;
  productSerialNo: string;
  productPrice: number;
  taxRate: number;
}) => {
  const { toast } = useToast();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading ...");
  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CreateSellNewItemForm>({
    productName: productName,
    productSerialNo: productSerialNo,
    productPrice: productPrice,
    taxRate: taxRate,
    sellTo: "",
  });

  function validateInputs() {
    return isAddress(formData.sellTo as string) && formData.productPrice > 0;
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
          grandTotal: Number(formData.productPrice),
          taxRate: Number(formData.taxRate), // 10%
        },
        attestationId: attestationId,
        from: address as string,
        to: formData.sellTo as string,
        archived: false,
        transactionValue: Number(formData.productPrice),
        timestamp: new Date(),
      };

      // create attestaion and sell transaction here
      console.log("Creating attestation :", transaction.attestation);

      const attestation: AttestationResult = await createAttestation(
        transaction.attestation,
        address as string,
        attestationId as string
      );

      if (attestationId !== "") {
        console.log("Updating transaction");
        await updateTransaction(attestationId);
      }

      setLoadingMessage("Saving to Database ...");

      // save transaction obj to db
      const res = await createTransaction({
        ...transaction,
        attestationId: attestation.attestationId,
      }); //
      console.log("saved transaction to database : ", res);
      toast({
        title: "Product sold Successfully",
        variant: "default",
        className: "bg-green-600 text-white",
      });
      // on success show green tick and attestaion id and link to visit
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting record:", error);
      // display error alert
      toast({
        title: "OOPS! There was an error",
        variant: "error",
      });
      setIsLoading(false);
    }
  }

  const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Selling Item...");
    if (validateInputs()) {
      setError("");
      console.log("Form Data: ", formData);
      setLoadingMessage("Creating Transaction ...");
      setIsLoading(true);
      await createSell();
    } else {
      setError("Please enter valid ETH address and selling price");
    }
  };

  return (
    <div className="flex flex-col items-center text-left ">
      <div className="mx-40">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            <Spinner />
            <p>{loadingMessage}</p>
          </div>
        ) : (
          <>
            {!isSuccess ? (
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold">Sell Product</p>
                <p className="font-light text-sm">
                  {" "}
                  Enter details to sell a product.{" "}
                </p>
                <Separator className="my-4 bg-orange-200" />
                {error && (
                  <p className="font-semibold text-red-500 flex justify-center">
                    {error}
                  </p>
                )}
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
                        //@ts-ignore
                        value={formData.sellTo}
                        onChange={(e: { target: { value: any } }) => {
                          setFormData({
                            ...formData,
                            sellTo: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="inline-block text-center py-4">
                      <Button
                        type="submit"
                        className="bg-orange-400 hover:bg-orange-500"
                      >
                        Sell
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center py-8">
                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                <p>Product sold Successfully </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sell;

// helper fetch functions

async function createAttestation(
  product: ProductAttestationSchema,
  wallet: string,
  previousAttestationId?: string
): Promise<AttestationResult> {
  // Get attestation using SignProtocolClient
  try {
    const spMode = SpMode.OnChain;

    const options: OnChainClientOptions = {
      //@ts-ignore
      chain: EvmChains.arbitrumSepolia,
      // rpcUrl: arbitrumSepolia.rpcUrls.default.http[0],
    };

    const signProtocolClient = new SignProtocolClient(spMode, options);
    const res: AttestationResult = await signProtocolClient.createAttestation({
      data: product,
      schemaId: "0x19",
      indexingValue: wallet,
      // linkedAttestationId: previousAttestationId,
    });
    // console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
}

async function updateTransaction(attestaionId: string) {
  const res = await fetch("/api/update/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attestaionId: attestaionId,
    }),
  });

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

async function createTransaction(txData: Transaction) {
  const res = await fetch("/api/create/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(txData),
  });

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}
