import { PrimaryButton } from "./Buttons";
import { useGlobalValue } from "./GlobalValueProvider";
import { CurrencySelect } from "./Selects";

interface IHeaderProps {
  clearAllCards: () => void;
}

export const Header = ({ clearAllCards }: IHeaderProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <header
      style={{
        height: "3vh",
        width: `${
          globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS"
            ? "100%"
            : "75%"
        }`,
        maxWidth: "120rem",
        margin: `${
          globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS"
            ? "1rem 1rem 0.5rem 1rem"
            : "1rem 2rem 1rem 2rem"
        }`,
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: `${
          globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS"
            ? "center"
            : "space-between"
        }`,
      }}
    >
      <h2>Mad&apos;s Trade Calculator</h2>
      <div style={{ marginLeft: "auto" }}>
        <CurrencySelect />
      </div>
      {globalValue?.screen.breakpoint !== "S" &&
        globalValue?.screen.breakpoint !== "XS" && (
          <div style={{ marginLeft: "2rem" }}>
            <PrimaryButton btnText="Clear all cards" clickFn={clearAllCards} />
          </div>
        )}
    </header>
  );
};
