"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { createTransaction } from "@/lib/helpers/createTransaction"
import { createProduct } from "@/lib/helpers/createProduct"
import { updateTransaction } from "@/lib/helpers/updateTransaction"
import { Product, Transaction } from "@/lib/types"
import { getAttestation } from "@/lib/helpers/getAttestation"
import { verifyHistory } from "@/lib/helpers/verifyHistory"
import { createAttestation } from "@/lib/helpers/createAttestation"
import { getProducts } from "@/lib/helpers/getProducts"

const product: Product = {
  productName: "Test Product",
  productSerialNo: "1234ASDFGH",
  productPrice: 100,
  taxRate: 0.1,
  vendorWalletAddress: "0x1",
}

const transaction: Transaction = {
  attestation: {
    previousAttestationId: "0x52",
    productName: "Test Product 1", // product name
    productSerialNo: "4567NYUIOP", // product serial number
    soldBy: "0x2",
    boughtBy: "0x3",
    grandTotal: 120,
    taxRate: 10, // 10%
  },
  attestationId: "0x",
  from: "0x2",
  to: "0x3",
  archived: false,
  transactionValue: 120,
  timestamp: new Date(),
}

const Page = () => {

  // create a transaction for attestation
  async function handleSellTransaction(attestationId: string) {
    console.log("Selling ...");
    // create attestation on-chain ,(attestation, wallet, linkedAttestationId)
    // const attestation = await createAttestation(transaction.attestation, wallet, attestationId)
    // console.log(attestation)
    if (attestationId !== "") {
      console.log("Updating transaction");
      await updateTransaction(attestationId)
    }
    // save transaction obj to db
    const res = await createTransaction({ ...transaction, attestationId: "0x53" })
    console.log("saved transaction to database : ", res)
  }

  // create a product 
  async function handleGetProducts() {
    console.log("Getting product for this vendor wallet :");
    const res = await getProducts("0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C")
    const products = JSON.parse(res)
    console.log(products)
  }

  // update a transaction i.e. set archive to true
  async function handleUpdateTransaction() {
    console.log("Updating transaction");
    const res = await updateTransaction("1")
    console.log(res)
  }

  // update a transaction i.e. set archive to true
  async function handleGetAttestation() {
    const result = await getAttestation("0x53");
    console.log(result);
  }

  // verify history
  async function handleVerifyHistory() {
    console.log("Verifying history");
    const res = await verifyHistory("0x53");
    console.log(res);
  }

  return (
    <div className="flex flex-col p-16 justify-center items-center gap-4">
      <Button onClick={() => handleSellTransaction("0x52")} className="">
        Sell Transaction
      </Button>
      <Button onClick={handleGetProducts} className="">
        Get Products
      </Button>
      <Button onClick={handleUpdateTransaction} className="">
        Update Transaction
      </Button>
      <Button onClick={handleGetAttestation} className="">
        Get Attestation
      </Button>
      <Button onClick={handleVerifyHistory} className="">
        Verify History
      </Button>
    </div>
  )
}

export default Page
