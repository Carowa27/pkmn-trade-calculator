"use client";

import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function updateWindowSize() {
      if (typeof window !== "undefined" && window !== null) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    updateWindowSize();

    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return windowSize;
};

export enum ScrSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export const windowSize = (innerWidth: number) => {
  const sBr = 576;
  const mBr = 768;
  const lBr = 992;
  const xlBr = 1200;
  const xxlBr = 1400;

  if (innerWidth < sBr) {
    return ScrSize.XS;
  } else {
    if (innerWidth >= sBr) {
      if (innerWidth >= mBr) {
        if (innerWidth >= lBr) {
          if (innerWidth >= xlBr) {
            if (innerWidth >= xxlBr) {
              return ScrSize.XXL;
            }
          } else {
            return ScrSize.XL;
          }
        } else {
          return ScrSize.L;
        }
      } else {
        return ScrSize.M;
      }
    } else {
      return ScrSize.S;
    }
  }
};
