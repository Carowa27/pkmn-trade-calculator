import { IPkmnCard } from "@/app/dataFromApi";
import { XCircleFill, ArrowLeftCircleFill } from "react-bootstrap-icons";

interface IBtnProps {
  btnText: string;
  clickFn: () => void;
}
interface IIconProps {
  icon: "X" | "<";
  size: number;
  color: string;
  clickFn: () => void;
}
interface ISavedCardProps {
  card: IPkmnCard;
  type: string;
}
interface ICardTypeProps {
  card: IPkmnCard;
  type: string;
  clickFn?: ({}: ISavedCardProps) => void;
}
export const PrimaryButton = ({ btnText, clickFn }: IBtnProps) => {
  return (
    <button
      style={{
        background: "grey",
        color: "white",
        fontWeight: "bold",
        fontSize: "large",
        width: "max-content",
        padding: "0.5rem 1rem",
        border: "lightgrey solid 1px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={clickFn}
    >
      {btnText}
    </button>
  );
};

export const IconButton = ({ icon, clickFn, size, color }: IIconProps) => {
  return (
    <button
      style={{
        background: "grey",
        border: "none",
        borderRadius: "50%",
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon === "X" && <XCircleFill size={size} onClick={clickFn} />}
      {icon === "<" && <ArrowLeftCircleFill size={size} onClick={clickFn} />}
    </button>
  );
};

export const CardTypeButton = ({ card, type, clickFn }: ICardTypeProps) => {
  console.log(card.name, type);
  return (
    <button
      style={{
        background: "lightgrey",
        height: "2rem",
        width: "max-content",
        display: "flex",
        alignItems: "center",
        alignSelf: "end",
        justifyContent: "center",
        border: "2px solid grey",
        borderRadius: "10px",
        padding: "0.2rem 0.5rem",
        color: "black",
      }}
      onClick={() => clickFn !== undefined && clickFn({ card, type })}
    >
      {type}
    </button>
  );
};
