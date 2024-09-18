import { IconButton, PrimaryButton } from "./Buttons";
import { PkmnCardTrader } from "./PkmnCard";
import { ISavedCard, ITraderCard } from "@/interfaces/interfaces";
import { color } from "@/utils/color";
import { useState } from "react";
import { sortCards } from "@/functions/sortFunctions";
import { useGlobalValue } from "./GlobalValueProvider";
import pokeBall from "../../public/pokeBallBackground.webp";

interface ITradersMatProps {
  trader: "one" | "two";
  sumTraderOne: number;
  sumTraderTwo: number;
  btnFn: () => void;
  cards: ISavedCard[];
  clearCards: () => void;
  removeCard: ({}: ITraderCard) => void;
}

export const TradersMat = ({
  trader,
  sumTraderOne,
  sumTraderTwo,
  btnFn,
  cards,
  clearCards,
  removeCard,
}: ITradersMatProps) => {
  const { globalValue } = useGlobalValue();
  const [sortBy, setSortBy] = useState<
    | "valueHighLow"
    | "valueLowHigh"
    | "nameAZ"
    | "nameZA"
    | "releaseOldNew"
    | "releaseNewOld"
  >();
  const changeSortBy = (
    param:
      | "valueHighLow"
      | "valueLowHigh"
      | "nameAZ"
      | "nameZA"
      | "releaseOldNew"
      | "releaseNewOld"
  ) => {
    setSortBy(param);
    sortCards({ cards, sortBy: param });
  };

  return (
    <div
      style={{
        backgroundColor: `${color.black}88`,
        backgroundImage: `url(${pokeBall.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        width: `${
          globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS"
            ? "90vw"
            : "45vw"
        }`,
        height: `${
          globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS"
            ? globalValue?.screen.height &&
              globalValue?.screen.height / 2 - 60 + "px"
            : globalValue?.screen.height &&
              globalValue?.screen.height - 80 + "px"
        }`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "2rem",
          margin: "1rem 1rem 0.7rem 1rem",
          paddingRight: "1.5rem",
          paddingLeft: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton icon={"search"} colorIcon={color.white} clickFn={btnFn} />
        <p>
          Sum:{" "}
          {trader === "one"
            ? (Math.round(sumTraderOne * 100) / 100).toFixed(2)
            : (Math.round(sumTraderTwo * 100) / 100).toFixed(2)}
          {globalValue?.currency === "USD" && "$"}
          {globalValue?.currency === "EUR" && "€"}
          {globalValue?.currency === "NOK" && "kr"}
          {globalValue?.currency === "SEK" && "kr"}
          {globalValue?.currency === "GBP" && "£"}
        </p>
        {(globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS") && (
          <IconButton
            icon={"trash"}
            colorIcon={color.white}
            clickFn={clearCards}
          />
        )}
      </div>
      {globalValue?.screen.breakpoint !== "S" &&
        globalValue?.screen.breakpoint !== "XS" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1.5rem",
              marginBottom: "0.5rem",
              gap: "1.5rem",
            }}
          >
            {cards.length !== 0 && cards !== undefined && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: 20,
                    display: "flex",
                    alignSelf: "center",
                    justifySelf: "center",
                    paddingBottom: "0.4rem",
                  }}
                >
                  Sort
                </p>
                <IconButton
                  icon={"sortValue"}
                  colorIcon={`${
                    sortBy === "valueHighLow" || sortBy === "valueLowHigh"
                      ? color.white
                      : color.sortNotUsed
                  }`}
                  clickFn={() => {
                    if (sortBy === "valueHighLow") {
                      changeSortBy("valueLowHigh");
                    } else {
                      changeSortBy("valueHighLow");
                    }
                  }}
                />
                <IconButton
                  icon={"sortName"}
                  colorIcon={`${
                    sortBy === "nameAZ" || sortBy === "nameZA"
                      ? color.white
                      : color.sortNotUsed
                  }`}
                  clickFn={() => {
                    if (sortBy === "nameAZ") {
                      changeSortBy("nameZA");
                    } else {
                      changeSortBy("nameAZ");
                    }
                  }}
                />
                <IconButton
                  icon={"sortRelease"}
                  colorIcon={`${
                    sortBy === "releaseOldNew" || sortBy === "releaseNewOld"
                      ? color.white
                      : color.sortNotUsed
                  }`}
                  clickFn={() => {
                    if (sortBy === "releaseOldNew") {
                      changeSortBy("releaseNewOld");
                    } else {
                      changeSortBy("releaseOldNew");
                    }
                  }}
                />
              </div>
            )}
            {cards.length !== 0 && (
              <>
                <PrimaryButton btnText="Clear cards" clickFn={clearCards} />
              </>
            )}
          </div>
        )}
      <div
        style={{
          width: "95%",
          maxHeight: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "67%"
              : "85%"
          }`,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "start",
          gap: "1rem",
          overflow: "hidden visible",
          paddingRight: "0.5rem",
          paddingTop: "0.5rem",
          marginTop: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "0"
              : "0.5rem"
          }`,
        }}
      >
        {cards?.map((item, i) => {
          return (
            <PkmnCardTrader
              card={item.card}
              cardWidth={`${
                globalValue?.screen.breakpoint === "S" ||
                globalValue?.screen.breakpoint === "XS"
                  ? "6rem"
                  : "8rem"
              }`}
              key={item.card.id + "-" + i}
              chosenType={item.type}
              removeCard={removeCard}
              id={i}
              trader={trader}
            />
          );
        })}
      </div>
      <div
        style={{
          marginTop: "auto",
          marginBottom: "0.5rem",
          paddingTop: "0.5rem",
        }}
      >
        <h1 style={{ color: `${color.primaryText}80` }}>Trader {trader}</h1>
      </div>
    </div>
  );
};
