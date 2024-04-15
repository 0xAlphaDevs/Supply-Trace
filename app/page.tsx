"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  // const [showHome, setShowHome] = useState(false);
  // const { isConnected, address } = useAccount()
  const router = useRouter()

  // useEffect(() => {
  //   if (isConnected) {
  //     setShowHome(true);
  //   }
  // }, [isConnected]);

  // useEffect(() => {
  //   if (address) {
  //     router.push('/inventory')
  //   }
  // });

  const launchApp = () => {
    router.push('/inventory')
  };



  return (
    <main className="flex min-h-screen flex-col justify-between px-8 py-4 ">
      <div className="">
        <p>Welcome to Supply Trace</p>
        <Button onClick={launchApp}>Launch App</Button>
      </div>
    </main>
  )
}
