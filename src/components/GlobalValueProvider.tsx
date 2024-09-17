"use client";

import { ScrSize, useWindowSize, windowSize } from "@/functions/windowSizes";
import { createContext, useContext, useState, useEffect } from "react";

interface screenProperties {
  screen: { height: number; width: number };
  breakpoint: ScrSize | undefined;
}

interface GlobalValueParams {
  globalValue: screenProperties | undefined;
  setGlobalValue: (newValue: screenProperties) => void;
}

interface GlobalValueProviderProps {
  children: React.ReactNode;
}

export const GlobalValueContext = createContext<GlobalValueParams | undefined>(
  undefined
);

export const GlobalValueProvider = ({ children }: GlobalValueProviderProps) => {
  const [globalValue, setGlobalValue] = useState<screenProperties>();
  const [isMounted, setIsMounted] = useState(false);
  let sizes = useWindowSize();
  let brP = windowSize(sizes.width);

  useEffect(() => {
    setGlobalValue({
      screen: { height: window.innerHeight, width: window.innerWidth },
      breakpoint: windowSize(window.innerWidth),
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
    console.log("started");
    setGlobalValue({
      screen: { height: window.innerHeight, width: window.innerWidth },
      breakpoint: windowSize(window.innerWidth),
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
