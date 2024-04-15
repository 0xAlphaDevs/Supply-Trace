"use client"

import * as React from "react"
import { WagmiProvider, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"

interface ProvidersProps {
  children: React.ReactNode
}

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
    chains: [sepolia],

    appName: "Supply_Trace",

  })
)

const queryClient = new QueryClient()

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="rounded">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
