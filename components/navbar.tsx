"use client"

import React from "react"
import { ConnectKitButton } from "connectkit"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className="flex justify-between">
      <div className="flex gap-48 items-center">
        <Link href="/">Navbar</Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/inventory" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === ("/inventory")
                      ? "bg-orange-300"
                      : ""
                  )}
                >
                  Inventory
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/create-product" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === ("/create-product")
                    ? "bg-orange-300"
                    : ""
                )}>
                  Create Product
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/past-transactions" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === ("/past-transactions")
                    ? "bg-orange-300"
                    : ""
                )}>
                  Past Transactions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/verify" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === ("/verify")
                    ? "bg-orange-300"
                    : ""
                )}>
                  Verify
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <ConnectKitButton />
    </div>
  )
}

export default Navbar
