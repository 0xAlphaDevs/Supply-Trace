"use client";

import React, { use, useState } from "react";
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
import { PastTransactions, Transaction } from "@/lib/types";
import { useEffect } from "react";

interface Report {
  revenue: number;
  expenses: number;
  profit: number;
  taxLiability?: number;
}

const GenerateAuditReport = ({ txns }: { txns: PastTransactions }) => {
  // console.log(txns);
  const [auditReport, setAuditReport] = useState<Report>();

  function generateAuditReport() {
    console.log("Generating audit report");
    let revenue = 0;
    let expenses = 0;
    let profit = 0;
    let taxPaid = 0;
    let taxLiability = 0;
    console.log(txns);

    txns?.buyTransactions.map((txn: Transaction) => {
      console.log("Buy Transaction :", txn);
      expenses += txn.transactionValue;
      taxPaid += (txn.transactionValue * txn.attestation.taxRate) / 100;
    });
    txns?.sellTransactions.map((txn: Transaction) => {
      console.log("Sell Transaction :", txn);
      revenue += txn.transactionValue;
      taxLiability += (txn.transactionValue * txn.attestation.taxRate) / 100;
    });
    profit = revenue - expenses;
    if (profit > 0) {
      setAuditReport({
        revenue,
        expenses,
        profit: profit,
        taxLiability: Number((taxLiability - taxPaid).toFixed(2)),
      });
    } else {
      setAuditReport({ revenue, expenses, profit: 0, taxLiability: 0 });
    }
  }

  useEffect(() => {
    generateAuditReport();
  }, [txns]);

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
              Generated Audit Report
            </DialogTitle>
            <DialogDescription>
              This is a audit report for the transactions that have been made.
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4 bg-orange-200" />
          <div className="mx-40">
            <div className="flex justify-between">
              <p className="text-2xl">Revenue : </p>
              <p className="text-xl font-bold ">$ {auditReport?.revenue}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl">Expenses : </p>
              <p className="text-xl font-bold text-red-400">
                $ {auditReport?.expenses}
              </p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <p className="text-2xl">Net Profit : </p>
              <p className="text-xl font-bold text-green-600">
                {" "}
                {auditReport?.profit == 0
                  ? "No Profit"
                  : "$ " + auditReport?.profit}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl">Your Tax Liability : </p>
              <p className="text-xl font-bold text-yellow-600">
                {" "}
                {auditReport?.taxLiability == 0
                  ? "No Tax Liability"
                  : "$ " + auditReport?.taxLiability}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateAuditReport;
