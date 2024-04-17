import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import AttestationHistoryCard from './attestationHistoryCard'

const ViewHistory = ({ attestationId }: { attestationId: string }) => {
    return (
        <div className='flex flex-col items-center gap-8'>
            <p className='flex justify-center text-4xl font-semibold'>View History</p>
            {/* //Skeleton */}
            {/* <div className='flex flex-col gap-16 pt-8'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-24 w-24 rounded-full bg-slate-200" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-[250px] bg-slate-200" />
                        <Skeleton className="h-10 w-[200px] bg-slate-200" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-24 w-24 rounded-full bg-slate-200" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-[250px] bg-slate-200" />
                        <Skeleton className="h-10 w-[200px] bg-slate-200" />
                    </div>
                </div>

            </div> */}
            <AttestationHistoryCard timestamp={1265578} attester='' productName='' productSerialNo='' previousAttestationId='' />
        </div>
    )
}

export default ViewHistory