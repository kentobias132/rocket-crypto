import axios from "axios";

let cacheData = null;
let cacheTimestamp = null;

export async function GET() {
  const CACHE_DURATION = 60 * 1000; // Cache duration in milliseconds (e.g., 1 minute)

  if (cacheData && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return new Response(JSON.stringify(cacheData), { status: 200 });
  }

  try {
    const getPriceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,tether,binancecoin,solana,cardano,dogecoin,polkadot,polygon,shibainu,tron,chainlink,uniswap,cosmos,stellar",
          order: "market_cap_desc",
          per_page: 15,
          page: 1,
          sparkline: true,
        },
      }
    );

    const tablePriceResponse = getPriceResponse.data;

    cacheData = tablePriceResponse;
    cacheTimestamp = Date.now();

    return new Response(JSON.stringify(tablePriceResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching crypto data", error);
    return new Response(
      JSON.stringify(
        { message: "Failed to fetch data" },
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    );
  }
}
