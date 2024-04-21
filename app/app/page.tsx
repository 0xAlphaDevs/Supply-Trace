"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import Link from "next/link"

export default function Home() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/inventory");
    }
  });

  return (
    <div className="">
      <div className="flex justify-between items-center px-8 py-4">
        <Link href="/app" className="flex gap-2 text-xl font-bold">
          <Image
            src="favicon.svg"
            width={25}
            height={20}
            alt="Picture of the app"
          />
          <p>Supply Trace</p>
        </Link>
        <ConnectKitButton />
      </div>
      <div className="flex flex-col items-center gap-4 mt-28">
        <Image
          src="favicon.svg"
          width={200}
          height={200}
          alt="Picture of the app"
          className="text-center"
        />
        <div className="text-xl font-semibold">
          {" "}
          Please connect your wallet to get started with Supply Trace 😊
        </div>
      </div>
    </div>
  );
}
