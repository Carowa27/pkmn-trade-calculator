import { Currency } from "@/interfaces/interfaces";
import axios from "axios";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getRateFromApi = async (rate: Currency) => {};
