"use client";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 py-4 px-6 sm:px-8 md:px-10 lg:px-12 shadow-md dark:shadow-none">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <a
            href="/"
            className="text-2xl font-bold text-blue-500 dark:text-white "
          >
            Rocket
          </a>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuLink href="/homepage">Homepage</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/buy-crypto">
                Buy Crypto
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/markets">Markets</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/exchange">Exchange</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/spot">Spot</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/bitusdt">BITUSDT</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/pages">Pages</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/assets">Assets</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/orders-and-trades">
                Orders & Trades
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenu>

          <Button
            variant={isDarkMode ? "secondary" : "primary"}
            onClick={toggleDarkMode}
            className="rounded-full p-2"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
