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

        <div className=''>
            <div className="flex justify-between items-center p-8">
                <p>Supply Trace</p>
                <ConnectKitButton />
            </div>

            <div className="fixed top-[40%] left-[28%] text-2xl font-bold"> Please connect your wallet to get started with Supply Trace</div>
        </div>

    )
}
