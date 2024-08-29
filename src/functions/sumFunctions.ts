import { IPkmnCard } from "@/app/dataFromApi";
import { ISavedCard } from "@/interfaces/interfaces";

export interface ICardSumProps {
  card?: IPkmnCard;
  trader?: "one" | "two";
  traderOne?: ISavedCard[];
  traderTwo?: ISavedCard[];
}

export const cardSum = ({
  card,
  trader,
  traderOne,
  traderTwo,
}: ICardSumProps) => {
  let sum = 0;
  let cardPrice = 0;
  if (trader !== undefined) {
    if (trader === "one" && traderOne) {
      traderOne.map((item: ISavedCard) => {
        let cardPrice = 0;
        if (item.card.tcgplayer !== undefined) {
          if (item.type === "1st") {
            cardPrice = item.card.tcgplayer.prices["1stEdition"]?.market || 0;
          } else {
            if (item.type === "1st Holo") {
              cardPrice =
                item.card.tcgplayer.prices["1stEditionHolofoil"]?.market || 0;
            } else {
              if (item.type === "1st Normal") {
                cardPrice =
                  item.card.tcgplayer.prices["1stEditionNormal"]?.market || 0;
              } else {
                if (item.type === "Holo") {
                  cardPrice = item.card.tcgplayer.prices.holofoil?.market || 0;
                } else {
                  if (item.type === "Normal") {
                    cardPrice = item.card.tcgplayer.prices.normal?.market || 0;
                  } else {
                    if (item.type === "rev Holo") {
                      cardPrice =
                        item.card.tcgplayer.prices.reverseHolofoil?.market || 0;
                    } else {
                      if (item.type === "Unlimit") {
                        cardPrice =
                          item.card.tcgplayer.prices.unlimited?.market || 0;
                      } else {
                        if (item.type === "Unlimit Holo") {
                          cardPrice =
                            item.card.tcgplayer.prices.unlimitedHolofoil
                              ?.market || 0;
                        } else {
                          cardPrice = 0;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        sum = sum + cardPrice;
      });
    } else {
      if (traderTwo) {
        traderTwo.map((item: ISavedCard) => {
          if (item.card.tcgplayer !== undefined) {
            if (item.type === "1st") {
              cardPrice = item.card.tcgplayer.prices["1stEdition"]?.market || 0;
            } else {
              if (item.type === "1st Holo") {
                cardPrice =
                  item.card.tcgplayer.prices["1stEditionHolofoil"]?.market || 0;
              } else {
                if (item.type === "1st Normal") {
                  cardPrice =
                    item.card.tcgplayer.prices["1stEditionNormal"]?.market || 0;
                } else {
                  if (item.type === "Holo") {
                    cardPrice =
                      item.card.tcgplayer.prices.holofoil?.market || 0;
                  } else {
                    if (item.type === "Normal") {
                      cardPrice =
                        item.card.tcgplayer.prices.normal?.market || 0;
                    } else {
                      if (item.type === "rev Holo") {
                        cardPrice =
                          item.card.tcgplayer.prices.reverseHolofoil?.market ||
                          0;
                      } else {
                        if (item.type === "Unlimit") {
                          cardPrice =
                            item.card.tcgplayer.prices.unlimited?.market || 0;
                        } else {
                          if (item.type === "Unlimit Holo") {
                            cardPrice =
                              item.card.tcgplayer.prices.unlimitedHolofoil
                                ?.market || 0;
                          } else {
                            cardPrice = 0;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          sum = sum + cardPrice;
        });
      }
    }
  } else {
    if (card !== undefined) {
      if (card.tcgplayer !== undefined) {
        if (card.tcgplayer.prices["1stEdition"]) {
          cardPrice = card.tcgplayer.prices["1stEdition"]?.market || 0;
        } else {
          if (card.tcgplayer.prices["1stEditionHolofoil"]) {
            cardPrice =
              card.tcgplayer.prices["1stEditionHolofoil"]?.market || 0;
          } else {
            if (card.tcgplayer.prices["1stEditionNormal"]) {
              cardPrice =
                card.tcgplayer.prices["1stEditionNormal"]?.market || 0;
            } else {
              if (card.tcgplayer.prices.holofoil) {
                cardPrice = card.tcgplayer.prices.holofoil?.market || 0;
              } else {
                if (card.tcgplayer.prices.normal) {
                  cardPrice = card.tcgplayer.prices.normal?.market || 0;
                } else {
                  if (card.tcgplayer.prices.reverseHolofoil) {
                    cardPrice =
                      card.tcgplayer.prices.reverseHolofoil?.market || 0;
                  } else {
                    if (card.tcgplayer.prices.unlimited) {
                      cardPrice = card.tcgplayer.prices.unlimited?.market || 0;
                    } else {
                      if (card.tcgplayer.prices.unlimitedHolofoil) {
                        cardPrice =
                          card.tcgplayer.prices.unlimitedHolofoil?.market || 0;
                      } else {
                        cardPrice = 0;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  sum = sum + cardPrice;

  return sum;
};
