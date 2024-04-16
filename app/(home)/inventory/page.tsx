"use client"

import ProductCard from '@/components/inventory/productCards'
import React, { useState, useEffect } from 'react'
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ProductCards from '@/components/inventory/productCards';




const Inventory = () => {

    const { isConnected, address } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/app')
        }
    });

    return (
        <>
            {
                isConnected ? (
                    <div className='py-10' >
                        <ProductCards />
                    </div >
                ) : (<>Loading ...</>)
            }
        </>
    )
}

export default Inventory