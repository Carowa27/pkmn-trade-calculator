import { IPkmnCard } from "@/app/dataFromApi";
import { color } from "@/utils/color";
import {
  XCircleFill,
  ArrowLeftCircleFill,
  X,
  ArrowLeft,
  ArrowLeftShort,
  Search,
} from "react-bootstrap-icons";

interface IBtnProps {
  btnText: string;
  clickFn: () => void;
}
interface IIconProps {
  icon: "X" | "<" | "search";
  size: number;
  colorIcon: string;
  clickFn: () => void;
  filled: boolean;
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
        color: color.white,
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

export const IconButton = ({
  icon,
  clickFn,
  size,
  colorIcon,
  filled,
}: IIconProps) => {
  return (
    <button
      style={{
        background: `${filled ? "lightgrey" : "none"}`,
        border: `${filled ? "2px solid grey" : "none"}`,
        height: "2rem",
        width: "2rem",
        borderRadius: "10px",
        color: `${filled ? color.black : colorIcon}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon === "X" && <X size={size} onClick={clickFn} />}
      {icon === "<" && <ArrowLeftShort size={size} onClick={clickFn} />}
      {icon === "search" && <Search size={size} onClick={clickFn} />}
    </button>
  );
};

export const CardTypeButton = ({ card, type, clickFn }: ICardTypeProps) => {
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
        color: color.black,
      }}
      onClick={() => clickFn !== undefined && clickFn({ card, type })}
    >
      {type}
    </button>
  );
};
