"use client"

import ProductCard from '@/components/inventory/productCard'
import React, { useState, useEffect } from 'react'
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";




const Inventory = () => {

    const { isConnected, address } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/app')
        }
    });

    return (
        <div className='py-10'>
            <ProductCard />
        </div>
    )
}

export default Inventory