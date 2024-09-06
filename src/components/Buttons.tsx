import { IPkmnCard } from "@/app/dataFromApi";
import { color } from "@/utils/color";
import {
  X,
  ArrowLeftShort,
  Search,
  CurrencyDollar,
  Calendar3,
  Trash3Fill,
  Trash3,
} from "react-bootstrap-icons";

interface IBtnProps {
  btnText: string;
  clickFn: () => void;
  filled?: boolean;
}
interface IIconProps {
  icon:
    | "X"
    | "<"
    | "trash"
    | "search"
    | "sortName"
    | "sortValue"
    | "sortRelease";
  size: number;
  colorIcon: string;
  clickFn: () => void;
  filled?: boolean;
}
interface ISavedCardProps {
  card: IPkmnCard;
  type: string;
}
interface ICardTypeProps {
  card: IPkmnCard;
  type: string;
  clickFn?: ({}: ISavedCardProps) => void;
  filled?: boolean;
}
export const PrimaryButton = ({ btnText, clickFn, filled }: IBtnProps) => {
  return (
    <button
      style={{
        background: `${filled ? color.buttonBackground : "none"}`,
        color: color.white,
        fontWeight: "bold",
        fontSize: "large",
        width: "max-content",
        padding: "0.5rem 1rem",
        border: color.buttonBorder,
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
  console.log(
    icon,
    filled
      ? color.buttonBorder
      : icon === "X" || icon === "<"
      ? color.buttonBorder
      : colorIcon
  );
  return (
    <button
      style={{
        aspectRatio: "1/1",
        height: "2.5rem",
        background: `${filled ? color.buttonBackground : "none"}`,
        border: `${
          filled || icon === "X" || icon === "<"
            ? color.buttonBorder
            : icon === "search"
            ? "none"
            : `${colorIcon} 1px solid`
        }`,
        borderRadius: "10px",
        color: `${filled ? color.black : colorIcon}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={clickFn}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        {icon === "X" && <X size={size} />}
        {icon === "<" && <ArrowLeftShort size={size} />}
        {icon === "search" && <Search size={size} />}
        {icon === "trash" && <Trash3Fill size={size} />}
        {icon === "sortName" && <h4 style={{ fontSize: 20 }}>A</h4>}
        {icon === "sortValue" && <CurrencyDollar size={size} />}
        {icon === "sortRelease" && <Calendar3 size={size} />}{" "}
      </div>
    </button>
  );
};

export const CardTypeButton = ({
  card,
  type,
  clickFn,
  filled,
}: ICardTypeProps) => {
  return (
    <button
      style={{
        background: `${filled ? color.buttonBackground : "none"}`,
        height: "2rem",
        width: "max-content",
        display: "flex",
        alignItems: "center",
        alignSelf: "end",
        justifyContent: "center",
        border: color.buttonBorder,
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
