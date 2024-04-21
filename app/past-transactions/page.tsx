"use client";
import GenerateAuditReport from "@/components/pastTransactions/generateAuditReport";
import { PastTransactionsTable } from "@/components/pastTransactions/pastTransactionsTable";
import React from "react";
import Navbar from "@/components/navbar";
import { PastTransactions } from "@/lib/types";

const PastTransactionsPage = () => {
  const [txns, setTxns] = React.useState<PastTransactions>({
    buyTransactions: [],
    sellTransactions: [],
  });
  return (
    <section className="flex flex-col justify-between px-8 py-4 ">
      <Navbar />
      <div className="py-10">
        <GenerateAuditReport txns={txns} />
        <PastTransactionsTable setTxns={setTxns} />
      </div>
    </section>
  );
};

export default PastTransactionsPage;
