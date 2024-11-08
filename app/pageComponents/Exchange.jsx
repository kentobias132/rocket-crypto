"use client";
import { Button } from "@/components/ui/button";
import { Bitcoin } from "lucide-react";
import { useState } from "react";

const ExchangeSection = () => {
  const [prices, setPrices] = useState({
    bitcoin: { price: 7000, change: 4 },
    ethereum: { price: 5532, change: 8 },
    tether: { price: 6124, change: -1.876 },
    binancecoin: { price: 3450, change: 5 },
  });

  const CryptoCard = ({ name, symbol, price, change, icon }) => (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 mr-3">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          USD{" "}
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span
          className={`text-xs ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? "↑ " : "↓ "}
          {change.toFixed(2)}%
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className=" relative container px-4 mx-auto flex flex-col justify-center items-center font-sans ">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            <CryptoCard
              name="Bitcoin"
              symbol="BTC"
              price={prices.bitcoin.price}
              change={prices.bitcoin.change}
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#F7931A" />
                  <path
                    d="M22.5 14.5C22.5 12 20.5 11 18 11V9H16V11H15V9H13V11H10V13H12V19H10V21H13V23H15V21H16V23H18V21C20.5 21 22.5 20 22.5 17.5C22.5 15.5 21.5 14.8 20 14.5C21.5 14.2 22.5 13.5 22.5 11.5V14.5ZM16 13H18C19.4 13 20 13.6 20 14.5C20 15.4 19.4 16 18 16H16V13ZM18 19H16V16H18C19.4 16 20 16.6 20 17.5C20 18.4 19.4 19 18 19Z"
                    fill="white"
                  />
                </svg>
              }
            />
            <CryptoCard
              name="Ethereum"
              symbol="ETH"
              price={prices.ethereum.price}
              change={prices.ethereum.change}
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#627EEA" />
                  <path
                    d="M16 6V13.25L22 16L16 6Z"
                    fill="white"
                    fillOpacity="0.602"
                  />
                  <path d="M16 6L10 16L16 13.25V6Z" fill="white" />
                  <path
                    d="M16 21.5V26L22 17.5L16 21.5Z"
                    fill="white"
                    fillOpacity="0.602"
                  />
                  <path d="M16 26V21.5L10 17.5L16 26Z" fill="white" />
                  <path
                    d="M16 20.25L22 16.25L16 13V20.25Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M10 16.25L16 20.25V13L10 16.25Z"
                    fill="white"
                    fillOpacity="0.602"
                  />
                </svg>
              }
            />
            <CryptoCard
              name="Tether"
              symbol="USDT"
              price={prices.tether.price}
              change={prices.tether.change}
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#26A17B" />
                  <path
                    d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
                    fill="white"
                  />
                </svg>
              }
            />
            <CryptoCard
              name="BNB"
              symbol="BNB"
              price={prices.binancecoin.price}
              change={prices.binancecoin.change}
              icon={
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
                  <path
                    d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"
                    fill="white"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* ======================== */}
        <div className=" py-16 md:py-24 z-10  flex flex-col md:flex-row justify-between items-center   ">
          <div className=" w-full md:w-1/2 space-y-10 my-16 md:mb-0 ">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-800 dark:text-white">
              A trusted and secure cryptocurrency exchange.
            </h1>
            <p className="text-lg  max-w-lg text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="rounded-2xl bg-[#3772FF] hover:bg-blue-700 text-white px-8">
              Trading Now
            </Button>
          </div>
          <div className=" flex justify-center w-full md:w-1/2 space-y-10 md:mb-0 ">
            <img
              className="w-[70%] h-[70%] object-contain"
              src="/exchange2.png"
              alt=""
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
