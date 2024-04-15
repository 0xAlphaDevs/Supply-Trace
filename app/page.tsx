"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const launchApp = () => {
    router.push('/inventory')
  };

  return (
    <main className="flex min-h-screen flex-col justify-between px-8 py-4 ">
      <div className="">
        <p>Welcome to Supply Trace</p>
        <Button onClick={launchApp}>Launch App</Button>
      </div>
    </main>
  )
}
