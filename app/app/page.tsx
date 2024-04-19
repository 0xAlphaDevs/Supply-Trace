"use client"

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";


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
            <div className="flex justify-between items-center px-8 py-4">
                <p className="text-lg font-semibold">Supply Trace</p>
                <ConnectKitButton />
            </div>
            <div className="flex flex-col items-center gap-4 mt-28">
                <Image
                    src="favicon.svg"
                    width={200}
                    height={200}
                    alt="Picture of the app"
                    className="text-center"
                />
                <div className="text-xl font-semibold"> Please connect your wallet to get started with Supply Trace 😊</div>
            </div>
        </div>

    )
}
