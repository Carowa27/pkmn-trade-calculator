import { IPkmnCard } from "@/interfaces/dataFromApi";
import { color } from "@/utils/color";

export const rarityCardColor = (card: IPkmnCard) => {
  const setName = card.set.name;
  const release = card.set.releaseDate;
  const rarity = card.rarity;
  const releaseDate = release.split("/");
  const releaseDateNr = releaseDate.map((d) => parseInt(d, 10 || 0));
  const year = releaseDateNr[0];
  const month = releaseDateNr[1];

  if (year > 2023) {
    if (rarity === "Hyper Rare") {
      return color.pkmnCardGold;
    } else {
      return color.pkmnCardGrey;
    }
  } else {
    if (year === 2023) {
      if (month >= 0o3) {
        if (rarity === "Hyper Rare") {
          return color.pkmnCardGold;
        } else {
          return color.pkmnCardGrey;
        }
      } else {
        if (setName === "Scarlet & Violet Black Star Promos") {
          return color.pkmnCardGrey;
        }
        return color.pkmnCardYellow;
      }
    } else {
      return color.pkmnCardYellow;
    }
  }
};
