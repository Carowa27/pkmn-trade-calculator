import { IPkmnCard } from "@/app/dataFromApi";

export interface ISavedCard {
  card: IPkmnCard;
  type: string;
}

export interface IRemoveCard {
  id: number;
  trader: "one" | "two";
}
