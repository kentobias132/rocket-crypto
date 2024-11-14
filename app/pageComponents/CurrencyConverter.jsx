"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Loader2 } from "lucide-react";
import axios from "axios";

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [amount, setAmount] = useState(0.0025);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("/api/currencyData");
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        toast.error("Failed to fetch currency data. Please try again later.");
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencySwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    setIsLoading(true);
    setError("");
    try {
      const fromCurrencyRate =
        currencies.find((c) => c.code === fromCurrency)?.rate || 1;
      const toCurrencyRate =
        currencies.find((c) => c.code === toCurrency)?.rate || 1;
      const conversionRate = toCurrencyRate / fromCurrencyRate;
      setConvertedAmount((amount * conversionRate).toFixed(2));
    } catch (error) {
      setError("An error occurred during conversion");
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrencyIcon = (code) => {
    switch (code) {
      case "USDT":
        return "₿";
      case "NGN":
        return "₦";
      default:
        return code;
    }
  };

  return (
    <div className="relative ">
      <img
        className="absolute object-contain -z-10 bottom-0 right-0"
        src="/Graphic1.png"
        alt=""
      />

      <div data-aos="fade-left" className="container mx-auto  px-4">
        <div className="flex flex-col py-10 pt-32 lg:flex-row  md:justify-between items-center font-sans">
          <div className="w-full md:w-1/2 max-w-md mx-auto p-6 space-y-8 bg-gray-300 dark:bg-gray-900 rounded-3xl">
            <div className="space-y-6">
              {/* Send Section */}
              <div className="space-y-2">
                <label className="font-bold">You send</label>
                <div className="grid grid-cols-[1fr,auto] gap-2">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="bg-gray-200 outline-none text-black text-xl h-14"
                  />
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-[160px] text-white bg-zinc-800 border-zinc-700 h-14">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {getCurrencyIcon(fromCurrency)}
                          </span>
                          <span>{fromCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{getCurrencyIcon(currency.code)}</span>
                              <span>{currency.code}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCurrencySwap}
                  className="rounded-full bg-zinc-800 hover:bg-zinc-700 h-12 w-12"
                >
                  <ArrowUpDown className=" text-white h-6 w-6" />
                </Button>
              </div>

              {/* Receive Section */}
              <div className="space-y-2">
                <label className="font-bold">You receive</label>
                <div className="grid grid-cols-[1fr,auto] gap-2">
                  <Input
                    type="number"
                    value={convertedAmount}
                    readOnly
                    className="bg-gray-200 text-black text-xl h-14"
                  />
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-[160px] bg-zinc-800 text-white border-zinc-700 h-14">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {getCurrencyIcon(toCurrency)}
                          </span>
                          <span>{toCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{getCurrencyIcon(currency.code)}</span>
                              <span>{currency.code}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Convert Button */}
              <Button
                onClick={handleConvert}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-[#192c81] hover:bg-[#12205c]"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "Rock Now"
                )}
              </Button>
            </div>
            {/* <ToastContainer position="bottom-right" theme="dark" /> */}
          </div>
          <div
            data-aos="fade-right"
            className="w-full md:w-1/2 mt-20 lg:px-10 lg:mt-0"
          >
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                The most trusted cryptocurrency platform.
              </h1>
              <p className="py-6">
                Rocket has a variety of features that make it the best place to
                start trading
              </p>
              <Button className=" bg-blue-700 hover:bg-blue-800 px-8 text-white rounded-3xl ">
                Let's Trade Now{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
