"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {

  const [showHome, setShowHome] = useState(false);
  const { isConnected, address } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      setShowHome(true);
    }
  }, [isConnected]);

  useEffect(() => {
    if (address) {
      router.push('/inventory')
    }
  });

  const launchApp = () => {
    setShowHome(true);
  };



  return (
    <main className="flex min-h-screen flex-col justify-between px-8 py-4 ">
      {!showHome && (
        <div className="">
          <p>Welcome to Supply Trace</p>
          <Button onClick={launchApp}>Launch App</Button>
        </div>
      )}
      {showHome &&
        (<div className='flex flex-col'>
          <Navbar />
          <p> Please connect your wallet to get started with Supply Trace</p>
        </div>)
      }
    </main>
  )
}
