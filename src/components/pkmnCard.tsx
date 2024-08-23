import { IPkmnCard } from "@/app/dataFromApi";
import { windowSize } from "@/functions/windowSizes";

interface pkmnCardProps {
  card: IPkmnCard;
  saveCard?: (card: IPkmnCard) => void;
  cardWidth: string;
}

export const PkmnCard = ({ card, saveCard, cardWidth }: pkmnCardProps) => {
  return (
    <>
      <div
        style={{
          aspectRatio: "3/4",
          width: cardWidth,
        }}
        onClick={() => {
          saveCard !== undefined && saveCard(card);
        }}
      >
        <img
          style={{
            width: "100%",
            borderRadius: `${windowSize() === "S" ? "5px" : "10px"}`,
          }}
          src={card.images.small}
          alt={card.name}
        />
      </div>
    </>
  );
};
