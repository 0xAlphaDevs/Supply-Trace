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
    <main className="flex min-h-screen justify-between px-8 py-4 ">

      <p>Welcome to Supply Trace</p>
      <Button onClick={launchApp}>Launch App</Button>

    </main>
  )
}
