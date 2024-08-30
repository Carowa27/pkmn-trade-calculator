import { IPkmnCard } from "@/app/dataFromApi";

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
}
