import { color } from "@/utils/color";
import { CurrencyExchange } from "react-bootstrap-icons";
import { useGlobalValue } from "./GlobalValueProvider";
import { Currency } from "@/interfaces/interfaces";

export const CurrencySelect = () => {
  const { globalValue, setGlobalValue } = useGlobalValue();
  //always size 25
  const changeCurrency = (newCurrency: Currency) => {
    const newRate = JSON.parse(
      localStorage.getItem("moneyRatesForPkmnTrades")!
    );

    localStorage.setItem(
      "moneyRatesForPkmnTrades",
      JSON.stringify({
        date: newRate.date,
        rates: newRate.rates,
        lastUsedCurrency: newCurrency,
      })
    );
    try {
      setGlobalValue({
        screen: {
          width: globalValue?.screen.width ? globalValue?.screen.width : 0,
          height: globalValue?.screen.height ? globalValue?.screen.height : 0,
          breakpoint:
            globalValue?.screen.breakpoint && globalValue?.screen.breakpoint,
        },
        exchange: { currency: newCurrency, rate: newRate.rates[newCurrency] },
      });
      console.info(`Currency changed to ${newCurrency}`);
    } catch (error) {
      console.error("Failed to change currency:", error);
    }
  };
  return (
    <div
      style={{
        margin:
          globalValue?.screen.breakpoint === "S" ||
          globalValue?.screen.breakpoint === "XS"
            ? ""
            : globalValue?.screen.breakpoint === "M"
            ? "0.5rem"
            : "0 2rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {globalValue?.screen.breakpoint !== "S" &&
        globalValue?.screen.breakpoint !== "XS" && (
          <CurrencyExchange size={30} />
        )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <select
          id="currency-select"
          style={{
            background: "none",
            color: color.primaryText,
            border: "none",
            cursor: "pointer",
            height: "2.5rem",
          }}
          value={globalValue?.exchange.currency}
          onChange={(e) => changeCurrency(e.target.value as Currency)}
        >
          <option
            style={{
              background: color.black,
              color: color.primaryText,
            }}
            value="EUR"
          >
            EUR
          </option>
          <option
            style={{
              background: color.black,
              color: color.primaryText,
            }}
            value="GBP"
          >
            GBP
          </option>
          <option
            style={{
              background: color.black,
              color: color.primaryText,
            }}
            value="NOK"
          >
            NOK
          </option>
          <option
            style={{
              background: color.black,
              color: "#fff",
            }}
            value="SEK"
          >
            SEK
          </option>
          <option
            style={{
              background: color.black,
              color: color.primaryText,
            }}
            value="USD"
          >
            USD
          </option>
        </select>
      </div>
    </div>
  );
};
