"use client";

import * as React from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

interface ProvidersProps {
    children: React.ReactNode;
}

const config = createConfig(
    getDefaultConfig({
        walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
        chains: [mainnet],

        appName: "Supply_Trace",

        // Optional App Info
        // appDescription: "Your App Description",
        // appUrl: "https://family.co", // your app's url
        // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ProvidersProps) {

    return (

        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider theme="rounded">
                    {children}
                </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>

    );
}