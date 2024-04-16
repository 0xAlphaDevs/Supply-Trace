import React from 'react'
import { cn } from "@/lib/utils";
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

const ProductCards = () => {

  const calculateTaxPaid = (grandTotal: number, taxRate: number) => {
    const taxRateDecimal = taxRate / 100;
    const taxPaid = grandTotal / (1 + taxRateDecimal) * taxRateDecimal;
    return taxPaid.toFixed(2);
  };

  // To Do : will query all items here

  return (
    <div className="p-8 grid gap-8 ">
      {items.map((item: InventoryItem, index) => (
        <Card key={index} className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className='flex justify-between'>
              <h2 className="text-xl font-bold">{item.productName}</h2>
              <div className='flex gap-2 text-sm items-center'>Attestation  ID: <Badge className="px-2 py-1 text-sm">
                {item.attestationId.toString()}
              </Badge></div>

            </CardTitle>
          </CardHeader>
          <CardContent className=''>
            <div className="text-lg">Vendor Name : {item.soldBy}</div>
            <div className="flex gap-2 items-center pt-2">
              <div className="flex gap-4">
                <div className="text-lg font-light">Product Serial No :</div>
                <Badge
                  className="text-sm  "
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
                  <Button>View History</Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[60%]">
                  <ViewHistory attestationId={item.attestationId} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Sell</Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[60%]">
                  <Sell attestationId={item.attestationId} />
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProductCards