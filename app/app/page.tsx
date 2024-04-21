"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import Link from "next/link";
import { supplyTraceRegistryAbi } from "@/constants/abi/supplyTraceRegistry";
import UserRegistry from "@/components/userRegistry";

interface User {
  name: string;
  industry: string;
}

export default function Home() {
  const { isConnected, address } = useAccount();
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { data, isFetched } = useReadContract({
    abi: supplyTraceRegistryAbi,
    functionName: "getUser",
    address: "0x6aEa5211b23d5E87DDCC2BC7DDb04002ce469269",
    args: [address],
  });

  console.log("Data from Registry", data);

  useEffect(() => {
    let user: User = {
      //@ts-ignore
      name: data ? data[0] : "",
      //@ts-ignore
      industry: data ? data[1] : "",
    };

    if (user.name == "" && data !== undefined) {
      setShowModal(true);
    }

    if (address && user.name) {
      router.push("/inventory");
    }
  }, [data]);

  return (
    <div className="">
      {/* Navbar */}
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

      {showModal ? (
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
            This wallet is not yet registered with Supply Trace. Click Register
            below to continue
          </div>
          <UserRegistry />
        </div>
      ) : (
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
      )}
    </div>
  );
}
