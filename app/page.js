import Hero from "./pageComponents/Hero";
import Navbar from "./pageComponents/Navbar";
import ExchangeSection from "./pageComponents/Exchange";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ExchangeSection />
    </div>
  );
}
