import { IPkmnCard } from "@/interfaces/dataFromApi";
import { color } from "@/utils/color";
import {
  X,
  ArrowLeftShort,
  Search,
  CurrencyDollar,
  Calendar3,
  Trash3Fill,
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
  const backgroundColor = () => {
    let typeColor = "";
    if (type === "1st") {
      typeColor = color.typeFirst;
    } else {
      if (type === "1st Holo") {
        typeColor = color.typeFirstHolo;
      } else {
        if (type === "1st Normal") {
          typeColor = color.typeFirstNormal;
        } else {
          if (type === "Holo") {
            typeColor = color.typeHolo;
          } else {
            if (type === "Normal") {
              typeColor = color.typeNormal;
            } else {
              if (type === "rev Holo") {
                typeColor = color.typeRevHolo;
              } else {
                if (type === "Unlimit") {
                  typeColor = color.typeUnlimit;
                } else {
                  if (type === "Unlimit Holo") {
                    typeColor = color.typeUnlimitHolo;
                  } else {
                    typeColor = "";
                  }
                }
              }
            }
          }
        }
      }
    }
    return typeColor;
  };
  return (
    <button
      style={{
        background: backgroundColor(), //`${filled ? color.buttonBackground : "none"}`,
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
        cursor: "pointer",
      }}
      onClick={() => clickFn !== undefined && clickFn({ card, type })}
    >
      {type}
    </button>
  );
};
