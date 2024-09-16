export enum ScrSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

let innerWidth: number | null = null;

export const windowSize = () => {
  const sBr = 576;
  const mBr = 768;
  const lBr = 992;
  const xlBr = 1200;
  const xxlBr = 1400;

  if (typeof window !== "undefined" && window !== null) {
    innerWidth = window.innerWidth;
  }

  if (!innerWidth) {
    console.warn("windowSize is being called outside of a browser environment");
    return ScrSize.XXL;
  }

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

  // if (innerWidth <= sBr) {
  //   return ScrSize.S;
  // } else {
  //   if (innerWidth <= mBr) {
  //     return ScrSize.M;
  //   } else {
  //     if (innerWidth <= lBr) {
  //       return ScrSize.L;
  //     } else {
  //       if (innerWidth <= xlBr) {
  //         return ScrSize.XL;
  //       } else {
  //         return ScrSize.XXL;
  //       }
  //     }
  //   }
  // }
};
