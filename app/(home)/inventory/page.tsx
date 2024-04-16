"use client"

import ProductCard from '@/components/inventory/productCards'
import React, { useState, useEffect } from 'react'
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ProductCards from '@/components/inventory/productCards';
import SellNewItem from '@/components/inventory/sellNewItem';


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
                        <SellNewItem />
                        <ProductCards />
                    </div >
                ) : (<>Loading ...</>)
            }
        </>
    )
}

export default Inventory