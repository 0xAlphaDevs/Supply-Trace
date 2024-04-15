import React from 'react'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Item } from '@/lib/types';
import { items } from '@/constants/items';
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

const ProductCard = () => {
  return (
    <div className="p-8 grid gap-8 ">
      {items.map((item: Item) => (
        <Card key={item.id} className="p-4 shadow-lg">
          <CardHeader>
            <CardTitle className='flex justify-between'>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <Badge className="px-2 py-1 text-sm">
                ID: {item.id.toString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className=''>
            <div className="text-lg">{item.description}</div>
            <div className="flex gap-2 items-center pt-2">
              <div className="flex gap-4">
                <div className="text-lg font-thin">Qualities :</div>
                {item.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="text-sm  "
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-lg font-bold">Price: ${item.price}</span>
            </div>
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>View History</Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[90%]">
                  Hi there i am a dialog
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Sell</Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[90%]">
                  Hi there i am a dialog
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProductCard