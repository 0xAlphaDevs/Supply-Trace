import GenerateAuditReport from '@/components/pastTransactions/generateAuditReport'
import { PastTransactionsTable } from '@/components/pastTransactions/pastTransactionsTable'
import React from 'react'
import Navbar from '@/components/navbar'

const PastTransactions = () => {
    return (
        <section className="flex flex-col justify-between px-8 py-4 ">
            <Navbar />
            <div className='py-10'>
                <GenerateAuditReport />
                <PastTransactionsTable />
            </div>
        </section>
    )
}

export default PastTransactions