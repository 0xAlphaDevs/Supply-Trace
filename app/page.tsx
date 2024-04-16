// This is landing page for the app
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-8 px-8 py-4 ">

      <h1 className="text-4xl">Welcome to Supply Trace</h1>
      <Link href="/app">
        <Button >Launch App</Button>
      </Link>

    </main>
  )
}
