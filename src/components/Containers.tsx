import { ScrSize } from "@/functions/windowSizes";
import { PrimaryButton } from "./Buttons";
import { PkmnCard } from "./pkmnCard";
import { IPkmnCard } from "@/app/dataFromApi";

interface ITradersMat {
  trader: "one" | "two";
  sumTraderOne: () => number;
  sumTraderTwo: () => number;
  windowSize: () => ScrSize | undefined;
  btnFn: () => void;
  cards: IPkmnCard[];
  clearCards: () => void;
}

export const TradersMat = ({
  trader,
  sumTraderOne,
  sumTraderTwo,
  windowSize,
  btnFn,
  cards,
  clearCards,
}: ITradersMat) => {
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
        // justifyContent: "space-between",
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
          Sum:
          {trader === "one"
            ? (Math.round(sumTraderOne() * 100) / 100).toFixed(2)
            : (Math.round(sumTraderTwo() * 100) / 100).toFixed(2)}
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
        {cards?.map((card, i) => {
          return (
            <PkmnCard
              card={card}
              cardWidth={`${windowSize() === "S" ? "6rem" : "8rem"}`}
              key={card.id + "-" + i}
            />
          );
        })}
      </div>
      <div style={{ marginTop: "auto" }}>
        <PrimaryButton btnText="Clear all cards" clickFn={clearCards} />
      </div>
    </div>
  );
};
