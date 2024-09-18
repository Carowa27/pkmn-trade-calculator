"use client";

import { ScrSize, windowSize } from "@/functions/windowSizes";
import { createContext, useContext, useState, useEffect } from "react";

interface globalValuesProperties {
  screen: { height: number; width: number; breakpoint: ScrSize | undefined };

  currency: "SEK" | "NOK" | "EUR" | "USD" | "GBP";
}

interface GlobalValueParams {
  globalValue: globalValuesProperties | undefined;
  setGlobalValue: (newValue: globalValuesProperties) => void;
}

interface GlobalValueProviderProps {
  children: React.ReactNode;
}

export const GlobalValueContext = createContext<GlobalValueParams | undefined>(
  undefined
);

export const GlobalValueProvider = ({ children }: GlobalValueProviderProps) => {
  const [globalValue, setGlobalValue] = useState<globalValuesProperties>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setGlobalValue({
      screen: {
        height: window.innerHeight,
        width: window.innerWidth,
        breakpoint: windowSize(window.innerWidth),
      },
      currency: globalValue?.currency ? globalValue.currency : "USD",
    });

    // Initial setup
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      setIsMounted(false);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleResize = () => {
    setGlobalValue({
      screen: {
        height: window.innerHeight,
        width: window.innerWidth,
        breakpoint: windowSize(window.innerWidth),
      },

      currency: globalValue?.currency ? globalValue.currency : "USD",
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <GlobalValueContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalValueContext.Provider>
  );
};

export const useGlobalValue = () => {
  const context = useContext(GlobalValueContext);

  if (context === undefined) {
    throw new Error("useGlobalValue must be used within a GlobalValueProvider");
  }
  return context;
};
