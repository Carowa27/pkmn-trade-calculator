import { color } from "@/utils/color";

export const releaseYearCardColor = (release: string) => {
  const releaseDate = release.split("/");
  const releaseDateNr = releaseDate.map((d) => parseInt(d, 10 || 0));
  const year = releaseDateNr[0];
  const month = releaseDateNr[1];
  if (year >= 2023) {
    if (month >= 0o3) {
      return color.pkmnCardGrey;
    } else {
      return color.pkmnCardYellow;
    }
  } else {
    return color.pkmnCardYellow;
  }
};
export const rarityCardColor = (release: string, rarity: string) => {
  const releaseDate = release.split("/");
  const releaseDateNr = releaseDate.map((d) => parseInt(d, 10 || 0));
  const year = releaseDateNr[0];
  const month = releaseDateNr[1];

  if (year > 2023) {
    console.log("higher than 2023", year);
    if (rarity === "Hyper Rare") {
      console.log("rare");
      return color.pkmnCardGold;
    } else {
      console.log("grey");
      return color.pkmnCardGrey;
    }
  } else {
    if (year == 2023) {
      if (month >= 0o3) {
        if (rarity === "Hyper Rare") {
          console.log("rare");
          return color.pkmnCardGold;
        } else {
          console.log(year);
          return color.pkmnCardGrey;
        }
      } else {
        console.log(year);
        return color.pkmnCardYellow;
      }
    } else {
      console.log(year);
      return color.pkmnCardYellow;
    }
  }
};
