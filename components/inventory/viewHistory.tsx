"use client"

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import AttestationHistoryCard from './attestationHistoryCard'
import { verifyHistory } from "@/lib/helpers/verifyHistory";
import { Link } from "lucide-react";

const ViewHistory = ({ attestationId }: { attestationId: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                setIsLoading(true);
                const res = await verifyHistory("83");
                setHistory(res); // Update state with fetched history data
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching history:", error);
                setIsLoading(false);
            }
        }

        fetchHistory();
    }, [attestationId]);

    return (
        <div className='flex flex-col items-center gap-8'>
            <p className='flex justify-center text-4xl font-semibold'>View History</p>
            {/* //Skeleton */}
            {isLoading && (
                <div className='flex flex-col gap-16 pt-8'>
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
                </div>
            )}

            {/* Render AttestationHistoryCard for each history item */}
            {!isLoading && history.map((item, index) => (
                <React.Fragment key={index}>
                    <AttestationHistoryCard
                        timestamp={item.attestTimestamp}
                        attester={item.attester}
                        productName={item.data.productName}
                        productSerialNo={item.data.productSerialNo}
                        previousAttestationId={item.data.previousAttestationId}
                    />
                    {/* Render chain symbol between cards except for the last one */}
                    {index !== history.length - 1 && <span><Link className="font-bold text-slate-500 h-10 w-10" /></span>}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ViewHistory