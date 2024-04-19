"use client"
import VerifyForm from '@/components/verify/verifyForm'
import React from 'react'
import Navbar from '@/components/navbar'

const Verify = () => {
    return (
        <section className="flex flex-col justify-between px-8 py-4 ">
            <Navbar />
            <div className='py-10'>
                <VerifyForm />
            </div>
        </section>
    )
}

export default Verify