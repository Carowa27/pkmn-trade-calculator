"use client";

import { windowSize } from "@/functions/windowSizes";
import { IGlobalValuesProperties } from "@/interfaces/interfaces";
import { createContext, useContext, useState, useEffect } from "react";

interface GlobalValueParams {
  globalValue: IGlobalValuesProperties | undefined;
  setGlobalValue: (newValue: IGlobalValuesProperties) => void;
}

interface GlobalValueProviderProps {
  children: React.ReactNode;
}

export const GlobalValueContext = createContext<GlobalValueParams | undefined>(
  undefined
);

export const GlobalValueProvider = ({ children }: GlobalValueProviderProps) => {
  const [globalValue, setGlobalValue] = useState<IGlobalValuesProperties>();
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
