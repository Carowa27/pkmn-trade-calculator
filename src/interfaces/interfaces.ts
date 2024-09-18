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
  currency: "SEK" | "NOK" | "EUR" | "USD" | "GBP";
}
