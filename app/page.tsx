// This is landing page for the app
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {


  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-8 px-8 ">
      <h1 className="text-5xl font-semibold text-orange-600">Welcome to Supply Trace</h1>
      <Image
        src="favicon.svg"
        width={50}
        height={50}
        alt="Picture of the app"
      />
      <Link href="/app">
        <Button className="bg-orange-500 hover:bg-orange-400 font-semibold">Launch App</Button>
      </Link>
      <div className="grid grid-cols-3 gap-8 px-20 pt-8 ">
        <Card className="shadow-md bg-orange-300 bg-opacity-20 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center text-indigo-950">Transparency</CardTitle>
            <CardDescription className="text-center pt-1">
              Transparent tracking of goods using attestations.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-md bg-orange-300 bg-opacity-20 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center text-indigo-950">Auditablity</CardTitle>
            <CardDescription className="text-center pt-1">
              Auditable trail of product journey for tax compliance and better supply chain management.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-md bg-orange-300 bg-opacity-20 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center text-indigo-950">Authenticity</CardTitle>
            <CardDescription className="text-center pt-1">
              Verify authenticity and origin of goods.
            </CardDescription>
          </CardHeader>
        </Card>


      </div>

      <div className="fixed container mx-auto bottom-4 ">
        <hr className="border-t-1 border-orange-600 mb-4" />
        <div className="flex justify-center items-center">
          <p className="text-indigo-950">&copy; 2024 Supply Trace | All rights reserved.</p>
        </div>
      </div>

    </main>
  )
}
