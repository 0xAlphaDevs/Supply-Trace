import React from "react"
import { Button } from "@/components/ui/button"
import { createTransaction } from "@/lib/helpers/createTransaction"
import { createProduct } from "@/lib/helpers/createProduct"
import { updateTransaction } from "@/lib/helpers/updateTransaction"

const Page = () => {
  // create a transaction for attestation
  async function handleCreateTransaction() {
    console.log("Creating transaction");
    const res = await createTransaction({ data: "test" })
    console.log(res)
  }

  // create a product 
  async function handleCreateProduct() {
    console.log("Creating product");
    const res = await createProduct({ name: "test" })
    console.log(res)
  }

  // update a transaction i.e. set archive to true
  async function handleUpdateTransaction() {
    console.log("Updating transaction");
    const res = await updateTransaction({ data: "test" })
    console.log(res)
  }

  return (
    <div className="flex flex-col p-16 justify-center items-center gap-4">
      <Button onClick={handleCreateTransaction} className="">
        Create Transaction
      </Button>
      <Button className="">Update Transaction</Button>

      <Button className="">Create Product</Button>

    </div>
  )
}

export default Page
