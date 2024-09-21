import { IPkmnCard } from "@/interfaces/dataFromApi";
import { CardTypeButton, IconButton } from "./Buttons";
import { Currency, ISavedCard, ITraderCard } from "@/interfaces/interfaces";
import { cardSum } from "@/functions/sumFunctions";
import { color } from "@/utils/color";
import { rarityCardColor } from "@/functions/releaseYearFn";
import { useGlobalValue } from "./GlobalValueProvider";

interface IPkmnCardSearchProps {
  searchMethod: "byInput" | "notChosen" | "bySet";
  card: IPkmnCard;
  saveCard: ({ card, type }: ISavedCard) => void;
  cardWidth: string;
  id: string;
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
  searchMethod,
  card,
  saveCard,
  cardWidth,
  id,
}: IPkmnCardSearchProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <div
      id={id}
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
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "5px"
              : "10px"
          }`,
          backgroundImage: ` url(${card.images.small})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "100% auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          // alignItems: "end",
        }}
      >
        {searchMethod === "byInput" && (
          <div
            style={{
              width: "20%",
              margin: "0 1rem 0.2rem 0",
              alignSelf: "end",
            }}
          >
            <img
              src={card.set.images.symbol}
              alt={`${card.set.name} logo`}
              style={{ width: "100%" }}
            />
          </div>
        )}
        <div
          style={{
            width: "100%",
            backgroundColor: rarityCardColor(card),
            borderTop: `${rarityCardColor(card)} 3px solid`,
            height: !card.tcgplayer?.prices ? "20%" : "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
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
        backgroundColor: rarityCardColor(card),
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          aspectRatio: "4/3",
          width: cardWidth,
          overflow: "hidden",
          borderRadius: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "5px"
              : "10px"
          }`,
          backgroundImage: ` url(${card.images.small})`,
          backgroundPosition: "top",
          backgroundSize: "100% auto",
          display: "flex",
          justifyContent: "end",
        }}
      ></div>
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
            height:
              chosenType === "Unlimit Holo" &&
              (globalValue?.screen.breakpoint === "S" ||
                globalValue?.screen.breakpoint === "XS")
                ? ""
                : "32px",
          }}
        >
          {chosenType}
          <IconButton
            icon={"X-mini"}
            colorIcon={"inherit"}
            clickFn={() => removeCard({ id, trader })}
          />
        </p>
        <p
          style={{
            color: color.black,
            padding:
              globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "XS" ||
              globalValue?.screen.breakpoint === "M"
                ? "0.2rem 0rem 0 0"
                : "0.5rem 0rem 0 0",
            textAlign:
              globalValue?.screen.breakpoint === "XS" ||
              globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "M"
                ? "center"
                : "left",
            alignSelf: "center",
          }}
        >
          {globalValue?.screen.breakpoint !== "S" &&
            globalValue?.screen.breakpoint !== "XS" &&
            "Value: "}
          {cardSum({ card, chosenType })
            ? globalValue?.exchange.currency === Currency.USD
              ? (Math.round(cardSum({ card, chosenType }) * 100) / 100).toFixed(
                  2
                )
              : (
                  Math.round(
                    cardSum({ card, chosenType }) *
                      globalValue?.exchange.rate! *
                      100
                  ) / 100
                ).toFixed(2)
            : "--"}

          {globalValue?.exchange.currency === "USD" && "$"}
          {globalValue?.exchange.currency === "EUR" && "€"}
          {globalValue?.exchange.currency === "NOK" && "kr"}
          {globalValue?.exchange.currency === "SEK" && "kr"}
          {globalValue?.exchange.currency === "GBP" && "£"}
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
              globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "XS"
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
