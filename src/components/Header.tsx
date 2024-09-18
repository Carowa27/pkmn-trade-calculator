import { PrimaryButton } from "./Buttons";
import { useGlobalValue } from "./GlobalValueProvider";

interface IHeaderProps {
  clearAllCards: () => void;
}

export const Header = ({ clearAllCards }: IHeaderProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <header
      style={{
        height: "3vh",
        margin: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
            ? "0.5rem 0rem"
            : "1rem 2rem 1rem 2rem"
        }`,
        display: "flex",
        alignItems: "center",
        justifyContent: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
            ? "center"
            : "space-between"
        }`,
      }}
    >
      <h2>
        Mad&apos;s Trade Calculator
        <span
          style={{
            marginLeft: "1rem",
            fontSize: "14px",
            color: "#8D858C",
            fontWeight: "lighter",
          }}
        >
          V 0.1.4 ( {globalValue?.breakpoint} )
        </span>
      </h2>

      {globalValue?.breakpoint !== "S" && globalValue?.breakpoint !== "XS" && (
        <div>
          <PrimaryButton btnText="Clear all cards" clickFn={clearAllCards} />
        </div>
      )}
    </header>
  );
};
