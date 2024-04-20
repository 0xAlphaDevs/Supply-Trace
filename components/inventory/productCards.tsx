"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "@/lib/types";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Sell from "./sell";
import ViewHistory from "./viewHistory";
import { useAccount } from "wagmi";
import Spinner from "../spinner";

const ProductCards = () => {
  const { address } = useAccount();

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateTaxPaid = (grandTotal: number, taxRate: number) => {
    const taxRateDecimal = taxRate / 100;
    const taxPaid = grandTotal * taxRateDecimal;
    return taxPaid.toFixed(2);
  };

  async function loadData() {
    const res = await getInventory(address as string);
    // parse json
    const inventory = JSON.parse(res);
    // console.log(inventory);
    setInventoryItems(inventory);
    setLoading(false);
  }

  useEffect(() => {
    console.log("Getting inventory...");
    setLoading(true);
    loadData();
  }, [address]);

  return (
    <div className="p-8 grid gap-8 ">
      {loading ? (
        <div className="flex justify-center mt-44">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center p-4">
              <Spinner />
            </div>
          </div>
        </div>
      ) : (
        <>
          {inventoryItems.length > 0 ? (
            <>
              {inventoryItems.map((item: InventoryItem, index) => (
                <Card
                  key={index}
                  className="p-4 shadow-md bg-orange-400 bg-opacity-20"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <h2 className="text-xl font-bold">{item.productName}</h2>
                      <div className="flex gap-2 text-sm items-center">
                        Attestation ID:{" "}
                        <Badge className="px-2 py-1 text-sm bg-indigo-950">
                          {parseInt(item.attestationId)}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <div className="text-lg">Vendor Name : {item.soldBy}</div>
                    <div className="flex gap-2 items-center pt-2">
                      <div className="flex gap-4">
                        <div className="text-lg font-light">
                          Product Serial No :
                        </div>
                        <Badge className="text-sm bg-indigo-950 ">
                          {item.productSerialNo}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <span className="text-xl font-semibold">
                          Grand Total (incl. taxes): ${item.grandTotal}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-md font-light">
                          Tax Rate : {item.taxRate} %
                        </span>
                        <span>|</span>
                        <span className="text-md font-light">
                          Tax Paid : $
                          {calculateTaxPaid(item.grandTotal, item.taxRate)}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-orange-500 hover:bg-orange-300">
                            View History
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-[60%] h-[90%] overflow-y-auto">
                          <ViewHistory attestationId={item.attestationId} />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-orange-500 hover:bg-orange-300">
                            Sell
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-[60%]">
                          <Sell
                            attestationId={item.attestationId}
                            productName={item.productName}
                            productSerialNo={item.productSerialNo}
                            productPrice={item.grandTotal}
                            taxRate={item.taxRate}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <div className="flex justify-center p-40 font-bold text-xl text-gray-600">
              No items in Inventory
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCards;

// helper fetch function

async function getInventory(walletAddress: string) {
  const res = await fetch("/api/read/inventory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletAddress: walletAddress,
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

  return await res.json();
}
