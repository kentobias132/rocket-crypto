import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
// import {} from 'lucide-react'

function Footer() {
  const productsPages = [
    { id: 1, name: "Spot", url: "#" },
    { id: 2, name: "Inverse Perpetual", url: "#" },
    { id: 3, name: "USDT Perpetuel", url: "#" },
    { id: 4, name: "Exchange", url: "#" },
    { id: 5, name: "Launchpad", url: "#" },
    { id: 6, name: "Binance Pay", url: "#" },
  ];
  const servicesPages = [
    { id: 1, name: "Buy Crypto", url: "#" },
    { id: 2, name: "Markets", url: "#" },
    { id: 3, name: "Trading Fee", url: "#" },
    { id: 4, name: "Affliate Program", url: "#" },
    { id: 5, name: "Referral Program", url: "#" },
    { id: 6, name: "API", url: "#" },
  ];

  return (
    <footer>
      <div className="border-y border-gray-500">
        <div className="container  font-sans mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex justify-center items-center">
              <div className="flex flex-col py-6 justify-center">
                <div className="flex space-x-3 py-4 items-center">
                  <img src="./Frame.png " className="w-10 h-10" />
                  <a href="/" className="text-2xl font-bold dark:text-white ">
                    Rocket
                  </a>
                </div>
                <div>
                  <h2 className=" font-bold text-lg">Let's talk! 🤙</h2>
                  <p className="text-sm py-2">+234 907 606 6694</p>
                  <p className="text-sm py-2">thobhi2@gmail.com</p>
                  <p className="text-sm  py-2">
                    Free For All Of The World People
                  </p>
                </div>
              </div>
            </div>
            <div className=" py-10 flex justify-center items-center border-y lg:border-y-0  lg:border-x border-gray-500">
              <div className="w-[80%] flex flex-col space-y-6 justify-center  items-center lg:flex-row  lg:justify-between">
                <div className="flex flex-col ">
                  <h2 className="font-bold text-sm">PRODUCTS</h2>
                  {productsPages.map((page) => (
                    <a
                      href={page.url}
                      key={page.id}
                      className="py-2 text-gray-800 hover:text-gray-900 dark:text-gray-400"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-sm">SERVICES</h2>
                  {servicesPages.map((page) => (
                    <a
                      href={page.url}
                      key={page.id}
                      className="py-2 text-gray-800 hover:text-gray-900 dark:text-gray-400"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <div className="py-6 md:w-[80%]">
                <h2 className=" text-3xl font-medium">Newsletter</h2>
                <p className=" text-gray-800 hover:text-gray-800 dark:text-gray-400 py-5">
                  Subscribe to Our Newsletter To Get More Free Updates On
                  Cryptocurrency
                </p>
                <div className="flex justify-between border-2 pl-4 border-gray-800 rounded-3xl">
                  <input
                    type="email"
                    className="bg-transparent outline-none"
                    placeholder="Enter Your Email"
                  />
                  <Button className=" bg-blue-500 px-6 border-2  rounded-3xl ">
                    Submit
                  </Button>
                </div>
                <div className="flex space-x-4 py-6">
                  <Facebook
                    width={25}
                    height={25}
                    className=" hover:text-blue-700 cursor-pointer"
                  />{" "}
                  <Instagram
                    width={25}
                    height={25}
                    className=" hover:text-blue-700 cursor-pointer"
                  />{" "}
                  <Twitter
                    width={25}
                    height={25}
                    className=" hover:text-blue-700 cursor-pointer"
                  />{" "}
                  <Youtube
                    width={25}
                    height={25}
                    className=" hover:text-blue-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 text-center">
        code with <span className=" px-2 text-red-500">❤</span> by kenTobias
      </div>
    </footer>
  );
}

export default Footer;
