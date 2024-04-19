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
            <div className="flex justify-between items-center p-8">
                {/* <p className="text-lg font-semibold ">Supply Trace</p> */}
                <Image
                    src="favicon.svg"
                    width={30}
                    height={30}
                    alt="Picture of the app"
                    className="text-center"
                />
                <ConnectKitButton />
            </div>
            <div className="fixed top-[48%] left-[30%] text-xl font-semibold"> Please connect your wallet to get started with Supply Trace 😊</div>
        </div>

    )
}
