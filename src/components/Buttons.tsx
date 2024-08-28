import { XLg } from "react-bootstrap-icons";

interface IBtnProps {
  btnText: string;
  clickFn: () => void;
}
interface IIconProps {
  icon: string;
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
        padding: "0.25rem 1rem",
        border: "lightgrey solid 1px",
        cursor: "pointer",
      }}
      onClick={clickFn}
    >
      {btnText}
    </button>
  );
};

export const IconButton = ({ icon, clickFn }: IIconProps) => {
  return (
    <button style={{ background: "none", border: "none", color: "black" }}>
      {icon === "X" && <XLg onClick={clickFn} />}
    </button>
  );
};
