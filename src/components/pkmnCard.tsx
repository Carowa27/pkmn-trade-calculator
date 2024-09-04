import { IPkmnCard } from "@/app/dataFromApi";
import { windowSize } from "@/functions/windowSizes";
import { CardTypeButton, IconButton } from "./Buttons";
import { IRemoveCard, ISavedCard, ITraderCard } from "@/interfaces/interfaces";
import { cardSum } from "@/functions/sumFunctions";
import { color } from "@/utils/color";

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
          colorIcon={"inherit"}
          clickFn={() => removeCard({ id, trader })}
          filled
        />
        <p style={{ color: color.black, paddingTop: "0.5rem" }}>
          Value:{" "}
          {cardSum({ card, chosenType }) ? cardSum({ card, chosenType }) : "--"}
          $
        </p>
      </div>
    </div>
  );
};

export const PkmnCard = ({ card, cardWidth }: IPkmnCardProps) => {
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
            borderRadius: `${windowSize() === "S" ? "5px" : "10px"}`,
            backgroundPosition: "top",
            backgroundSize: "100% auto",
          }}
          src={card.images.small}
        />
      </div>
    </>
  );
};
