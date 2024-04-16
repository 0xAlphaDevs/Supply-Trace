import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// dropdown select product, [product name] , [product serial no], grand total, [tax rate], sell to

const SellNewItem = ({ attestationId }: { attestationId: string }) => {
    return (
        <div className='px-8 flex justify-between'>
            <p> Inventory</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircledIcon className="mt-0.5" />
                        <span className="w-2"> </span>Sell New Item</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SellNewItem