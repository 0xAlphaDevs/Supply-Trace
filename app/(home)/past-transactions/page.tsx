import GenerateAuditReport from '@/components/pastTransactions/generateAuditReport'
import { PastTransactionsTable } from '@/components/pastTransactions/pastTransactionsTable'
import React from 'react'

const PastTransactions = () => {
    return (
        <div className='py-10'>
            <GenerateAuditReport />
            <PastTransactionsTable />
        </div>
    )
}

export default PastTransactions