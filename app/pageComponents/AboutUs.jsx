import React from "react";
import { Eye, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";

function AboutUs() {
  return (
    <div className="container px4 mx-auto font-sans">
      <div className="flex py-8 flex-col md:flex-row justify-between items-center">
        <div className=" flex justify-center w-full md:w-1/2 mb-12 md:mb-0">
          <img
            src="/Illustration.png"
            className="w-[80%] h-[80%] object-contain"
            alt=""
          />
        </div>
        <div className=" flex flex-col px-4 md:px-8 justify-center md:w-1/2">
          <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
            We are the most trusted cryptocurrency platform.
          </h1>
          <p className="py-8 md:py-10">
            We believe Cryptolly is here to stay — and that a future worth
            building is one which opens its doors and invites everyone in.
          </p>
          <div className="flex flex-col space-y-6">
            <div className="flex space-x-4">
              <div className=" flex justify-center items-center p-6 rounded-lg dark:bg-gray-800 bg-red-200 ">
                {" "}
                <Eye color="red" width={30} height={30} />{" "}
              </div>
              <div>
                <h2 className=" font-bold text-xl md:text-2xl">Clarity</h2>
                <p>
                  We help you make sense of the coins, the terms, the dense
                  charts and market changes.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex justify-center items-center p-6 rounded-lg dark:bg-gray-800 bg-green-200">
                <ShieldCheck color="green" width={30} height={30} />
              </div>
              <div>
                <h2 className=" font-bold text-xl md:text-2xl">Confidence</h2>
                <p>
                  Our markets are always up to date, sparking curiosity with
                  real-world relevance.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex justify-center items-center p-6 rounded-lg dark:bg-gray-800 bg-blue-200">
                <Users color="blue" width={30} height={30} />
              </div>
              <div>
                <h2 className=" font-bold text-xl md:text-2xl">Confidence</h2>
                <p>
                  We supports the crypto community, putting data in the hands
                  which need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-16 px-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <p className="max-w-lg mx-auto text-gray-400 mb-10">
          Start your crypto journey with ease. Follow these simple steps to
          download, connect, trade, and start earning.
        </p>

        <div className="flex flex-col items-center md:flex-row md:items-start gap-8 md:gap-4">
          <Step
            iconSrc="/BitcoinCloud.png"
            stepNumber="STEP 1"
            title="Download"
            description="Get started by downloading our app. Securely manage your crypto assets all in one place with advanced security and easy access."
          />

          <Connector />

          <Step
            iconSrc="/BitcoinWallet.png"
            stepNumber="STEP 2"
            title="Connect Wallet"
            description="Link your preferred crypto wallet for seamless transactions. We support multiple wallets to keep your assets safe and accessible."
          />

          <Connector />

          <Step
            iconSrc="/BitcoinMining.png"
            stepNumber="STEP 3"
            title="Start Trading"
            description="Begin trading with our intuitive interface. Access a variety of cryptocurrencies and make informed decisions with real-time market data."
          />

          <Connector />

          <Step
            iconSrc="/BitcoinComparison.png"
            stepNumber="STEP 4"
            title="Earn Money"
            description="Earn rewards through staking, referrals, and more. Grow your portfolio as you engage with the crypto world."
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

function Step({ iconSrc, stepNumber, title, description }) {
  return (
    <div className=" flex flex-col items-center justify-center text-center max-w-xs">
      <Image src={iconSrc} alt={`${title} Icon`} width={100} height={100} />
      <p className="text-gray-400 mt-4">{stepNumber}</p>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

// Connector component
function Connector() {
  return (
    <div className="hidden md:flex mt-8">
      <img src="/connectLine.png" className="w-full h-10 object-contain" />
    </div>
  );
}
