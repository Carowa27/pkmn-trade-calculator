import { IPkmnCard } from "@/interfaces/dataFromApi";
import { windowSize } from "@/functions/windowSizes";
import { CardTypeButton, IconButton } from "./Buttons";
import { ISavedCard, ITraderCard } from "@/interfaces/interfaces";
import { cardSum } from "@/functions/sumFunctions";
import { color } from "@/utils/color";
import { rarityCardColor } from "@/functions/releaseYearFn";
import { useContext } from "react";
import { GlobalValueContext, useGlobalValue } from "./GlobalValueProvider";

interface IPkmnCardSearchProps {
  card: IPkmnCard;
  saveCard: ({ card, type }: ISavedCard) => void;
  cardWidth: string;
}
interface IPkmnCardTraderProps {
  card: IPkmnCard;
  removeCard: ({}: ITraderCard) => void;
  cardWidth: string;
  chosenType: string;
  id: number;
  trader: "one" | "two";
}
interface IPkmnCardProps {
  card: IPkmnCard;
  cardWidth: string;
}

export const PkmnCardSearch = ({
  card,
  saveCard,
  cardWidth,
}: IPkmnCardSearchProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <div
      style={{
        width: cardWidth,
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          aspectRatio: "3/4",
          width: cardWidth,
          overflow: "hidden",
          borderRadius: `${
            globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
              ? "5px"
              : "10px"
          }`,
          backgroundImage: ` url(${card.images.small})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "100% auto",
          display: "flex",
          alignItems: "end",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: color.typeBackground,
            borderTop: `${rarityCardColor(
              card.set.releaseDate,
              card.rarity
            )} 3px solid`,
            height: !card.tcgplayer?.prices ? "20%" : "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "0.5rem",
            padding: "0.4rem 0 0.5rem 0",
          }}
        >
          {card.tcgplayer && card.tcgplayer.prices ? (
            <>
              {card.tcgplayer?.prices["1stEdition"]?.market ? (
                <CardTypeButton type="1st" card={card} clickFn={saveCard} />
              ) : null}
              {card.tcgplayer?.prices["1stEditionHolofoil"] && (
                <CardTypeButton
                  type="1st Holo"
                  card={card}
                  clickFn={saveCard}
                />
              )}
              {card.tcgplayer?.prices["1stEditionNormal"] && (
                <CardTypeButton
                  type="1st Normal"
                  card={card}
                  clickFn={saveCard}
                />
              )}
              {card.tcgplayer?.prices.holofoil && (
                <CardTypeButton type="Holo" card={card} clickFn={saveCard} />
              )}
              {card.tcgplayer?.prices.normal && (
                <CardTypeButton type="Normal" card={card} clickFn={saveCard} />
              )}
              {card.tcgplayer?.prices.reverseHolofoil && (
                <CardTypeButton
                  type="rev Holo"
                  card={card}
                  clickFn={saveCard}
                />
              )}
              {card.tcgplayer?.prices.unlimited && (
                <CardTypeButton type="Unlimit" card={card} clickFn={saveCard} />
              )}
              {card.tcgplayer?.prices.unlimitedHolofoil && (
                <CardTypeButton
                  type="Unlimit Holo"
                  card={card}
                  clickFn={saveCard}
                />
              )}
            </>
          ) : (
            <h5
              style={{
                color: color.black,
              }}
            >
              No info found
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export const PkmnCardTrader = ({
  card,
  cardWidth,
  chosenType,
  id,
  removeCard,
  trader,
}: IPkmnCardTraderProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <div
      style={{
        width: cardWidth,
        aspectRatio: "1/1",
        backgroundColor: rarityCardColor(card.set.releaseDate, card.rarity),
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          aspectRatio: "4/3",
          width: cardWidth,
          overflow: "hidden",
          borderRadius: `${
            globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
              ? "5px"
              : "10px"
          }`,
          backgroundImage: ` url(${card.images.small})`,
          backgroundPosition: "top",
          backgroundSize: "100% auto",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {/* <div
          style={{
            padding: "0.15rem 0.1rem 0 0 ",
          }}
        >
          <IconButton
            icon={"X"}
            colorIcon={"black"}
            clickFn={() => removeCard({ id, trader })}
          />
        </div> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          paddingBottom: "0.2rem",
          margin: "0.3rem 0 0.2rem 0",
        }}
      >
        <p
          style={{
            padding: "0 0.2rem 0 0.7rem",
            width: "100%",
            color: color.black,
            fontWeight: "bold",
            fontSize: "smaller",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {chosenType}
          <IconButton
            icon={"X-mini"}
            colorIcon={"inherit"}
            clickFn={() => removeCard({ id, trader })}
          />
        </p>
        <p style={{ color: color.black, padding: "0.5rem 0.2rem 0 0.7rem" }}>
          {globalValue?.breakpoint !== "S" &&
            globalValue?.breakpoint !== "XS" &&
            "Value: "}
          {cardSum({ card, chosenType }) ? cardSum({ card, chosenType }) : "--"}
          $
        </p>
      </div>
    </div>
  );
};

export const PkmnCard = ({ card, cardWidth }: IPkmnCardProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            aspectRatio: "3/4",
            width: cardWidth,
            height: "auto",
            overflow: "hidden",
            borderRadius: `${
              globalValue?.breakpoint === "S" ||
              globalValue?.breakpoint === "XS"
                ? "5px"
                : "10px"
            }`,
            backgroundPosition: "top",
            backgroundSize: "100% auto",
          }}
          src={card.images.small}
        />
      </div>
    </>
  );
};
