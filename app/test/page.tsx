"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { createTransaction } from "@/lib/helpers/createTransaction"

const Page = () => {
  async function handleCreateTransaction() {
    console.log("Creating transaction");

    const res = await createTransaction({ data: "test" })
    console.log(res)
  }

  return (
    <div className="flex flex-col p-16 justify-center items-center gap-4">
      <Button onClick={handleCreateTransaction} className="">
        Create Transaction
      </Button>
      <Button className="">Update Transaction</Button>
    </div>
  )
}

export default Page
