import { IPkmnCard } from "@/app/dataFromApi";

interface pkmnCardProps {
  card: IPkmnCard;
  saveCard: (card: IPkmnCard) => void;
}

export const PkmnCard = ({ card, saveCard }: pkmnCardProps) => {
  return (
    <>
      <div
        style={{
          aspectRatio: "3/4",
          width: "12.5rem",
        }}
        onClick={() => saveCard(card)}
      >
        <img
          style={{ width: "100%", borderRadius: "10px" }}
          src={card.images.small}
          alt={card.name}
        />
      </div>
    </>
  );
};
