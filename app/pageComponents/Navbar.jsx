"use client";
import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
// } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white font-sans dark:bg-gray-900 px-6 sm:px-8 md:px-10 lg:px-12 shadow-md dark:shadow-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16 md:my-0 justify-between md:justify-center">
          <div className="flex justify-between md:justify-center space-x-2 items-center">
            <img src="./Frame.png" />
            <a href="/" className="text-2xl font-bold dark:text-white ">
              Rocket
            </a>
          </div>
          <div className="hidden  md:flex justify-between items-center space-x-4 w-full">
            <div className="flex ml-10 items-center justify-center">
              <Link
                href="/"
                className="py-4 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
              >
                Homepage
              </Link>
              <Link
                href="/"
                className="py-4 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
              >
                Buy Crpto
              </Link>
              <Link
                href="/"
                className="py-4 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
              >
                Markets
              </Link>
              <Link
                href="/"
                className="py-4 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
              >
                Exchange
              </Link>
              <Link
                href="/"
                className="py-4 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
              >
                Spot
              </Link>
            </div>

            <div className="flex justify-center items-centers">
              <Link
                href="/"
                className="py-4 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
              >
                Assect
              </Link>

              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant={isDarkMode ? "secondary" : "primary"}
                  onClick={toggleDarkMode}
                  className="rounded-full p-3"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <button className="border hover:text-white hover:bg-[#3772FF] rounded-2xl px-2 border-black">
                  Wallet
                </button>
                <button>
                  <UserCircle2 className="h-10 w-10" />
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex  space-x-4 items-center justify-center">
              <Button
                variant={isDarkMode ? "secondary" : "primary"}
                onClick={toggleDarkMode}
                className="rounded-full p-3"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X width={30} height={30} />
                ) : (
                  <Menu width={30} height={30} />
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute transition-transform px-4 top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg">
              <div className="flex flex-col">
                <Link
                  href="/"
                  className="py-3 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
                >
                  Homepage
                </Link>
                <Link
                  href="/"
                  className="py-3 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
                >
                  Buy Crypto
                </Link>
                <Link
                  href="/"
                  className="py-3 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
                >
                  Markets
                </Link>
                <Link
                  href="/"
                  className="py-3 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
                >
                  Exchange
                </Link>
                <Link
                  href="/"
                  className="py-3 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
                >
                  Spot
                </Link>
                <Link
                  href="/"
                  className="py-3 px-5 font-medium hover:text-white text-black dark:text-white hover:bg-[#3772FF]"
                >
                  Assect
                </Link>
                <div className="flex px-4 space-x-4 mb-3">
                  <button className="border hover:text-white hover:bg-[#3772FF] rounded-2xl px-5 dark:border-white border-black">
                    Wallet
                  </button>
                  <button>
                    <UserCircle2 className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
