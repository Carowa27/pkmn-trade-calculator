import { IPkmnCard } from "@/app/dataFromApi";
import { windowSize } from "@/functions/windowSizes";
import { CardTypeButton, IconButton } from "./Buttons";
import { IRemoveCard, ISavedCard } from "@/interfaces/interfaces";

interface IPkmnCardProps {
  card: IPkmnCard;
  saveCard: ({ card, type }: ISavedCard) => void;
  cardWidth: string;
}
interface IPkmnCardTraderProps {
  card: IPkmnCard;
  removeCard: ({}: IRemoveCard) => void;
  cardWidth: string;
  chosenType: string;
  id: number;
  trader: "one" | "two";
}

export const PkmnCardSearch = ({
  card,
  saveCard,
  cardWidth,
}: IPkmnCardProps) => {
  return (
    <div
      style={{
        width: cardWidth,
        backgroundColor: "#ffcb05",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          aspectRatio: "4/3",
          width: cardWidth,
          // maxHeight: "150px",
          overflow: "hidden",
          borderRadius: `${windowSize() === "S" ? "5px" : "10px"}`,
          backgroundImage: ` url(${card.images.small})`,
          backgroundPosition: "top",
          backgroundSize: "100% auto",
        }}
      ></div>
      <div
        style={{
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingBottom: "0.2rem",
          margin: "0.4rem 0 0.3rem 0",
        }}
      >
        {card.tcgplayer?.prices["1stEdition"] && (
          <CardTypeButton type="1st" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices["1stEditionHolofoil"] && (
          <CardTypeButton type="1st Holo" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices["1stEditionNormal"] && (
          <CardTypeButton type="1st Normal" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices.holofoil && (
          <CardTypeButton type="Holo" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices.normal && (
          <CardTypeButton type="Normal" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices.reverseHolofoil && (
          <CardTypeButton type="rev Holo" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices.unlimited && (
          <CardTypeButton type="Unlimit" card={card} clickFn={saveCard} />
        )}
        {card.tcgplayer?.prices.unlimitedHolofoil && (
          <CardTypeButton type="Unlimit Holo" card={card} clickFn={saveCard} />
        )}
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
  return (
    <div
      style={{
        width: cardWidth,
        aspectRatio: "1/1",
        backgroundColor: "#ffcb05",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          aspectRatio: "4/3",
          width: cardWidth,
          // maxHeight: "150px",
          overflow: "hidden",
          borderRadius: `${windowSize() === "S" ? "5px" : "10px"}`,
          backgroundImage: ` url(${card.images.small})`,
          backgroundPosition: "top",
          backgroundSize: "100% auto",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingBottom: "0.2rem",
          margin: "0.3rem 0 0.2rem 0",
        }}
      >
        <CardTypeButton type={chosenType} card={card} />
        <IconButton
          icon={"X"}
          size={25}
          color={"inherit"}
          clickFn={() => removeCard({ id, trader })}
        />
      </div>
    </div>
  );
};
