import { ScrSize, useWindowSize, windowSize } from "@/functions/windowSizes";
import { IconButton, PrimaryButton } from "./Buttons";
import { PkmnCardTrader } from "./PkmnCard";
import { ISavedCard, ITraderCard } from "@/interfaces/interfaces";
import { color } from "@/utils/color";
import { useContext, useState } from "react";
import { sortCards } from "@/functions/sortFunctions";
import { GlobalValueContext, useGlobalValue } from "./GlobalValueProvider";

interface IHeaderProps {
  clearAllCards: () => void;
}
interface ITradersMatProps {
  trader: "one" | "two";
  sumTraderOne: number;
  sumTraderTwo: number;
  btnFn: () => void;
  cards: ISavedCard[];
  clearCards: () => void;
  removeCard: ({}: ITraderCard) => void;
}
export const Header = ({ clearAllCards }: IHeaderProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <header
      style={{
        height: "3vh",
        margin: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
            ? "0.5rem 0rem"
            : "1rem 2rem 1rem 2rem"
        }`,
        display: "flex",
        alignItems: "center",
        justifyContent: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
            ? "center"
            : "space-between"
        }`,
      }}
    >
      <h2>
        Mad&apos;s Trade Calculator
        <span
          style={{
            marginLeft: "1rem",
            fontSize: "14px",
            color: "#8D858C",
            fontWeight: "lighter",
          }}
        >
          V 0.1.0
        </span>
      </h2>

      {globalValue?.breakpoint !== "S" && globalValue?.breakpoint !== "XS" && (
        <div>
          <PrimaryButton btnText="Clear all cards" clickFn={clearAllCards} />
        </div>
      )}
    </header>
  );
};
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
        backgroundColor: "#8AA39988",
        borderRadius: "10px",
        width: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
            ? "90vw"
            : "45vw"
        }`,
        height: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
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
        <IconButton
          icon={"search"}
          size={25}
          colorIcon={color.white}
          clickFn={btnFn}
          filled={false}
        />
        <p>
          Sum:{" "}
          {trader === "one"
            ? (Math.round(sumTraderOne * 100) / 100).toFixed(2)
            : (Math.round(sumTraderTwo * 100) / 100).toFixed(2)}
          $
        </p>
        {(globalValue?.breakpoint === "S" ||
          globalValue?.breakpoint === "XS") && (
          <IconButton
            icon={"trash"}
            size={25}
            colorIcon={color.white}
            clickFn={clearCards}
            filled={false}
          />
        )}
      </div>
      {globalValue?.breakpoint !== "S" && globalValue?.breakpoint !== "XS" && (
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
                size={20}
                colorIcon={`${
                  sortBy === "valueHighLow" || sortBy === "valueLowHigh"
                    ? color.white
                    : color.false
                }`}
                clickFn={() => {
                  if (sortBy === "valueHighLow") {
                    changeSortBy("valueLowHigh");
                  } else {
                    changeSortBy("valueHighLow");
                  }
                }}
                filled={false}
              />
              <IconButton
                icon={"sortName"}
                size={20}
                colorIcon={`${
                  sortBy === "nameAZ" || sortBy === "nameZA"
                    ? color.white
                    : color.false
                }`}
                clickFn={() => {
                  if (sortBy === "nameAZ") {
                    changeSortBy("nameZA");
                  } else {
                    changeSortBy("nameAZ");
                  }
                }}
                filled={false}
              />
              <IconButton
                icon={"sortRelease"}
                size={18}
                colorIcon={`${
                  sortBy === "releaseOldNew" || sortBy === "releaseNewOld"
                    ? color.white
                    : color.false
                }`}
                clickFn={() => {
                  if (sortBy === "releaseOldNew") {
                    changeSortBy("releaseNewOld");
                  } else {
                    changeSortBy("releaseOldNew");
                  }
                }}
                filled={false}
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
            globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
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
            globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
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
                globalValue?.breakpoint === "S" ||
                globalValue?.breakpoint === "XS"
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
    </div>
  );
};
