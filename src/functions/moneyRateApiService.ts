import { IRateApiResponse } from "@/interfaces/interfaces";
import axios from "axios";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getRateFromApi = async () => {
  const ID = process.env.COIN_RATE_API_KEY;
  try {
    const result = await get<IRateApiResponse>(
      `https://openexchangerates.org/api/latest.json?app_id=${ID}`
    )
      .then((res) => {
        return res.data.rates;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error occurred: ", error);
  }
};
