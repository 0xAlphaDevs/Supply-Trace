"use client"

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";

export default function Home() {
    const { isConnected, address } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (address) {
            router.push('/inventory')
        }
    });


    return (
        <main className="flex min-h-screen flex-col justify-between px-8 py-4 ">


            <div className='flex flex-col'>

                <p> Please connect your wallet to get started with Supply Trace</p>
                <ConnectKitButton />
            </div>

        </main>
    )
}
