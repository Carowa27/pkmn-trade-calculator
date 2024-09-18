import { Currency, IRateApiResponse } from "@/interfaces/interfaces";
import axios from "axios";
import { getToday } from "./dateFunctions";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getRateFromApi = async () => {
  const ID = process.env.COIN_RATE_API_KEY;
  try {
    const result = await get<IRateApiResponse>(
      `https://openexchangerates.org/api/latest.json?app_id=${ID}`
    ).then((res) => {
      return res.data.rates;
    });
    const ratesToSave = { date: getToday(), rates: result };
    localStorage.setItem(
      "moneyRatesForPkmnTrades",
      JSON.stringify(ratesToSave)
    );
  } catch (error) {
    console.error("An error occurred: ", error);
  }
};
