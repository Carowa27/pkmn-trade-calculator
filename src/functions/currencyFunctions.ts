import { useGlobalValue } from "@/components/GlobalValueProvider";
import { Currency } from "@/interfaces/interfaces";

export const changeCurrency = (newCurrency: Currency) => {
  const { globalValue, setGlobalValue } = useGlobalValue();
  const newRate = JSON.parse(localStorage.getItem("moneyRatesForPkmnTrades")!);

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
