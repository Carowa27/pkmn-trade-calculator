import { color } from "@/utils/color";
import { CurrencyExchange } from "react-bootstrap-icons";
import { useGlobalValue } from "./GlobalValueProvider";

export const CurrencySelect = () => {
  const { globalValue, setGlobalValue } = useGlobalValue();
  //always size 25
  const changeCurrency = (
    newCurrency: "SEK" | "NOK" | "EUR" | "USD" | "GBP"
  ) => {
    try {
      setGlobalValue({
        screen: {
          width: globalValue?.screen.width ? globalValue?.screen.width : 0,
          height: globalValue?.screen.height ? globalValue?.screen.height : 0,
          breakpoint:
            globalValue?.screen.breakpoint && globalValue?.screen.breakpoint,
        },
        currency: newCurrency,
      });
      console.log(`Currency changed to ${newCurrency}`);
    } catch (error) {
      console.error("Failed to change currency:", error);
    }
  };
  return (
    <div
      style={{
        margin:
          globalValue?.screen.breakpoint !== "S" &&
          globalValue?.screen.breakpoint !== "XS"
            ? "0 2rem"
            : "",
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
          style={{
            background: "none",
            color: color.primaryText,
            border: "none",
            cursor: "pointer",
            height: "2.5rem",
          }}
          value={globalValue?.currency}
          onChange={(e) =>
            changeCurrency(
              e.target.value as "SEK" | "NOK" | "EUR" | "USD" | "GBP"
            )
          }
        >
          <option
            style={{
              background: color.black,
              color: color.primaryText,
            }}
            value="USD"
          >
            USD
          </option>
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
        </select>
      </div>
    </div>
  );
};
