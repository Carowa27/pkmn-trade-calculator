import { XLg } from "react-bootstrap-icons";

interface IBtnProps {
  btnText: string;
  clickFn: () => void;
}
interface IIconProps {
  icon: "X" | "";
  size: number;
  color: string;
  clickFn: () => void;
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
        padding: "0.25rem 1rem",
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
    <button style={{ background: "none", border: "none", color: color }}>
      {icon === "X" && <XLg size={size} onClick={clickFn} />}
    </button>
  );
};
