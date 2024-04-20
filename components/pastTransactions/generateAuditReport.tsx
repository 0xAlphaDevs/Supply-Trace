"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const GenerateAuditReport = () => {
  return (
    <div className="px-10 flex justify-between">
      <p className="text-4xl text-center font-semibold"> Past Transactions</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-orange-500 hover:bg-orange-300">
            <PlusCircledIcon className="mt-0.5" />
            <span className="w-2"> </span>Generate Audit report
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[60%] bg-white">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="text-4xl font-semibold">
              Generate Audit Report
            </DialogTitle>
            <DialogDescription>
              Enter details to genrate an audit report.
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4 bg-orange-200" />
          <div className="mx-40">Functionality will be here</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateAuditReport;
