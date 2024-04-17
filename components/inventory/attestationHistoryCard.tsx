import React from 'react'
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeIcon, CheckCircledIcon } from '@radix-ui/react-icons';


const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const AttestationHistoryCard = ({ timestamp, attester, productName, productSerialNo, previousAttestationId }: { timestamp: number, attester: string, productName: string, productSerialNo: string, previousAttestationId: string }) => {
  const formattedTimestamp = formatDate(timestamp);

  return (
    <div className='w-[90%]'>
      <Card className="shadow-md bg-orange-400 bg-opacity-20">
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className="text-lg">{formattedTimestamp}</h2>
              <div className='flex gap-2 text-sm items-center font-md'>Attestated  By: <p className="px-2 py-1 text-sm">
                {attester}
              </p>
              </div>
            </div>
            <CheckCircledIcon className='text-green-500 h-12 w-12' />
          </div>
        </CardHeader>
        <CardContent className=''>
          <div className='flex flex-col items-center'>
            <div className="text-lg font-semibold">{productName}</div>
            <div className="flex gap-2 items-center pt-2">
              <div className="flex gap-4">
                <div className="text-md font-light">Product Serial No :</div>
                <div className="text-sm"> {productSerialNo}</div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            {previousAttestationId !== '' ? (
              <div className='flex gap-2'>
                <p>Previous Attestation Id :</p>
                <Badge className="text-md"> {previousAttestationId}</Badge>
              </div>
            ) : (
              <Badge variant='secondary' className="text-md ">Original Attestation</Badge>
            )}
          </div>

        </CardContent>

      </Card>
    </div>
  )
}

export default AttestationHistoryCard