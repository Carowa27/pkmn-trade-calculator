import {
  Currency,
  IRateApiResponse,
  ISavedRates,
} from "@/interfaces/interfaces";
import axios from "axios";
import { getToday } from "./dateFunctions";
import { useGlobalValue } from "@/components/GlobalValueProvider";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getRateFromApi = async () => {
  const { globalValue, setGlobalValue } = useGlobalValue();
  const ID = process.env.COIN_RATE_API_KEY;
  try {
    const result = await get<IRateApiResponse>(
      `https://openexchangerates.org/api/latest.json?app_id=${ID}`
    ).then((res) => {
      return res.data.rates;
    });
    const ratesToSave: ISavedRates = {
      date: getToday(),
      rates: result,
      lastUsedCurrency: globalValue?.exchange.currency!,
    };
    localStorage.setItem(
      "moneyRatesForPkmnTrades",
      JSON.stringify(ratesToSave)
    );
  } catch (error) {
    console.error("An error occurred: ", error);
  }
};
