import { CurrencyButton, PrimaryButton } from "./Buttons";
import { useGlobalValue } from "./GlobalValueProvider";

interface IHeaderProps {
  clearAllCards: () => void;
  changeCurrency: () => void;
  currency: "SEK" | "NOK" | "EUR" | "USD" | "GBP";
}

export const Header = ({
  clearAllCards,
  currency,
  changeCurrency,
}: IHeaderProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <header
      style={{
        height: "3vh",
        margin: `${
          globalValue?.breakpoint === "S" || globalValue?.breakpoint === "XS"
            ? "0.5rem 1rem"
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
      <h2>Mad&apos;s Trade Calculator</h2>
      <div style={{ marginLeft: "auto" }}>
        <CurrencyButton currency={currency} clickFn={() => changeCurrency()} />
      </div>
      {globalValue?.breakpoint !== "S" && globalValue?.breakpoint !== "XS" && (
        <div style={{ marginLeft: "2rem" }}>
          <PrimaryButton btnText="Clear all cards" clickFn={clearAllCards} />
        </div>
      )}
    </header>
  );
};
