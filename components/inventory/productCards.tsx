"use client"
import React, { useEffect, useState } from 'react'
import { hexToDecimal } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { items } from '@/constants/items';
import { InventoryItem } from "@/lib/types"
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeDollarSignIcon,
  BookUser,
  Briefcase,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Sell from './sell';
import ViewHistory from './viewHistory';
import { useAccount } from 'wagmi';
import { getInventory } from '@/lib/helpers/getInventory';
import { Skeleton } from '../ui/skeleton';

const ProductCards = () => {

  const { address } = useAccount();

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const calculateTaxPaid = (grandTotal: number, taxRate: number) => {
    const taxRateDecimal = taxRate / 100;
    const taxPaid = grandTotal * taxRateDecimal;
    return taxPaid.toFixed(2);
  };

  async function loadData() {
    const res = await getInventory("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" as string)
    // parse json
    const inventory = JSON.parse(res)
    console.log(inventory);
    setInventoryItems(inventory)
    setLoading(false)
  }

  useEffect(() => {
    console.log("Getting inventory...");
    setLoading(true);
    loadData();
  }, [])

  return (
    <div className="p-8 grid gap-8 ">
      {loading ? <div className='flex justify-center mt-44'>
        <div className="flex justify-center items-center">
          <div className="w-24 h-24 border-t-4 border-b-4 border-orange-700 rounded-full animate-spin"></div>
        </div>
      </div> : <>
        {inventoryItems.map((item: InventoryItem, index) => (
          <Card key={index} className="p-4 shadow-md bg-orange-400 bg-opacity-20">
            <CardHeader>
              <CardTitle className='flex justify-between'>
                <h2 className="text-xl font-bold">{item.productName}</h2>
                <div className='flex gap-2 text-sm items-center'>Attestation  ID: <Badge className="px-2 py-1 text-sm bg-indigo-950">
                  {(item.attestationId)}
                </Badge></div>

              </CardTitle>
            </CardHeader>
            <CardContent className=''>
              <div className="text-lg">Vendor Name : {item.soldBy}</div>
              <div className="flex gap-2 items-center pt-2">
                <div className="flex gap-4">
                  <div className="text-lg font-light">Product Serial No :</div>
                  <Badge
                    className="text-sm bg-indigo-950 "
                  >
                    {item.productSerialNo}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className='flex flex-col gap-1'>
                <div className="flex gap-2 items-center">
                  <span className="text-xl font-semibold">Grand Total (incl. taxes): ${item.grandTotal}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='text-md font-light'>Tax Rate : {item.taxRate} %</span>
                  <span>|</span>
                  <span className='text-md font-light'>Tax Paid : ${calculateTaxPaid(item.grandTotal, item.taxRate)} </span>
                </div>
              </div>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='bg-orange-500 hover:bg-orange-300'>View History</Button>
                  </DialogTrigger>
                  <DialogContent className=" max-w-[60%] h-[90%] overflow-y-auto">
                    <ViewHistory attestationId={item.attestationId} />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='bg-orange-500 hover:bg-orange-300'>Sell</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[60%]">
                    <Sell attestationId={item.attestationId} productName={item.productName} productSerialNo={item.productSerialNo} productPrice={item.grandTotal} taxRate={item.taxRate} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        ))}</>}

    </div>
  )
}

export default ProductCards