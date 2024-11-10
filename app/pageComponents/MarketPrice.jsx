// Wrapping your component in a Suspense fallback to ensure client-side hydration syncs with server-rendered HTML
"use client";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";

function MarketPrice() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("/api/listCryptoData");
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting listCryptoData", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchCryptoData();
    console.log(cryptoData);
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  if (loading) return <p>Loading... {console.log(cryptoData)}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container px-4 mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">#</th>
            <th>Name</th>
            <th>Last Price</th>
            <th>24h %</th>
            <th>Market Cap</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="py-10">
          {cryptoData.map((crypto, index) => (
            <tr key={index} className="border-b-2">
              <td>{index + 1}</td>
              <td className=" flex items-center space-x-2">
                <img
                  className="h-10 w-10"
                  src={crypto.image}
                  alt={crypto.name}
                />{" "}
                <span>
                  {crypto.name} {console.log(crypto)}
                </span>{" "}
                <span>{crypto.symbol.toUpperCase()}</span>
              </td>
              <td>{crypto.current_price.toFixed(2)}</td>
              <td>{crypto.price_change_percentage_24h.toFixed(2)}%</td>
              <td>{crypto.market_cap.toLocaleString()} </td>
              <td>
                {" "}
                <SimpleLineChart
                  data={crypto.sparkline_in_7d.price}
                  color={
                    crypto.market_cap_change_percentage_24h >= 0
                      ? "#10B981"
                      : "#EF4444"
                  }
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Wrap the component in Suspense in the parent if using Next.js App Router
export default function MarketPriceWrapper() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <MarketPrice />
    </Suspense>
  );
}

// "use client";
// import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function MarketPrice() {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       try {
//         const response = await axios.get("/api/listCryptoData");
//         setCryptoData(response.data);
//         console.log(cryptoData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error getting listCryptoData", error);
//         setError("Fail to load data");
//         setLoading(false);
//       }
//     };

//     fetchCryptoData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   //   if (error) return <p>{error}</p>;

//   return (
//     <div className="py-20 overflow-hidden font-sans container mx-auto px-4">
//       <div className="flex justify-between items-center">
//         <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
//           Market Update{" "}
//         </h1>
//         <a href="/" className="underline text-sm">
//           See All Coin
//         </a>
//       </div>
//       <div className="flex justify-between py-4">
//         <div className="flex ">
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] text-sm hover:text-white text-black dark:text-white ">
//             View All
//           </Button>
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
//             Metaverse
//           </Button>
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
//             Entertainment
//           </Button>
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
//             Energy
//           </Button>
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
//             NFT
//           </Button>
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
//             Gaming
//           </Button>
//           <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
//             Musk
//           </Button>
//         </div>
//         <input type="text" placeholder="Search Coin" />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Last Price</th>
//             <th>24h %</th>
//             <th>Market Cap</th>
//             <th>Last 7 Days</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cryptoData.map((crypto, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>
//                 <img src={crypto.image} alt={crypto.name} />{" "}
//                 <span>{crypto.name}</span>{" "}
//                 <span>{crypto.symbol.toUpperCase()}</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MarketPrice;
