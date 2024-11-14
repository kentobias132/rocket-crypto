import axios from "axios";

export async function GET(request) {
  try {
    const response = await axios.get(
      "https://v6.exchangerate-api.com/v6/2d01bc2f12aacf0938e744ff/latest/USD"
    );
    const currenciesArray = Object.keys(response.data.conversion_rates).map(
      (code) => ({
        code,
        rate: response.data.conversion_rates[code],
      })
    );
    return new Response(JSON.stringify(currenciesArray), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch currency data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
