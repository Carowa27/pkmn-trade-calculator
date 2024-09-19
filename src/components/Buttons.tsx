import { IPkmnCard } from "@/interfaces/dataFromApi";
import { color } from "@/utils/color";
import {
  X,
  Search,
  CurrencyDollar,
  Calendar3,
  Trash3Fill,
  SortAlphaDown,
  XLg,
  ArrowLeft,
} from "react-bootstrap-icons";

interface IBtnProps {
  btnText: string;
  clickFn: () => void;
  filled?: boolean;
}
interface IIconProps {
  icon:
    | "X"
    | "X-mini"
    | "<"
    | "trash"
    | "search"
    | "sortName"
    | "sortValue"
    | "sortRelease";
  colorIcon: string;
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

export const PrimaryButton = ({ btnText, clickFn, filled }: IBtnProps) => {
  return (
    <button
      style={{
        background: `${
          filled ? color.buttonBackground : color.buttonBackground
        }`,
        color: "inherit",
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

export const IconButton = ({ icon, clickFn, colorIcon }: IIconProps) => {
  //always size 25
  return (
    <button
      style={{
        aspectRatio: "1/1",
        height: icon === "X-mini" ? "auto" : "2.5rem",
        background: "none",
        border: "none",
        borderRadius: "10px",
        color: colorIcon,
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
        {icon === "X" && <XLg size={25} />}
        {icon === "X-mini" && <X size={20} />}
        {icon === "<" && <ArrowLeft size={25} />}
        {icon === "search" && <Search size={25} />}
        {icon === "trash" && <Trash3Fill size={25} />}
        {icon === "sortName" && <SortAlphaDown size={25} />}
        {icon === "sortValue" && <CurrencyDollar size={25} />}
        {icon === "sortRelease" && <Calendar3 size={25} />}
      </div>
    </button>
  );
};

export const CardTypeButton = ({ card, type, clickFn }: ICardTypeProps) => {
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
        background: backgroundColor(),
        height: "2rem",
        width: "max-content",
        display: "flex",
        alignItems: "center",
        alignSelf: "end",
        justifyContent: "center",
        border: color.buttonBorder,
        borderRadius: "10px",
        padding: "0.2rem 0.5rem",
        margin: "1px",
        color: color.black,
        cursor: "pointer",
      }}
      onClick={() => clickFn !== undefined && clickFn({ card, type })}
    >
      {type}
    </button>
  );
};
