"use client";

import Hero from "./pageComponents/Hero";
import Navbar from "./pageComponents/Navbar";
import Test from "./pageComponents/Test";
import MarketPriceWrapper from "./pageComponents/MarketPrice";
import AboutUs from "./pageComponents/AboutUs";
import LearnMore from "./pageComponents/LearnMore";
import Footer from "./pageComponents/Footer";
import CurrencyConverter from "./pageComponents/CurrencyConverter";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      {/* <ExchangeSection /> */}
      <Test />
      <CurrencyConverter />
      {/* <MarketPrice /> */}
      <MarketPriceWrapper />
      <AboutUs />
      <LearnMore />
      <Footer />
    </div>
  );
}
