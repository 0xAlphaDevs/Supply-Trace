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

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-48 items-center">
        <div>Navbar</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/inventory" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Inventory
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/register" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Register
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/product" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Product
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/history" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  History
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
