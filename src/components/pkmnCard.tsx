import { IPkmnCard } from "@/app/dataFromApi";

interface pkmnCardProps {
  card: IPkmnCard;
}

export const PkmnCard = ({ card }: pkmnCardProps) => {
  return (
    <>
      <div
        style={{
          aspectRatio: "3/4",
          width: "12.5rem", //isDesktop ? "12.5rem" : "10rem",
        }}
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
