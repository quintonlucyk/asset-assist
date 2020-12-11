import { SampleAppleData } from "../sample-responses/AppleData";
import { SampleATATData } from "../sample-responses/ATATData";

const inDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const fetchHistoricalData = async (key: string, symbol: string) => {
  const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || "";

  if (!symbol) {
    return {};
  }
  try {
    if (inDev) {
      return Math.floor(Math.random() * 10 + 1) % 2 === 0
        ? SampleAppleData
        : SampleATATData;
    }

    const res = await fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&region=US`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      }
    );

    return await res.json();
  } catch (e) {
    return e;
  } finally {
  }
};
