import { ScrSize } from "@/functions/windowSizes";
import { IPkmnCard } from "./dataFromApi";

export interface ISavedCard {
  card: IPkmnCard;
  type: string;
}

export interface ITraderCard {
  id: number;
  trader: "one" | "two";
}
export interface IRemoveCard {
  card: IPkmnCard;
  trader: "one" | "two";
  id: number;
}

export interface IGlobalValuesProperties {
  screen: { height: number; width: number; breakpoint: ScrSize | undefined };
  exchange: IExchange;
}
export enum Currency {
  SEK = "SEK",
  NOK = "NOK",
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
}

export interface IRateApiResponse {
  base: string;
  disclaimer: string;
  license: string;
  rates: { SEK: number; NOK: number; EUR: number; USD: number; GBP: number };
}
interface IExchange {
  currency: Currency;
  rate: number;
}
export interface ISavedRates {
  date: string;
  rates: { SEK: number; NOK: number; EUR: number; USD: number; GBP: number };
  lastUsedCurrency: Currency;
}
