"use client";
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const Test = () => {
  const [prices, setPrices] = useState({
    bitcoin: { price: 0, change: 0, data: [] },
    ethereum: { price: 0, change: 0, data: [] },
    tether: { price: 0, change: 0, data: [] },
    binancecoin: { price: 0, change: 0, data: [] },
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/cryptoData");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();

        setPrices({
          bitcoin: {
            price: data.bitcoin.price,
            change: data.bitcoin.change,
            data: data.bitcoin.chart,
          },
          ethereum: {
            price: data.ethereum.price,
            change: data.ethereum.change,
            data: data.ethereum.chart,
          },
          tether: {
            price: data.tether.price,
            change: data.tether.change,
            data: data.tether.chart,
          },
          binancecoin: {
            price: data.binancecoin.price,
            change: data.binancecoin.change,
            data: data.binancecoin.chart,
          },
        });
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    // const interval = setInterval(fetchPrices, 360000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const SimpleLineChart = ({ data, color, width = 80, height = 30 }) => {
    const values = data;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    const points = values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="overflow-hidden">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const CryptoCard = ({ name, symbol, price, change, icon, data }) => (
    <div className=" dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md bg-[#F7F7F7] transition-shadow">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col w-full">
          <div className="w-9 h-9 mb-1">{icon}</div>
          <div>
            <h3 className="text-xs font-medium text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
        </div>
        <div className="flex w-full flex-col items-end">
          <div className=" h-10">
            <SimpleLineChart
              data={data}
              color={change >= 0 ? "#10B981" : "#EF4444"}
            />
          </div>
          <div
            className={`text-xs flex justify-center text-white items-center space-x-1  py-1 px-2.5 rounded-xl font-thin ${
              change >= 0 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <p>
              {change >= 0 ? (
                <ArrowUp height={12} width={12} />
              ) : (
                <ArrowDown height={12} width={12} />
              )}
            </p>
            <p>{change.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          USD{" "}
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
      </div>
    </div>
  );

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="grid lg:-mt-24  mx-4 bg-white shadow-lg dark:bg-[#23262F] max-w-5xl lg:mx-auto rounded-xl grid-cols-1 md:grid-cols-4 gap-4 p-4">
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
          data={prices.bitcoin.data}
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
          data={prices.ethereum.data}
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
          data={prices.tether.data}
        />
        <CryptoCard
          name="Binance Coin"
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
          data={prices.binancecoin.data}
        />
      </div>
    </div>
  );
};

export default Test;

// ===========================================
// "use client";
// import { useState, useEffect } from "react";

// const Test = () => {
//   const [prices, setPrices] = useState({
//     bitcoin: { price: 0, change: 0, data: [] },
//     ethereum: { price: 0, change: 0, data: [] },
//     tether: { price: 0, change: 0, data: [] },
//     binancecoin: { price: 0, change: 0, data: [] },
//   });

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         // Fetch current prices and 24hr change
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd&include_24hr_change=true"
//         );
//         const data = await response.json();

//         // Fetch historical data for the last 7 days for each coin
//         // const fetchChartData = async (coinId) => {
//         //   const chartResponse = await fetch(
//         //     `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=3`
//         //   );
//         //   const chartData = await chartResponse.json();
//         //   return chartData.prices.map((price) => price[1]); // Extract prices only
//         // };
//         const fetchChartData = async (coinId) => {
//           const response = await fetch(
//             `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily` // Change `days` to reduce data length (e.g., 1, 7, or 14)
//           );
//           const chartData = await response.json();
//           return chartData.prices.map(([timestamp, price]) => price); // Extract only the prices
//         };

//         // Fetch data concurrently for all coins
//         const [bitcoinData, ethereumData, tetherData, binancecoinData] =
//           await Promise.all([
//             fetchChartData("bitcoin"),
//             fetchChartData("ethereum"),
//             fetchChartData("tether"),
//             fetchChartData("binancecoin"),
//           ]);

//         // Update the state with both current prices and chart data
//         setPrices({
//           bitcoin: {
//             price: data.bitcoin.usd,
//             change: data.bitcoin.usd_24h_change,
//             data: bitcoinData,
//           },
//           ethereum: {
//             price: data.ethereum.usd,
//             change: data.ethereum.usd_24h_change,
//             data: ethereumData,
//           },
//           tether: {
//             price: data.tether.usd,
//             change: data.tether.usd_24h_change,
//             data: tetherData,
//           },
//           binancecoin: {
//             price: data.binancecoin.usd,
//             change: data.binancecoin.usd_24h_change,
//             data: binancecoinData,
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching crypto prices:", error);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   const SimpleLineChart = ({ data, color, width = 200, height = 40 }) => {
//     const values = data;
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const range = max - min;

//     const points = values
//       .map((value, index) => {
//         const x = (index / (values.length - 1)) * width;
//         const y = height - ((value - min) / range) * height;
//         return `${x},${y}`;
//       })
//       .join(" ");

//     return (
//       <svg width={width} height={height} className="overflow-hidden">
//         <polyline
//           points={points}
//           fill="none"
//           stroke={color}
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   };

//   const CryptoCard = ({ name, symbol, price, change, icon, data }) => (
//     <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <div className="w-8 h-8 mr-3">{icon}</div>
//           <div>
//             <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//               {name}
//             </h3>
//             <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
//           </div>
//         </div>
//         <div className="flex flex-col items-end">
//           <span className="text-sm font-medium text-gray-900 dark:text-white">
//             USD{" "}
//             {price.toLocaleString(undefined, {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </span>
//           <span
//             className={`text-xs ${
//               change >= 0 ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {change >= 0 ? "+" : ""}
//             {change.toFixed(2)}%
//           </span>
//         </div>
//       </div>
//       <div className="mt-4 w-1/2 h-16">
//         <SimpleLineChart
//           data={data}
//           color={change >= 0 ? "#10B981" : "#EF4444"}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
//       <CryptoCard
//         name="Bitcoin"
//         symbol="BTC"
//         price={prices.bitcoin.price}
//         change={prices.bitcoin.change}
//         icon={<svg className="w-8 h-8" /* Bitcoin SVG Icon */ />}
//         data={prices.bitcoin.data}
//       />
//       <CryptoCard
//         name="Ethereum"
//         symbol="ETH"
//         price={prices.ethereum.price}
//         change={prices.ethereum.change}
//         icon={<svg className="w-8 h-8" /* Ethereum SVG Icon */ />}
//         data={prices.ethereum.data}
//       />
//       <CryptoCard
//         name="Tether"
//         symbol="USDT"
//         price={prices.tether.price}
//         change={prices.tether.change}
//         icon={<svg className="w-8 h-8" /* Tether SVG Icon */ />}
//         data={prices.tether.data}
//       />
//       <CryptoCard
//         name="Binance Coin"
//         symbol="BNB"
//         price={prices.binancecoin.price}
//         change={prices.binancecoin.change}
//         icon={<svg className="w-8 h-8" /* Binance Coin SVG Icon */ />}
//         data={prices.binancecoin.data}
//       />
//     </div>
//   );
// };

// export default Test;

// ===========================================================

// "use client";
// import { useState, useEffect } from "react";

// const Test = () => {
//   const [prices, setPrices] = useState({
//     bitcoin: { price: 0, change: 0, data: [] },
//     ethereum: { price: 0, change: 0, data: [] },
//     tether: { price: 0, change: 0, data: [] },
//     binancecoin: { price: 0, change: 0, data: [] },
//   });

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd&include_24hr_change=true"
//         );
//         const data = await response.json();

//         setPrices({
//           bitcoin: {
//             price: data.bitcoin.usd,
//             change: data.bitcoin.usd_24h_change,
//             data: [
//               100, 120, 90, 110, 95, 130, 115, 89, 111, 130, 100, 85, 120, 90,
//               110, 70, 85, 60,
//             ],
//           },
//           ethereum: {
//             price: data.ethereum.usd,
//             change: data.ethereum.usd_24h_change,
//             data: [1200, 1300, 1100, 1400, 1250, 1500, 1400],
//           },
//           tether: {
//             price: data.tether.usd,
//             change: data.tether.usd_24h_change,
//             data: [1, 1.01, 1.02, 1.01, 1.03, 1.02, 1.01],
//           },
//           binancecoin: {
//             price: data.binancecoin.usd,
//             change: data.binancecoin.usd_24h_change,
//             data: [300, 320, 280, 340, 310, 360, 330],
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching crypto prices:", error);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);

//   const SimpleLineChart = ({ data, color, width = 80, height = 40 }) => {
//     const values = data;
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const range = max - min;

//     const points = values
//       .map((value, index) => {
//         const x = (index / (values.length - 1)) * width;
//         const y = height - ((value - min) / range) * height;
//         return `${x},${y}`;
//       })
//       .join(" ");

//     return (
//       <svg width={width} height={height} className="overflow-hidden">
//         <polyline
//           points={points}
//           fill="none"
//           stroke={color}
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   };

//   const CryptoCard = ({ name, symbol, price, change, icon, data }) => (
//     <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <div className="w-8 h-8 mr-3">{icon}</div>
//           <div>
//             <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//               {name}
//             </h3>
//             <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
//           </div>
//         </div>
//         <div className="flex flex-col items-end">
//           <span className="text-sm font-medium text-gray-900 dark:text-white">
//             USD{" "}
//             {price.toLocaleString(undefined, {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </span>
//           <span
//             className={`text-xs ${
//               change >= 0 ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {change >= 0 ? "+" : ""}
//             {change.toFixed(2)}%
//           </span>
//         </div>
//       </div>
//       <div className="mt-4 w-1/2 h-16">
//         <SimpleLineChart
//           data={data}
//           color={change >= 0 ? "#10B981" : "#EF4444"}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
//       <CryptoCard
//         name="Bitcoin"
//         symbol="BTC"
//         price={prices.bitcoin.price}
//         change={prices.bitcoin.change}
//         icon={
//           <svg
//             className="w-8 h-8"
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="16" cy="16" r="16" fill="#F7931A" />
//             <path
//               d="M22.5 14.5C22.5 12 20.5 11 18 11V9H16V11H15V9H13V11H10V13H12V19H10V21H13V23H15V21H16V23H18V21C20.5 21 22.5 20 22.5 17.5C22.5 15.5 21.5 14.8 20 14.5C21.5 14.2 22.5 13.5 22.5 11.5V14.5ZM16 13H18C19.4 13 20 13.6 20 14.5C20 15.4 19.4 16 18 16H16V13ZM18 19H16V16H18C19.4 16 20 16.6 20 17.5C20 18.4 19.4 19 18 19Z"
//               fill="white"
//             />
//           </svg>
//         }
//         data={prices.bitcoin.data}
//       />

//       <CryptoCard
//         name="Ethereum"
//         symbol="ETH"
//         price={prices.ethereum.price}
//         change={prices.ethereum.change}
//         icon={
//           <svg
//             className="w-8 h-8"
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="16" cy="16" r="16" fill="#627EEA" />
//             <path
//               d="M16 6L15.9 6.8V20.1L16 20.2L22.1 16.7L16 6Z"
//               fill="white"
//               fillOpacity="0.6"
//             />
//             <path d="M16 6L9.9 16.7L16 20.2V13.6V6Z" fill="white" />
//             <path
//               d="M16 21.5L15.9 21.6V26L16 26.2L22.1 18L16 21.5Z"
//               fill="white"
//               fillOpacity="0.6"
//             />
//             <path d="M16 26.2V21.5L9.9 18L16 26.2Z" fill="white" />
//           </svg>
//         }
//         data={prices.ethereum.data}
//       />

//       <CryptoCard
//         name="Tether"
//         symbol="USDT"
//         price={prices.tether.price}
//         change={prices.tether.change}
//         icon={
//           <svg
//             className="w-8 h-8"
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="16" cy="16" r="16" fill="#26A17B" />
//             <path
//               d="M18.2 16.5V14H23.1V10.5H8.9V14H13.8V16.5C11 16.8 9 17.6 9 18.5C9 19.4 11 20.2 13.8 20.5V24H18.2V20.5C21 20.2 23 19.4 23 18.5C23 17.6 21 16.8 18.2 16.5ZM18.2 19.8V17.2C20.2 17 21.7 17.4 21.7 18C21.7 18.6 20.2 19 18.2 19.8ZM13.8 17.2V19.8C11.8 19 10.3 18.6 10.3 18C10.3 17.4 11.8 17 13.8 17.2Z"
//               fill="white"
//             />
//           </svg>
//         }
//         data={prices.tether.data}
//       />

//       <CryptoCard
//         name="Binance Coin"
//         symbol="BNB"
//         price={prices.binancecoin.price}
//         change={prices.binancecoin.change}
//         icon={
//           <svg
//             className="w-8 h-8"
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
//             <path
//               d="M16 7L18.6 9.6L13.2 15L16 17.8L18.6 15.2L21.4 18L16 23.4L10.6 18L13.4 15.2L16 17.8L18.8 15L13.4 9.6L16 7Z"
//               fill="white"
//             />
//             <path
//               d="M22.8 13.4L20.2 16L22.8 18.6L25.4 16L22.8 13.4Z"
//               fill="white"
//             />
//             <path
//               d="M9.2 13.4L6.6 16L9.2 18.6L11.8 16L9.2 13.4Z"
//               fill="white"
//             />
//           </svg>
//         }
//         data={prices.binancecoin.data}
//       />
//     </div>
//   );
// };

// export default Test;

// ========================================

// "use client";
// import { useState, useEffect } from "react";

// const Test = () => {
//   const [prices, setPrices] = useState({
//     bitcoin: { price: 0, change: 0, data: [] },
//     ethereum: { price: 0, change: 0, data: [] },
//     tether: { price: 0, change: 0, data: [] },
//     binancecoin: { price: 0, change: 0, data: [] },
//   });

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd&include_24hr_change=true"
//         );
//         const data = await response.json();

//         setPrices({
//           bitcoin: {
//             price: data.bitcoin.usd,
//             change: data.bitcoin.usd_24h_change,
//             data: [100, 120, 90, 110, 95, 130, 115],
//           },
//           ethereum: {
//             price: data.ethereum.usd,
//             change: data.ethereum.usd_24h_change,
//             data: [1200, 1300, 1100, 1400, 1250, 1500, 1400],
//           },
//           tether: {
//             price: data.tether.usd,
//             change: data.tether.usd_24h_change,
//             data: [1, 1.01, 1.02, 1.01, 1.03, 1.02, 1.01],
//           },
//           binancecoin: {
//             price: data.binancecoin.usd,
//             change: data.binancecoin.usd_24h_change,
//             data: [300, 320, 280, 340, 310, 360, 330],
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching crypto prices:", error);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const SimpleLineChart = ({ data, color, width = 120, height = 40 }) => {
//     const values = data;
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const range = max - min;

//     const points = values
//       .map((value, index) => {
//         const x = (index / (values.length - 1)) * width;
//         const y = height - ((value - min) / range) * height;
//         return `${x},${y}`;
//       })
//       .join(" ");

//     return (
//       <svg width={width} height={height} className="overflow-visible">
//         <polyline
//           points={points}
//           fill="none"
//           stroke={color}
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   };

//   const CryptoCard = ({ name, symbol, price, change, icon, data }) => (
//     <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-sm transition-shadow">
//       <div className="flex items-start justify-between">
//         <div className="space-y-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8">{icon}</div>
//             <span className="font-medium text-gray-900">{name}</span>
//           </div>
//           <div className="space-y-1">
//             <div className="flex items-baseline space-x-2">
//               <span className="text-2xl font-bold">
//                 USD{" "}
//                 {price.toLocaleString(undefined, {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </span>
//               <span className="text-lg text-gray-500">{symbol}</span>
//             </div>
//             <div
//               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
//                 change >= 0
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
//             </div>
//           </div>
//         </div>
//         <div className="mt-2">
//           <SimpleLineChart
//             data={data}
//             color={change >= 0 ? "#22C55E" : "#EF4444"}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//       <CryptoCard
//         name="Bitcoin"
//         symbol="BTC"
//         price={prices.bitcoin.price}
//         change={prices.bitcoin.change}
//         icon={
//           <svg
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="16" cy="16" r="16" fill="#627EEA" />
//             <g clipPath="url(#clip0_btc)">
//               <path
//                 d="M16 4L15.9 10.4V20.4L16 20.5L22.1 16.9L16 4Z"
//                 fill="white"
//                 fillOpacity="0.6"
//               />
//               <path d="M16 4L9.9 16.9L16 20.5V12.8V4Z" fill="white" />
//               <path
//                 d="M16 21.8L15.9 21.9V25.8L16 26L22.1 18.2L16 21.8Z"
//                 fill="white"
//                 fillOpacity="0.6"
//               />
//               <path d="M16 26V21.8L9.9 18.2L16 26Z" fill="white" />
//             </g>
//             <defs>
//               <clipPath id="clip0_btc">
//                 <rect
//                   width="24"
//                   height="24"
//                   fill="white"
//                   transform="translate(4 4)"
//                 />
//               </clipPath>
//             </defs>
//           </svg>
//         }
//         data={prices.bitcoin.data}
//       />

//       {/* Repeat for other cryptocurrencies */}
//     </div>
//   );
// };

// export default Test;
