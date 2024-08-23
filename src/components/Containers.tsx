import { ScrSize } from "@/functions/windowSizes";
import { ReactNode } from "react";

interface ITradersMat {
  children: ReactNode;
  trader: string;
  sumTraderOne: () => void;
  sumTraderTwo: () => void;
  windowSize: () => ScrSize | undefined;
}

export const TradersMat = ({
  children,
  trader,
  sumTraderOne,
  sumTraderTwo,
  windowSize,
}: ITradersMat) => {
  const traderOne = sumTraderOne() > sumTraderTwo();
  const traderTwo = sumTraderOne() < sumTraderTwo();
  return (
    <div
      style={{
        border: `2px solid ${
          sumTraderOne() === sumTraderTwo()
            ? "darkgreen"
            : `${trader === "one" ? traderOne : traderTwo}`
            ? "darkorange"
            : "darkred"
        }`,
        borderRadius: "10px",
        width: `${windowSize() === "S" ? "90vw" : "45vw"}`,
        height: `${windowSize() === "S" ? "36vh" : "100%"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
