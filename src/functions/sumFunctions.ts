import { IPkmnCard } from "@/app/dataFromApi";
import { ISavedCard } from "@/interfaces/interfaces";

export interface ICardSumProps {
  card?: IPkmnCard;
  chosenType?: string;
  trader?: "one" | "two";
  traderOne?: ISavedCard[];
  traderTwo?: ISavedCard[];
}

export const cardSum = ({
  card,
  chosenType,
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
        if (chosenType !== undefined) {
          if (chosenType === "1st") {
            cardPrice = card.tcgplayer.prices["1stEdition"]?.market || 0;
          } else {
            if (chosenType === "1st Holo") {
              cardPrice =
                card.tcgplayer.prices["1stEditionHolofoil"]?.market || 0;
            } else {
              if (chosenType === "1st Normal") {
                cardPrice =
                  card.tcgplayer.prices["1stEditionNormal"]?.market || 0;
              } else {
                if (chosenType === "Holo") {
                  cardPrice = card.tcgplayer.prices.holofoil?.market || 0;
                } else {
                  if (chosenType === "Normal") {
                    cardPrice = card.tcgplayer.prices.normal?.market || 0;
                  } else {
                    if (chosenType === "rev Holo") {
                      cardPrice =
                        card.tcgplayer.prices.reverseHolofoil?.market || 0;
                    } else {
                      if (chosenType === "Unlimit") {
                        cardPrice =
                          card.tcgplayer.prices.unlimited?.market || 0;
                      } else {
                        if (chosenType === "Unlimit Holo") {
                          cardPrice =
                            card.tcgplayer.prices.unlimitedHolofoil?.market ||
                            0;
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
        sum = cardPrice;
      }
    }
  }

  return sum;
};
