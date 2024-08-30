import { ScrSize, windowSize } from "@/functions/windowSizes";
import { PrimaryButton } from "./Buttons";
import { PkmnCardTrader, PkmnCardSearch } from "./pkmnCard";
import { IPkmnCard } from "@/app/dataFromApi";
import { IRemoveCard, ISavedCard, ITraderCard } from "@/interfaces/interfaces";
import { ICardSumProps } from "@/functions/sumFunctions";

interface IHeaderProps {
  clearAllCards: () => void;
}
interface ITradersMatProps {
  trader: "one" | "two";
  sumTraderOne: number;
  sumTraderTwo: number;
  windowSize: () => ScrSize | undefined;
  btnFn: () => void;
  cards: ISavedCard[];
  clearCards: () => void;
  removeCard: ({}: ITraderCard) => void;
}
export const Header = ({ clearAllCards }: IHeaderProps) => {
  return (
    <header
      style={{
        height: "5vh",
        margin: "1rem",
        marginRight: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>MonTrader Calculator</h1>
      {windowSize() !== "S" && (
        <PrimaryButton btnText="Clear all cards" clickFn={clearAllCards} />
      )}
    </header>
  );
};
export const TradersMat = ({
  trader,
  sumTraderOne,
  sumTraderTwo,
  windowSize,
  btnFn,
  cards,
  clearCards,
  removeCard,
}: ITradersMatProps) => {
  return (
    <div
      style={{
        backgroundColor: "#8AA39988",
        borderRadius: "10px",
        width: `${windowSize() === "S" ? "90vw" : "45vw"}`,
        height: `${windowSize() === "S" ? "36vh" : "100%"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "2rem",
          margin: "1rem",
          paddingRight: "1.5rem",
          paddingLeft: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PrimaryButton btnText="Search" clickFn={btnFn} />
        <p>
          Sum:{" "}
          {trader === "one"
            ? (Math.round(sumTraderOne * 100) / 100).toFixed(2)
            : (Math.round(sumTraderTwo * 100) / 100).toFixed(2)}
          $
        </p>
      </div>
      <div
        style={{
          width: "95%",
          maxHeight: "85%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "start",
          gap: "1rem",
          overflow: "hidden visible",
          paddingRight: "0.5rem",
          paddingTop: "1rem",
        }}
      >
        {cards?.map((item, i) => {
          return (
            <PkmnCardTrader
              card={item.card}
              cardWidth={`${windowSize() === "S" ? "6rem" : "8rem"}`}
              key={item.card.id + "-" + i}
              chosenType={item.type}
              removeCard={removeCard}
              id={i}
              trader={trader}
            />
          );
        })}
      </div>
      <div style={{ marginTop: "auto" }}>
        <PrimaryButton btnText="Clear traders cards" clickFn={clearCards} />
      </div>
    </div>
  );
};
