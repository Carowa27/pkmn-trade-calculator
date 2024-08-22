enum ScrSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export const windowSize = () => {
  const sBr = 576;
  const mBr = 768;
  const lBr = 992;
  const xlBr = 1200;
  const xxlBr = 1400;

  if (innerWidth <= sBr) {
    return ScrSize.S;
  } else {
    if (innerWidth <= mBr) {
      return ScrSize.M;
    } else {
      if (innerWidth <= lBr) {
        return ScrSize.L;
      } else {
        if (innerWidth <= xlBr) {
          return ScrSize.XL;
        } else {
          return ScrSize.XXL;
        }
      }
    }
  }
};
