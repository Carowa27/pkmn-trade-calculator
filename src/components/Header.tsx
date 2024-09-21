import { PrimaryButton } from "./Buttons";
import { useGlobalValue } from "./GlobalValueProvider";
import { CurrencySelect } from "./Selects";

interface IHeaderProps {
  clearAllCards: () => void;
}

export const Header = ({ clearAllCards }: IHeaderProps) => {
  const { globalValue } = useGlobalValue();
  const smallScreens =
    globalValue?.screen.breakpoint === "S" ||
    globalValue?.screen.breakpoint === "XS" ||
    globalValue?.screen.breakpoint === "M";
  return (
    <header
      style={{
        height: "3vh",
        width: `${smallScreens ? "100%" : "90vW"}`,
        maxWidth: "120rem",
        margin: `${
          globalValue?.screen.breakpoint === "XS" ||
          globalValue?.screen.breakpoint === "S"
            ? "1rem 0rem 0.5rem 0rem"
            : "1rem 2rem 1rem 2rem"
        }`,
        padding: `${smallScreens ? "0 1rem" : "0"}`,
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: `${smallScreens ? "center" : "space-between"}`,
      }}
    >
      <h2>Mad&apos;s Trade Calculator</h2>
      <div style={{ marginLeft: "auto" }}>
        <CurrencySelect />
      </div>
      {globalValue?.screen.breakpoint !== "S" &&
        globalValue?.screen.breakpoint !== "XS" && (
          <div
            style={{
              marginLeft:
                globalValue?.screen.breakpoint === "M" ? "1rem" : "2rem",
            }}
          >
            <PrimaryButton btnText="Clear all cards" clickFn={clearAllCards} />
          </div>
        )}
    </header>
  );
};
