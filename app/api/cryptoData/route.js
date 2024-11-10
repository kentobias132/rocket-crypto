import axios from "axios";

// In-memory cache
let cacheData = null;
let cacheTimestamp = null;

export async function GET() {
  const CACHE_DURATION = 60 * 1000; // Cache duration in milliseconds (e.g., 1 minute)

  if (cacheData && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return new Response(JSON.stringify(cacheData), { status: 200 });
  }

  try {
    const priceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd&include_24hr_change=true"
    );
    const priceData = priceResponse.data;

    const coins = ["bitcoin", "ethereum", "tether", "binancecoin"];
    const chartDataPromises = coins.map((coin) =>
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`
        )
        .then((res) => res.data)
    );
    const chartData = await Promise.all(chartDataPromises);

    const data = {
      bitcoin: {
        price: priceData.bitcoin.usd,
        change: priceData.bitcoin.usd_24h_change,
        chart: chartData[0].prices.map((point) => point[1]),
      },
      ethereum: {
        price: priceData.ethereum.usd,
        change: priceData.ethereum.usd_24h_change,
        chart: chartData[1].prices.map((point) => point[1]),
      },
      tether: {
        price: priceData.tether.usd,
        change: priceData.tether.usd_24h_change,
        chart: chartData[2].prices.map((point) => point[1]),
      },
      binancecoin: {
        price: priceData.binancecoin.usd,
        change: priceData.binancecoin.usd_24h_change,
        chart: chartData[3].prices.map((point) => point[1]),
      },
    };

    // Update cache
    cacheData = data;
    cacheTimestamp = Date.now();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// ============================================
// // app/api/cryptoData/route.js

// import axios from "axios";

// export async function GET() {
//   try {
//     const priceResponse = await axios.get(
//       "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd&include_24hr_change=true"
//     );
//     const priceData = priceResponse.data;

//     const coins = ["bitcoin", "ethereum", "tether", "binancecoin"];
//     const chartDataPromises = coins.map((coin) =>
//       axios
//         .get(
//           `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
//         )
//         .then((res) => res.data)
//     );
//     const chartData = await Promise.all(chartDataPromises);

//     const data = {
//       bitcoin: {
//         price: priceData.bitcoin.usd,
//         change: priceData.bitcoin.usd_24h_change,
//         chart: chartData[0].prices.map((point) => point[1]),
//       },
//       ethereum: {
//         price: priceData.ethereum.usd,
//         change: priceData.ethereum.usd_24h_change,
//         chart: chartData[1].prices.map((point) => point[1]),
//       },
//       tether: {
//         price: priceData.tether.usd,
//         change: priceData.tether.usd_24h_change,
//         chart: chartData[2].prices.map((point) => point[1]),
//       },
//       binancecoin: {
//         price: priceData.binancecoin.usd,
//         change: priceData.binancecoin.usd_24h_change,
//         chart: chartData[3].prices.map((point) => point[1]),
//       },
//     };

//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     console.error("Error in API route:", error);
//     return new Response(JSON.stringify({ message: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }
