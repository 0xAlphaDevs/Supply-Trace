"use client"

import React, { useEffect } from "react";
import Navbar from './navbar'
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Home = () => {
    const { isConnected, isDisconnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (isConnected) {
            router.push('/inventory')
        }
    }, [isConnected, router]);


    return (
        <div className='flex flex-col'>
            <Navbar />
            <p>Please connect your wallet to get started with Supply Trace</p>
        </div>
    )
}

export default Home