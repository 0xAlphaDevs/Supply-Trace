"use client"

import { ConnectKitButton } from "connectkit";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-bold text-3xl">
      Welcome to Supply Trace
      <ConnectKitButton />
    </main>
  );
}
