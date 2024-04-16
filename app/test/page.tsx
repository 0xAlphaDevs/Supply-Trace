"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { createTransaction } from "@/lib/helpers/createTransaction"
import { createProduct } from "@/lib/helpers/createProduct"
import { updateTransaction } from "@/lib/helpers/updateTransaction"
import { Product, Transaction } from "@/lib/types"
import { getAttestation } from "@/lib/helpers/getAttestation"
import { verifyHistory } from "@/lib/helpers/verifyHistory"

const product: Product = {
  name: "Test Product",
  price: 100,
  taxRate: 0.1,
  vendor: "Test Vendor",
}

const transaction: Transaction = {
  attestation: {
    previousAttestationId: "",
    productName: "Test Product",
    productSerialNo: "123",
    soldBy: "test",
    boughtBy: "test",
    grandTotal: 100,
    taxRate: 0.1,
  },
  attestationId: "1",
  from: "test",
  to: "test",
  archived: false,
  transactionValue: 100,
  timestamp: new Date(),
}

const Page = () => {

  // create a transaction for attestation
  async function handleCreateTransaction() {
    console.log("Creating transaction");
    const res = await createTransaction(transaction)
    console.log(res)
  }

  // create a product 
  async function handleCreateProduct() {
    console.log("Creating product");
    const res = await createProduct(product)
    console.log(res)
  }

  // update a transaction i.e. set archive to true
  async function handleUpdateTransaction() {
    console.log("Updating transaction");
    const res = await updateTransaction("1", "test")
    console.log(res)
  }

  // update a transaction i.e. set archive to true
  async function handleGetAttestation() {
    for (let i = 1; i < 10; i++) {
      const result = await getAttestation(i.toString());
      // process result if needed
    }
  }

  // verify history
  async function handleVerifyHistory() {
    console.log("Verifying history");
    const res = await verifyHistory("3");
    console.log(res);
  }

  return (
    <div className="flex flex-col p-16 justify-center items-center gap-4">
      <Button onClick={handleCreateTransaction} className="">
        Create Transaction
      </Button>
      <Button onClick={handleCreateProduct} className="">
        Create Product
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
