import { color } from "@/utils/color";

export const rarityCardColor = (release: string, rarity: string) => {
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
        return color.pkmnCardYellow;
      }
    } else {
      if (release === "2022/11/01") {
        return color.pkmnCardGrey;
      } else {
        return color.pkmnCardYellow;
      }
    }
  }
};
