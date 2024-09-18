import { ISavedCard } from "@/interfaces/interfaces";
import { cardSum } from "./sumFunctions";

interface ISortProps {
  cards: ISavedCard[];
  sortBy:
    | "valueHighLow"
    | "valueLowHigh"
    | "nameAZ"
    | "nameZA"
    | "releaseOldNew"
    | "releaseNewOld";
}

export const sortCards = ({ cards, sortBy }: ISortProps) => {
  if (sortBy === "valueHighLow") {
    cards.sort(
      (a, b) =>
        cardSum({ card: b.card, chosenType: b.type }) -
        cardSum({ card: a.card, chosenType: a.type })
    );
  }
  if (sortBy === "valueLowHigh") {
    cards.sort(
      (a, b) =>
        cardSum({ card: a.card, chosenType: a.type }) -
        cardSum({ card: b.card, chosenType: b.type })
    );
  }
  if (sortBy === "nameAZ") {
    cards.sort((a, b) =>
      a.card.name
        .toLocaleLowerCase()
        .localeCompare(b.card.name.toLocaleLowerCase())
    );
  }
  if (sortBy === "nameZA") {
    cards.sort((a, b) =>
      b.card.name
        .toLocaleLowerCase()
        .localeCompare(a.card.name.toLocaleLowerCase())
    );
  }
  if (sortBy === "releaseOldNew") {
    cards.sort(
      (a, b) =>
        parseInt(a.card.set.releaseDate.split("/")[0]) -
        parseInt(b.card.set.releaseDate.split("/")[0])
    );
  }
  if (sortBy === "releaseNewOld") {
    cards.sort(
      (a, b) =>
        parseInt(b.card.set.releaseDate.split("/")[0]) -
        parseInt(a.card.set.releaseDate.split("/")[0])
    );
  }

  return cards;
};
