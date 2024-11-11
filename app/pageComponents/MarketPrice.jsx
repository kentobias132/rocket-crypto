"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";
import { Button } from "@/components/ui/button";

function MarketPrice() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourite, setFavourite] = useState([]);
  const [searchTerm, setSearhTerm] = useState("");

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("/api/listCryptoData");
        setCryptoData(response.data || []); // Ensure it's an array
        setLoading(false);
      } catch (error) {
        console.error("Error getting listCryptoData", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const filterCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorites = (cryptoId) => {
    setFavourite((prevFav) => {
      if (prevFav.includes(cryptoId)) {
        return prevFav.filter((id) => id !== cryptoId);
      } else {
        return [...prevFav, cryptoId];
      }
    });
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container px-4 mx-auto py-20 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          Market Update{" "}
        </h1>
        <a href="/" className="underline text-sm">
          See All Coin
        </a>
      </div>
      <div className="flex justify-between py-4">
        <DropdownMenu className="md:hidden">
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex ">
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] text-sm hover:text-white text-black dark:text-white ">
            View All
          </Button>
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
            Metaverse
          </Button>
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
            Entertainment
          </Button>
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
            Energy
          </Button>
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
            NFT
          </Button>
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
            Gaming
          </Button>
          <Button className="bg-transparent py-0 px-6 rounded-2xl hover:bg-[#3772FF] hover:text-white text-sm text-black dark:text-white ">
            Musk
          </Button>
        </div>
        <input
          onChange={(e) => setSearhTerm(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search Coin"
          className="rounded-2xl dark:bg-gray-800 px-5 border-2 border-gray-400 "
        />
      </div>
      {/* ================ */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">.</TableHead>
            <TableHead className="w-0">#</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>Last Price</TableHead>
            <TableHead>24h %</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCryptoData.map((crypto, index) => (
            <TableRow
              key={index}

              //   crypto={crypto}
              //   key={crypto.name}
              //   index={index}
              //   favourite={favourite.includes(crypto.name)}
              //   toggleFavorite={() => toggleFavorites(crypto.name)}
            >
              <TableCell className="font-medium">
                <button onClick={() => toggleFavorites(crypto.name)}>
                  <Star
                    className={`${
                      favourite.includes(crypto.name)
                        ? "text-yellow-500 fill-current"
                        : "text-gray-500"
                    }`}
                    height={20}
                    width={20}
                  />
                </button>
              </TableCell>

              <TableCell className="font-medium">{index + 1} </TableCell>
              <TableCell className="text-left flex items-center space-x-2">
                <img className="h-9 w-9" src={crypto.image} alt={crypto.name} />{" "}
                <span className="font-semibold border-r-2 my-2  pr-2 mr-2">
                  {crypto.name}
                </span>{" "}
                <span className="text-xs text-gray-400">
                  {crypto.symbol.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>{crypto.current_price.toFixed(2)}</TableCell>
              <TableCell
                className={`${
                  crypto.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%{" "}
              </TableCell>
              <TableCell>{crypto.market_cap.toLocaleString()} </TableCell>
              <TableCell>
                <SimpleLineChart
                  data={crypto.sparkline_in_7d.price}
                  color={
                    crypto.market_cap_change_percentage_24h >= 0
                      ? "#10B981"
                      : "#EF4444"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ======================= */}
    </div>
  );
}

// Wrap the component in Suspense if using Next.js
export default function MarketPriceWrapper() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <MarketPrice />
    </Suspense>
  );
}

// // Wrapping your component ggdd in a Suspense fallback to ensure client-side hydration syncs with
// "use client";
// import React, { useEffect, useState, Suspense } from "react";
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
//         setLoading(false);
//       } catch (error) {
//         console.error("Error getting listCryptoData", error);
//         setError("Failed to load data");
//         setLoading(false);
//       }
//     };

//     fetchCryptoData();
//     console.log(cryptoData);
//   }, []);

//   const SimpleLineChart = ({ data, color, width = 80, height = 30 }) => {
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

//   if (loading) return <p>Loading... {console.log(cryptoData)}</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container px-4 mx-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="text-left">
//             <th className="">#</th>
//             <th>Name</th>
//             <th>Last Price</th>
//             <th>24h %</th>
//             <th>Market Cap</th>
//             <th>Last 7 Days</th>
//           </tr>
//         </thead>
//         <tbody className="py-10">
//           {cryptoData.map((crypto, index) => (
//             <tr key={index} className="border-b-2">
//               <td>{index + 1}</td>
//               <td className=" flex items-center space-x-2">
//                 <img
//                   className="h-10 w-10"
//                   src={crypto.image}
//                   alt={crypto.name}
//                 />{" "}
//                 <span>
//                   {crypto.name} {console.log(crypto)}
//                 </span>{" "}
//                 <span>{crypto.symbol.toUpperCase()}</span>
//               </td>
//               <td>{crypto.current_price.toFixed(2)}</td>
//               <td
//                 className={`${
//                   crypto.price_change_percentage_24h > 0
//                     ? "text-green-500"
//                     : "text-red-500"
//                 } `}
//               >
//                 {crypto.price_change_percentage_24h.toFixed(2)}%
//               </td>
//               <td>{crypto.market_cap.toLocaleString()} </td>
//               <td>
//                 {" "}
//                 <SimpleLineChart
//                   data={crypto.sparkline_in_7d.price}
//                   color={
//                     crypto.market_cap_change_percentage_24h >= 0
//                       ? "#10B981"
//                       : "#EF4444"
//                   }
//                 />{" "}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // Wrap the component in Suspense in the parent if using Next.js App Router
// export default function MarketPriceWrapper() {
//   return (
//     <Suspense fallback={<p>Loading component...</p>}>
//       <MarketPrice />
//     </Suspense>
//   );
// }
