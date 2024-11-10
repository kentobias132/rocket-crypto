import Hero from "./pageComponents/Hero";
import Navbar from "./pageComponents/Navbar";
import ExchangeSection from "./pageComponents/Exchange";
import Test from "./pageComponents/Test";
// import MarketPrice from "./pageComponents/MarketPrice";
import MarketPriceWrapper from "./pageComponents/MarketPrice";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <ExchangeSection /> */}
      <Test />
      {/* <MarketPrice /> */}
      <MarketPriceWrapper />
    </div>
  );
}
